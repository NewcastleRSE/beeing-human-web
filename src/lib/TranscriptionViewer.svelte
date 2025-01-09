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

    let variationCommonStyles = ["px-2", "py-1", "rounded-md",  'cursor-pointer', 'transition-colors', 'duration-300', 'ease-in-out'];

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
        // removes any bg styling for the element
        if (el.classList.contains("bg-success-200")) {
            el.classList.remove("bg-success-200", "hover:bg-success-400");
        }
        if (el.classList.contains("bg-error-200")) {
            el.classList.remove("bg-error-200", "hover:bg-error-400");
        }
        if (el.classList.contains("bg-secondary-200")) {
            el.classList.remove("bg-secondary-200", "hover:bg-error-400");
        }

        // removes any common styles from the variationCommonStyles array
        for (const style of variationCommonStyles) {
            if (el.classList.contains(style)) {
                el.classList.remove(style);
            }
        }

        // removes unnecesary textual content
        if (
            el.innerHTML === "[+1609]" ||
            el.innerHTML === "[Does not exist in 1609]"
        ) {
            el.textContent = "";
            el.classList.add('hidden')
        }
    }

    function applyVariationStyles(app) {
        for (const child of app.children) {
            // removes any previous styling for the element
            cleanVariationStyles(child);

            // restores baseline styling for elements inside apps
            // child.classList = "";
            if (app.getAttribute('subtype') === 'add') {
                child.classList.add('bg-success-200', 'hover:bg-success-400',)
            } else if (app.getAttribute('subtype') === 'del') {
                child.classList.add('bg-error-200', 'hover:bg-error-400')
            } else {
                child.classList.add('bg-secondary-200', 'hover:bg-secondary-400')
            }

            // adds common styles from the variationCommonStyles array
            for (const style of variationCommonStyles) {
                child.classList.add(style);
            }

            // adds messages for empty elements
            if (child.tagName === "TEI-LEM") {
                if (child.hasAttribute("data-empty")) {
                    child.innerHTML = "[+1609]";
                    child.classList.remove('hidden')
                }
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
                class="md:flex w-full md:h-dvh {dataViewerState.activeView == 'both'
                    ? 'md:w-1/2'
                    : ''} md:overflow-auto overflow-x-clip md:px-16"
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
