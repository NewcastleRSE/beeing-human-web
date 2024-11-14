<script>
    import TeiSimple from "./TEISimple.svelte";
    import IiifViewer from "./IIIFViewer.svelte";
    import PdfViewer from "./PdfViewer.svelte";

    const mdBreakPoint = 768

    let windowSize = 800
    let smallScreen = function(windowSize) {
        return windowSize < mdBreakPoint
    };

    // If TRUE, loads the PDF, rather than IIIF
    let fallback = true;

    import {
        activeDataset,
        activeView,
        editorialNotes,
        variationDetail,
    } from "../stores/dataViewer";
    import { onMount } from "svelte";

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

    function handleStatus(e) {
        if (e.detail.loaded) {
            changeVariationDetail($variationDetail);
            changeEditorialNoteVisibility($editorialNotes);
            toggleBothViewOption(windowSize);
        }
    }

    function changeVariationDetail($variationDetail) {
        const apps = document.getElementsByTagName("tei-app");
        if ($variationDetail === "no variation") {
            // takes away any existing styling for apps
            for (const app of apps) {
                for (const el of app.children) {
                    cleanVariationStyles(el);
                }
            }
        } else if ($variationDetail === "major changes") {
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
        } else if ($variationDetail === "all changes") {
            for (const app of apps) {
                applyVariationStyles(app);
            }
        }
    }

    function changeEditorialNoteVisibility($editorialNotes) {
        try {
            const notesElements = document.querySelectorAll('tei-note[type="editorial"]')
            if (!$editorialNotes) {
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

    function toggleBothViewOption(windowSize) {
        if (ready) {
            try {
                const button = document.getElementById('view-both-button').closest('label');
                if (smallScreen(windowSize)) {
                    if ($activeView == 'both') {
                        $activeView = 'transcription'
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

    $: if (ready && $variationDetail) {
        changeVariationDetail($variationDetail);
    }

    $: changeEditorialNoteVisibility($editorialNotes);

    $: if (ready && windowSize) {
        toggleBothViewOption(windowSize);
    }

    let ready = false;

    onMount(() => {
        if ($activeDataset === 0) {
            $activeDataset = "1623";
        }

        if (!["facsimile", "transcription", "both"].includes($activeView)) {
            $activeView = "both";
        }
        
        if (!["no variation", "major changes", "all changes"].includes($variationDetail)) {
            $variationDetail = "no variation";
        }

        if (![true, false].includes($editorialNotes)) {
            $editorialNotes = false;
        }
        ready = true;
    });
    

</script>

<svelte:window bind:innerWidth={windowSize}/>

{#if ready}
    <div class="md:flex w-full mx-auto md:p-8 md:max-h-screen">
        {#if $activeView === "both" || $activeView === "facsimile"}
            <div
                class="md:flex-1 w-full {$activeView == 'both'
                    ? 'md:w-1/2'
                    : ''} h-dvh"
                data-testid="iiif-viewer"
            >
            {#if !fallback}
                <IiifViewer
                    manifest={transcriptionData[$activeDataset].iiifManifest}
                    startPage={transcriptionData[$activeDataset]
                        .manifestStartPage}
                />
            {:else}
                {#key $activeDataset}
                <PdfViewer url={transcriptionData[$activeDataset]
                        .pdfFallback} pageNum={transcriptionData[$activeDataset]
                            .pdfFallbackStartPage} objectTitle={transcriptionData[$activeDataset]
                                .title}/>
                {/key}
            {/if}
            </div>
        {/if}
        {#if $activeView === "both" || $activeView === "transcription"}
            <div
                class="md:flex w-full md:h-dvh {$activeView == 'both'
                    ? 'md:w-1/2'
                    : ''} md:overflow-auto overflow-x-clip"
                data-testid="transcription"
            >
                <TeiSimple
                    path={transcriptionData[$activeDataset].teiURL}
                    on:status={handleStatus}
                />
            </div>
        {/if}
    </div>
{/if}
