<!-- 
    @component
    This is a naive implementation of CETEIcean to transform and display a TEI document -- it replicates the simple use case of loading the library into an html page, and using simple JS to inject the transformed markup into the html, while registering the custom components. It also loads an additional stylesheet with basic styling for these components It works fine, but it does not take advatange of the capabilities of a framework like svelte. An updated implementation should take a more granular approach and, eventually, instead of simply registering the new elements, it should create new svelte elements at build time. It essentially should follow the principles in the astro / react implementation here https://github.com/raffazizzi/astro-tei
    
    props:
        `path`: a path to a TEI-encoded XML file
    
    usage:
        ```
        <TEISimple path='link/to/tei/file.xml'/>
        ```
-->

<script>
    import { onMount } from "svelte";
    import CETEI from "CETEIcean";
    import _ from "lodash";
    import { teiBehaviours } from "../utils/teiBehaviours";

    import { teiViewerState } from "../stores/teiViewer.svelte";
    import { isElementVisibleUntracked } from "../utils/generalHelpers";

    let { path = "", mediaRoot = "", statusCheck } = $props();

    let loaded = $state(false);
    let error = $state(undefined);
    let changedHere = false;

    let lastScrollTop = 0;

    async function loadTei(path) {
        loaded = false;
        const parent = document.getElementById("TEI-container");

        // cleans the parent container, in case it has any previous content
        while (parent.firstChild) {
            parent.removeChild(parent.lastChild);
        }

        // inserts TEI content
        var cetei = new CETEI();
        cetei.addBehaviors(teiBehaviours);
        await cetei
            .getHTML5(path, function (data) {
                parent.appendChild(data);
            })
            .then(() => {
                loaded = true;
                statusCheck({ loaded: "loaded" });
                return path;
            });
    }

    function turnPageOnScroll() {
        changedHere = true;
        // checks to see if the current sig is in view
        const currentPb = document.querySelector(
            `tei-pb[n="${teiViewerState.currentSignature}"]`,
        );

        isElementVisibleUntracked(currentPb, (visible) => {
            if (visible) {
                // if the current sig is still in view, do nothing
            } else {
                // find the closest pb in view

                // find index of current pb in the signature array
                const indexOfCurrentPB = teiViewerState.signatures.indexOf(
                    teiViewerState.currentSignature,
                );

                // checks in both directions
                let indexToCheck = [indexOfCurrentPB - 1, indexOfCurrentPB + 1];

                for (const [direction, nextIndex] of indexToCheck.entries()) {
                    if (
                        nextIndex >= 0 &&
                        nextIndex < teiViewerState.signatures.length - 1
                    ) {
                        let check = nextIndex;
                        // selects the next pb
                        let nextPB = document.querySelector(
                            `tei-pb[n="${teiViewerState.signatures[check]}"]`,
                        );

                        // checks to see if the next pb is an empty page, if so, skips it
                        const emptySigs = ["¶2v", "A3r", "B1r"];
                        if (
                            nextPB &&
                            emptySigs.includes(nextPB.getAttribute("n"))
                        ) {
                            if (direction === 0) {
                                check -= 1;
                            } else {
                                check += 1;
                            }
                            nextPB = document.querySelector(
                                `tei-pb[n="${teiViewerState.signatures[check]}"]`,
                            );
                        }
                        
                        // checks to see if nextPb will be visible (some pbs are hidden: title page, table of contents, etc.)
                        if (nextPB && nextPB.classList.contains("hidden")) {
                            // find the closest visible element
                            let closestVisible = nextPB.nextElementSibling;
                            while (
                                closestVisible.classList.contains("hidden")
                            ) {
                                closestVisible =
                                    closestVisible.nextElementSibling;
                            }
                            nextPB = closestVisible;
                        }

                        // checks to see if the nextPB is currently visible on the screen, and is above a certain threshold
                        if (nextPB) {
                            isElementVisibleUntracked(nextPB, (visible) => {
                                if (visible) {
                                    // checks to see if it is in the top third of the page
                                    const rect = nextPB.getBoundingClientRect();
                                    if (rect.top < window.innerHeight / 3) {
                                        teiViewerState.currentSignature =
                                            teiViewerState.signatures[
                                                check
                                            ];
                                    }
                                }
                            });
                        }
                    }
                }
            }
        });
        changedHere = false;
    }

    // window.addEventListener("sigInView", async (evt) => {
    //     console.log("sigInView", evt.detail.sig);
    //     if (
    //         evt.detail.sig != teiViewerState.currentSignature &&
    //         !teiViewerState.scrolling && !changedHere
    //     ) {
    //         console.log("should change page in the IIIF");
    //         // updates the currentSignature in the store
    //         teiViewerState.currentSignature = evt.detail.sig;

    //         // // find the element for evt.detail.sig
    //         // const sigElement = document.querySelector(
    //         //     `[n='${teiViewerState.signatures[index + 1]}']`,
    //         // );
    //         // // find its closest parent with a type "chapter"
    //         // let chapterElement = sigElement.closest("[type='chapter']");
    //         // if (!chapterElement) {
    //         //     const possibleSections = [
    //         //         "titlepage",
    //         //         "preface",
    //         //         "dedication",
    //         //         "contents",
    //         //     ];
    //         //     for (const section of possibleSections) {
    //         //         chapterElement = sigElement.closest(`[type='${section}']`);
    //         //         if (chapterElement) {
    //         //             break;
    //         //         }
    //         //     }
    //         // }
    //         // if (chapterElement) {
    //         //     if (
    //         //         chapterElement.getAttribute("id") !=
    //         //         teiViewerState.currentSection
    //         //     ) {
    //         //         teiViewerState.currentSection =
    //         //             chapterElement.getAttribute("id");
    //         //     }
    //         // }
    //     }
    // });

    $effect(() => {
        if (
            (teiViewerState.currentPage !==
                teiViewerState.signatures.indexOf(
                    teiViewerState.currentSignature,
                ) +
                    teiViewerState.currentPage) !==
                undefined &&
            !teiViewerState.scrolling
        ) {
            if (changedHere) {
                // page changed here (by scrolling the TEI)
            } else {
                // page changed elsewhere
                let pb = document.querySelector(
                    `tei-pb[n="${teiViewerState.currentSignature}"]`,
                );

                // if pb is hidden, find the closest visible element and scroll to that
                if (pb && pb.classList.contains("hidden")) {
                    // find closest element that is not hidden
                    let closestVisible = pb.previousElementSibling;
                    while (closestVisible.classList.contains("hidden")) {
                        closestVisible = closestVisible.previousElementSibling;
                    }
                    pb = closestVisible;
                }

                // only do this if the pb exists and is not already in view
                if (pb && !pb.getBoundingClientRect().top >= 0) {
                    pb.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }
        }
    });

    onMount(async () => {
        try {
            if (path === "") {
                throw "No path specified";
            }
            await loadTei(path).then(() => {
                // get an array of all pbs
                const pbElm = document.querySelectorAll("tei-pb");
                // put the n attribute of each pb in the teiVierState store
                pbElm.forEach((pb) => {
                    teiViewerState.signatures.push(pb.getAttribute("n"));
                });
                teiViewerState.currentSignature = teiViewerState.signatures[0];
                // add event listener for iiifPageChange
                window.addEventListener("iiifPageChange", (e) => {
                    // scroll into view the element with the same n attribute as the currentSignature
                    // let pb = document.querySelector(
                    //     `tei-pb[n="${teiViewerState.currentSignature}"]`,
                    // );
                    // // if pb is hidden, find the closest visible element and scroll to that
                    // if (pb && pb.classList.contains("hidden")) {
                    //     // find closest element that is not hidden
                    //     let closestVisible = pb.previousElementSibling;
                    //     while (closestVisible.classList.contains("hidden")) {
                    //         closestVisible =
                    //             closestVisible.previousElementSibling;
                    //     }
                    //     pb = closestVisible;
                    // }
                    // // only do this if the pb exists and is not already in view
                    // if (pb && !pb.getBoundingClientRect().top >= 0) {
                    //     pb.scrollIntoView({
                    //         behavior: "smooth",
                    //         block: "start",
                    //     });
                    // }
                });

                // Might need to adjust the rate ot throttling later -- currently hard to tell because the iiif document is taking a while
                const throttledScrollHandler = _.throttle(
                    turnPageOnScroll,
                    300,
                );
                document
                    .querySelector("[data-testid='transcription']")
                    .addEventListener("scroll", throttledScrollHandler);
                loaded = true;
            });
        } catch (err) {
            error = err.toString();
            loaded = false;
            return;
        }
    });
</script>

<div id="TEI-container" data-testid="TEI-container">
    {#if !loaded}
        <p id="loading-message">Loading...</p>
    {/if}
    {#if error}
        <p data-testid="error-message">{error}</p>
    {/if}
</div>
