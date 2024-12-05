<script>
    import TeiSimple from "./TEISimple.svelte";
    import IiifViewer from "./IIIFViewer.svelte";
    import PdfViewer from "./PdfViewer.svelte";

    const mdBreakPoint = 768

    let windowSize = $state(0)
    let smallScreen = $derived.by(() => {
        return windowSize < mdBreakPoint
    });

    // If TRUE, loads the PDF, rather than IIIF
    let fallback = false;

    let ready = $state(false);

    import {
        dataViewerState
    } from "../stores/dataViewer.svelte";
    import { onMount } from "svelte";


    $effect(() => {
        changeVariationDetail(dataViewerState.variationDetail);
        changeEditorialNoteVisibility(dataViewerState.editorialNotes);
        toggleBothViewOption(smallScreen);
    })

    import transcriptionData from "../routes/(sections)/literature/transcription/transcriptionData.json";

    function cleanVariationStyles(el) {
        el.classList = "";
        // removes the default background colour for elements in apps
        el.classList.add("bg-transparent");

        // removes unnecesary textual content
        if (
            el.innerHTML === "[+1609]" ||
            el.innerHTML === "[Does not exist in 1609]"
        ) {
            el.textContent = "";
        }
    }

    function applyVariationStyles(app) {
        for (const child of app.children) {
            // removes any previous styling for the element
            cleanVariationStyles(child);

            // restores baseline styling for elements inside apps
            child.classList = "";
            child.classList.add(`var-${app.getAttribute("subtype")}`);

            // adds messages for empty elements
            if (child.tagName === "TEI-LEM") {
                if (child.hasAttribute("data-empty")) {
                    child.innerHTML = "[+1609]";
                }
                child.classList.add("hover");
            } else if (child.tagName === "TEI-RDG") {
                if (child.hasAttribute("data-empty")) {
                    child.innerHTML = "[Does not exist in 1609]";
                }
            }
        }
    }

    function handleStatus(status) {
        if (status.loaded) {
            ready = true;
            changeVariationDetail(dataViewerState.variationDetail);
            changeEditorialNoteVisibility(dataViewerState.editorialNotes);
            toggleBothViewOption(smallScreen);
        }
    }

    function changeVariationDetail(variationDetail) {
        const apps = document.getElementsByTagName("tei-app");
        if (variationDetail === "no variation") {
            // takes away any existing styling for apps
            for (const app of apps) {
                for (const el of app.children) {
                    cleanVariationStyles(el);
                }
            }
        } else if (variationDetail === "major changes") {
            for (const app of apps) {
                if (app.getAttribute("type") === "major") {
                    applyVariationStyles(app);
                } else {
                    // ensures minor apps are not styled (i.e., if the user comes from all changes rather than from no variation)
                    for (const child of app.children) {
                        cleanVariationStyles(child);
                    }
                }
            }
        } else if (variationDetail === "all changes") {
            for (const app of apps) {
                applyVariationStyles(app);
            }
        }
    }

    function changeEditorialNoteVisibility(editorialNotes) {
        try {
            const notesElements = document.querySelectorAll('tei-note[type="editorial"]')
            if (!editorialNotes) {
                for (const note of notesElements) {
                    note.classList = ''
                    note.classList.add('hidden');
                }
            } else {
                for (const note of notesElements) {
                    note.classList = ''
                    note.classList = 'block'
                }
            }
        } catch (e) {
            console.warn('Document is not ready, could not change visibility of editorial notes')
        }
    }

    function toggleBothViewOption(smallScreen) {
        if (ready) {
            try {
                const button = document.getElementById('view-both-button').closest('label');
                if (smallScreen) {
                    if (dataViewerState.activeView == 'both') {
                        dataViewerState.activeView = 'transcription'
                        document.getElementById('view-transcription-button').click();
                    }
                    button.classList.add('hidden');
                } else {
                    button.classList.remove('hidden')
                }
            } catch (e) {
                console.log('window is not ready, could not adjust button visibility')
            }
        }
    }

    onMount(() => {
        if (dataViewerState.activeDataset === 0) {
            dataViewerState.activeDataset = "1623";
        }

        if (!["facsimile", "transcription", "both"].includes(dataViewerState.activeView)) {
            dataViewerState.activeView = "both";
        }
        
        if (!["no variation", "major changes", "all changes"].includes(dataViewerState.variationDetail)) {
            dataViewerState.variationDetail = "no variation";
        }

        if (![true, false].includes(dataViewerState.editorialNotes)) {
            dataViewerState.editorialNotes = false;
        }
        ready = true;
    });
    

</script>

<svelte:window bind:innerWidth={windowSize}/>

{#if ready}
    {#key dataViewerState.activeDataset}
    <div class="md:flex w-full mx-auto md:p-8 md:max-h-screen">
        {#if dataViewerState.activeView === "both" || dataViewerState.activeView === "facsimile"}
            <div
                class="md:flex-1 w-full {dataViewerState.activeView == 'both'
                    ? 'md:w-1/2'
                    : ''} h-dvh"
                data-testid="iiif-viewer"
            >
            {#if !fallback}
                <IiifViewer
                    manifest={transcriptionData[dataViewerState.activeDataset].iiifManifest}
                    startPage={transcriptionData[dataViewerState.activeDataset]
                        .manifestStartPage}
                />
            {:else}
                {#key dataViewerState.activeDataset}
                <PdfViewer url={transcriptionData[dataViewerState.activeDataset]
                        .pdfFallback} pageNum={transcriptionData[dataViewerState.activeDataset]
                            .pdfFallbackStartPage} objectTitle={transcriptionData[dataViewerState.activeDataset].title}/>
                {/key}
            {/if}
            </div>
        {/if}
        {#if dataViewerState.activeView === "both" || dataViewerState.activeView === "transcription"}
            <div
                class="md:flex w-full {dataViewerState.activeView == 'both'
                    ? 'md:w-1/2'
                    : ''} md:overflow-auto overflow-x-clip"
                data-testid="transcription"
            >
                <TeiSimple
                    path={transcriptionData[dataViewerState.activeDataset].teiURL}
                    statusCheck={(status) => handleStatus(status)}
                />
            </div>
        {/if}
    </div>
    {/key}
{/if}
