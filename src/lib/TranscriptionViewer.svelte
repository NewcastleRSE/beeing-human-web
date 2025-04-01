<script>
    import TeiSimple from "./TEISimple.svelte";
    import IiifViewer from "./IIIFViewer.svelte";
    import PdfViewer from "./PdfViewer.svelte";

    import NoteModal from "./NoteModal.svelte";

    const mdBreakPoint = 768;

    let windowSize = $state(0);
    let smallScreen = $derived.by(() => {
        return windowSize < mdBreakPoint;
    });

    // If TRUE, loads the PDF, rather than IIIF
    let fallback = false;

    let ready = $state(false);

    // isMarked serves as a shortcut to test whether the element is currently visibly marked on the page
    let variationCommonStyles = [
        "px-2",
        "py-1",
        "rounded-md",
        "cursor-pointer",
        "transition-colors",
        "duration-300",
        "ease-in-out",
        "isMarked",
    ];

    let showModal = $state(false);
    let modalElement = $state(null);

    import { dataViewerState } from "../stores/dataViewer.svelte";
    import { teiViewerState } from "../stores/teiViewer.svelte";

    import { onMount } from "svelte";

    $effect(() => {
        changeVariationDetail(dataViewerState.variationDetail);
    });

    $effect(() => {
        changeEditorialNoteVisibility(dataViewerState.editorialNotes);
    });

    $effect(() => {
        toggleBothViewOption(smallScreen);
    });

    // FIRING WHEN IT SHOULDN'T (IE, CHANGING TO CH 5 THEN SCROLLING UP A PAGE)
    $effect(() => {
        skipToSection(dataViewerState.activeNavigator);
    });

    $effect(() => {
        if (teiViewerState.updateSection) {
            // checks to see if there is any section in state
            if (!teiViewerState.currentSection) {
                // if not, set the current section to dataViewerState.activeNavigator
                teiViewerState.currentSection = dataViewerState.activeNavigator;
            }

            // might need more here
            const firstSigs = {
                "¶2r": "titlepage",
                "¶3r": "preface",
                A1v: "dedication",
                A2r: "contents",
                B1r: "ch1",
                D4r: "ch2",
                E4r: "ch3",
                H1r: "ch4",
                I3r: "ch5",
                N3v: "ch6",
                P4r: "ch7",
                S2r: "ch8",
                T1r: "ch9",
                T2v: "ch10",
            };

            if (dataViewerState.activeView === "facsimile") {
                // if the active view is facsimile the current signature is not going to be accurately tracked, so need to update it separately here:

                const offset = parseInt(
                    transcriptionData[dataViewerState.activeDataset]
                        .manifestStartPage,
                );

                const startingPages = {
                    titlepage: 0 + offset,
                    preface: 2 + offset,
                    dedication: 7 + offset,
                    contents: 10 + offset,
                    ch1: 18 + offset,
                    ch2: 40 + offset,
                    ch3: 48 + offset,
                    ch4: 66 + offset,
                    ch5: 78 + offset,
                    ch6: 116 + offset,
                    ch7: 128 + offset,
                    ch8: 148 + offset,
                    ch9: 154 + offset,
                    ch10: 157 + offset,
                };

                // check where the current page sits in the starting pages
                for (const [i, key] of Object.keys(startingPages).entries()) {
                    const nextKey = Object.keys(startingPages)[i + 1];
                    if (nextKey) {
                        if (
                            teiViewerState.currentPage >= startingPages[key] &&
                            teiViewerState.currentPage < startingPages[nextKey]
                        ) {
                            // if the current page is between two starting pages, set the current signature to the one that matches
                            teiViewerState.currentSection = key;
                            dataViewerState.activeNavigator = key;
                            break;
                        }
                    } else {
                        // if the current page is greater than the last starting page, set the current signature to the last one
                        teiViewerState.currentSection = key;
                        dataViewerState.activeNavigator = key;
                    }
                }
            } else {
                if (
                    Object.keys(firstSigs).includes(
                        teiViewerState.currentSignature,
                    )
                ) {
                    teiViewerState.currentSection =
                        firstSigs[teiViewerState.currentSignature];
                    dataViewerState.activeNavigator =
                        firstSigs[teiViewerState.currentSignature];
                } else {
                    // check to see if current signature is in in current section
                    const section = document.getElementById(
                        teiViewerState.currentSection,
                    );

                    let pbInSection = null;
                    let pbElement = null;

                    if (section) {
                        pbInSection = section.querySelector(
                            `tei-pb[n="${teiViewerState.currentSignature}"]`,
                        );

                        pbElement = document.querySelector(
                            `tei-pb[n="${teiViewerState.currentSignature}"]`,
                        );
                    }

                    if (!pbInSection && pbElement) {
                        // if not, find the closest div type chapter that is an ancestor of the current signature
                        const chapter = pbElement.closest(
                            'tei-div[type="chapter"]',
                        );
                        if (chapter) {
                            // find the id of the chapter
                            const chapterId = chapter.getAttribute("id");
                            // change the activeNavigator to the chapterId
                            dataViewerState.activeNavigator = chapterId;
                        } else {
                            const possibleSectionIds = [
                                "titlepage",
                                "preface",
                                "dedication",
                                "contents",
                            ];

                            // checks to see if the current signature is in any of the possible sections
                            for (const sectionId of possibleSectionIds) {
                                const section =
                                    document.getElementById(sectionId);
                                const pb = section.querySelector(
                                    `tei-pb[n="${teiViewerState.currentSignature}"]`,
                                );
                                if (pb) {
                                    teiViewerState.currentSection = sectionId;
                                    dataViewerState.activeNavigator = sectionId;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            teiViewerState.updateSection = false;
        }
    });

    import transcriptionData from "../routes/(sections)/literature/transcription/transcriptionData.json";
    import { findLastMilestoneBefore } from "../utils/generalHelpers";
    import { isElementVisibleInViewport } from "../utils/teiBehavioursHelper";

    function cleanVariationStyles(el) {
        // removes any bg styling for the element
        if (el.classList.contains("bg-success-200")) {
            el.classList.remove("bg-success-200", "hover:bg-success-400");
        }
        if (el.classList.contains("bg-error-200")) {
            el.classList.remove("bg-error-200", "hover:bg-error-400");
        }
        if (el.classList.contains("bg-secondary-200")) {
            el.classList.remove("bg-secondary-200", "hover:bg-secondary-400");
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
            el.classList.add("hidden");
        }
    }

    function applyVariationStyles(app) {
        for (const child of app.children) {
            // removes any previous styling for the element
            cleanVariationStyles(child);

            // restores baseline styling for elements inside apps
            // child.classList = "";
            if (app.getAttribute("subtype") === "add") {
                child.classList.add("bg-success-200", "hover:bg-success-400");
            } else if (app.getAttribute("subtype") === "del") {
                child.classList.add("bg-error-200", "hover:bg-error-400");
            } else {
                child.classList.add(
                    "bg-secondary-200",
                    "hover:bg-secondary-400",
                );
            }

            // adds common styles from the variationCommonStyles array
            for (const style of variationCommonStyles) {
                child.classList.add(style);
            }

            // adds messages for empty elements
            if (child.tagName === "TEI-LEM") {
                if (child.hasAttribute("data-empty")) {
                    child.innerHTML = "[+1609]";
                    child.classList.remove("hidden");
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
            const notesElements = document.querySelectorAll(
                'tei-ref[type="attachment"]',
            );

            const fragmentedNotes = document.querySelectorAll(
                'tei-seg[type="fragmentedNoteAttachement"]',
            );

            // groups fragmented notes by their corresp attribute
            let groupedNotes = {};
            for (const note of fragmentedNotes) {
                const corresp = note.getAttribute("corresp");
                if (groupedNotes[corresp]) {
                    groupedNotes[corresp].push(note);
                } else {
                    groupedNotes[corresp] = [note];
                }
            }

            let variationCommonStyles = [
                "px-2",
                "py-1",
                "rounded-md",
                "cursor-pointer",
                "transition-colors",
                "duration-300",
                "ease-in-out",
                "bg-warning-200",
                "hover:bg-warning-400",
                "isMarked",
            ];

            const handleHover = (e) => {
                const element = e.target;
                if (element) {
                    const corresp = element.getAttribute("corresp");
                    if (corresp) {
                        for (const otherNote of groupedNotes[corresp]) {
                            if (otherNote !== e.target) {
                                otherNote.classList.add("bg-warning-400");
                            }
                        }
                    }
                }
            };

            const handleMouseOut = (e) => {
                const element = e.target;
                if (element) {
                    const corresp = element.getAttribute("corresp");
                    if (corresp) {
                        for (const otherNote of groupedNotes[corresp]) {
                            if (otherNote !== e.target) {
                                otherNote.classList.remove("bg-warning-400");
                            }
                        }
                    }
                }
            };

            if (!editorialNotes) {
                for (const note of notesElements) {
                    // note.classList.add('hidden');

                    for (const style of variationCommonStyles) {
                        note.classList.remove(style);
                    }
                }

                for (const groupNotes of Object.keys(groupedNotes)) {
                    for (const note of groupedNotes[groupNotes]) {
                        for (const style of variationCommonStyles) {
                            note.classList.remove(style);
                        }

                        // nuclear option to remove all event listeners
                        // This is a bit extreme but regardless of what I tried I could not get the event listeners to be removed by .removeEventListener
                        let newNote = note.cloneNode(true);
                        note.replaceWith(newNote);

                        // reinserts the custom event editorialNoteClicked
                        newNote.addEventListener("click", (e) => {
                            e.preventDefault();
                            window.dispatchEvent(
                                new CustomEvent("editorialNoteClicked", {
                                    detail: e.target,
                                    bubbles: true,
                                }),
                            );
                        });
                    }
                }
            } else {
                for (const note of notesElements) {
                    // note.classList.remove('hidden');

                    for (const style of variationCommonStyles) {
                        note.classList.add(style);
                    }
                }

                for (const groupNotes of Object.keys(groupedNotes)) {
                    for (const note of groupedNotes[groupNotes]) {
                        // add event listener that will add the hover styles to the other notes in the group
                        note.addEventListener("mouseover", handleHover);
                        note.addEventListener("mouseleave", handleMouseOut);

                        for (const style of variationCommonStyles) {
                            note.classList.add(style);
                        }
                    }
                }
            }
        } catch (e) {
            console.warn(
                "Document is not ready, could not change visibility of editorial notes",
            );
        }
    }

    function toggleBothViewOption(smallScreen) {
        if (ready) {
            try {
                const button = document
                    .getElementById("view-both-button")
                    .closest("label");
                if (smallScreen) {
                    if (dataViewerState.activeView == "both") {
                        dataViewerState.activeView = "transcription";
                        document
                            .getElementById("view-transcription-button")
                            .click();
                    }
                    button.classList.add("hidden");
                } else {
                    button.classList.remove("hidden");
                }
            } catch (e) {
                console.log(
                    "window is not ready, could not adjust button visibility",
                );
            }
        }
    }

    function skipToSection() {
        if (ready && dataViewerState.navigatorChoice) {
            // find the element which id matches the activeNavigator
            const section = document.getElementById(
                dataViewerState.activeNavigator,
            );
            if (section) {
                // find out whether the element is in view

                // find first child in section
                const firstChild = section.firstElementChild;

                // first child should be visible
                isElementVisibleInViewport(firstChild, (isVisible) => {
                    if (!isVisible) {
                        // update stores

                        // update current signature
                        // find the tei-pb element that appears immediately before the start of the section
                        const pb = findLastMilestoneBefore(
                            firstChild,
                            "tei-pb",
                        );

                        if (pb) {
                            const sig = pb.getAttribute("n");
                            teiViewerState.currentSignature = sig;
                            teiViewerState.currentPage =
                                teiViewerState.signatures.indexOf(sig) +
                                parseInt(
                                    transcriptionData[
                                        dataViewerState.activeDataset
                                    ].manifestStartPage,
                                );
                            teiViewerState.updateTEI = true;
                            teiViewerState.updateIIIF = true;
                            // update current section
                            teiViewerState.currentSection =
                                dataViewerState.activeNavigator;
                        }
                    } else {
                        // update scrolling state
                        teiViewerState.scrolling = false;
                    }
                });
            } else {
                // if the section is not found, it means we are in the facsimile only view

                const startingSigs = {
                    titlepage: "¶2r",
                    preface: "¶3r",
                    dedication: "A1v",
                    contents: "A2r",
                    ch1: "B1r",
                    ch2: "D4r",
                    ch3: "E4r",
                    ch4: "H1r",
                    ch5: "I3r",
                    ch6: "N3v",
                    ch7: "P4r",
                    ch8: "S2r",
                    ch9: "T1r",
                    ch10: "T2v",
                };

                teiViewerState.currentSignature =
                    startingSigs[dataViewerState.activeNavigator];
                teiViewerState.updateIIIF = true;
                teiViewerState.currentSection = dataViewerState.activeNavigator;
            }
        }
        dataViewerState.navigatorChoice = false;
    }

    onMount(() => {
        if (dataViewerState.activeDataset === 0) {
            dataViewerState.activeDataset = "1623";
        }

        if (
            !["facsimile", "transcription", "both"].includes(
                dataViewerState.activeView,
            )
        ) {
            dataViewerState.activeView = "both";
        }

        if (
            !["no variation", "major changes", "all changes"].includes(
                dataViewerState.variationDetail,
            )
        ) {
            dataViewerState.variationDetail = "no variation";
        }

        if (![true, false].includes(dataViewerState.editorialNotes)) {
            dataViewerState.editorialNotes = false;
        }

        if (!dataViewerState.activeNavigator) {
            dataViewerState.activeNavigator = "titlepage";
        }

        // listens for event 'variationClicked' to show the variation detail
        window.addEventListener("variationClicked", (e) => {
            // if the element contains the class 'isMarked', show the modal
            if (e.detail.classList.contains("isMarked")) {
                showModal = true;
                modalElement = e.detail;
            }
        });

        window.addEventListener("editorialNoteClicked", (e) => {
            // if the element contains the class 'isMarked', show the modal
            if (e.detail.classList.contains("isMarked")) {
                showModal = true;
                modalElement = e.detail;
            } else {
                // checks to see if any of its ancestors contain the class 'isMarked'
                let parent = e.detail.parentElement;
                while (parent) {
                    if (parent.classList.contains("isMarked")) {
                        showModal = true;
                        modalElement = parent;
                        break;
                    }
                    parent = parent.parentElement;
                }
            }
        });

        ready = true;
    });
</script>

<svelte:window bind:innerWidth={windowSize} />

{#if ready}
    {#key dataViewerState.activeDataset}
        <NoteModal message={modalElement} bind:show={showModal} />
        <div class="md:flex w-full mx-auto md:p-8 md:max-h-screen">
            {#if dataViewerState.activeView === "both" || dataViewerState.activeView === "facsimile"}
                <div
                    class="md:flex-1 w-full {dataViewerState.activeView ==
                    'both'
                        ? 'md:w-1/2'
                        : ''} h-dvh"
                    data-testid="iiif-viewer"
                >
                    {#if !fallback}
                        <IiifViewer
                            manifest={transcriptionData[
                                dataViewerState.activeDataset
                            ].iiifManifest}
                            startPage={transcriptionData[
                                dataViewerState.activeDataset
                            ].manifestStartPage}
                        />
                    {:else}
                        {#key dataViewerState.activeDataset}
                            <PdfViewer
                                url={transcriptionData[
                                    dataViewerState.activeDataset
                                ].pdfFallback}
                                pageNum={transcriptionData[
                                    dataViewerState.activeDataset
                                ].pdfFallbackStartPage}
                                objectTitle={transcriptionData[
                                    dataViewerState.activeDataset
                                ].title}
                            />
                        {/key}
                    {/if}
                </div>
            {/if}
            {#if dataViewerState.activeView === "both" || dataViewerState.activeView === "transcription"}
                <div
                    class="md:flex w-full md:h-dvh {dataViewerState.activeView ==
                    'both'
                        ? 'md:w-1/2'
                        : ''} md:overflow-auto overflow-x-clip md:px-16"
                    data-testid="transcription"
                >
                    <TeiSimple
                        transcriptionData={transcriptionData[
                            dataViewerState.activeDataset
                        ]}
                        statusCheck={(status) => handleStatus(status)}
                    />
                </div>
            {/if}
        </div>
    {/key}
{/if}
