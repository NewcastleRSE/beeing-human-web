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

    let { transcriptionData = "", statusCheck } = $props();

    let path = $derived(transcriptionData.teiURL);
    let startPage = $derived(transcriptionData.manifestStartPage);

    let loaded = $state(false);
    let error = $state(undefined);

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
        // checks to see if the current sig is in view
        const currentPb = document.querySelector(
            `tei-pb[n="${teiViewerState.currentSignature}"]`,
        );

        isElementVisibleUntracked(currentPb, (visible) => {
            // find index of current pb in the signature array
            const indexOfCurrentPB = teiViewerState.signatures.indexOf(
                teiViewerState.currentSignature,
            );

            // checks in both directions
            let found = false;
            const firstBackStep = () => {
                if (indexOfCurrentPB > 0) {
                    return indexOfCurrentPB - 1;
                } else {
                    return 0;
                }
            };

            const firstForwardStep = () => {
                if (indexOfCurrentPB > teiViewerState.signatures.length) {
                    return teiViewerState.signatures.length - 1;
                } else {
                    return indexOfCurrentPB + 1;
                }
            };
            let indexToCheck = [firstBackStep(), firstForwardStep()];
            // THERE MIGHT BE SOME PERFORMANCE PROBLEMS HERE (IT GOES THROUGH THE ENTIRE ARRAY), BUT LEAVING IT FOR NOW
            while (!found) {
                for (const [direction, nextIndex] of indexToCheck.entries()) {
                    if (
                        (nextIndex >= 0 &&
                            nextIndex < teiViewerState.signatures.length - 1) ||
                        (nextIndex < 0 &&
                            nextIndex < teiViewerState.signatures.length - 1) ||
                        (nextIndex >= 0 &&
                            nextIndex > teiViewerState.signatures.length - 1)
                    ) {
                        if (visible && direction === 1) {
                            // if the current sig is still in view and is going forward, do nothing
                            found = true;
                        } else {
                            let check = nextIndex;
                            // selects the next pb
                            let nextPB = document.querySelector(
                                `tei-pb[n="${teiViewerState.signatures[check]}"]`,
                            );

                            // checks to see if the next pb is an empty page, if so, skips it
                            const emptySigs = ["¶2v", "A4v"];
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
                                        found = true;
                                        // checks to see if it is in the top third of the page
                                        const rect =
                                            nextPB.getBoundingClientRect();
                                        if (rect.top < window.innerHeight / 3) {
                                            teiViewerState.currentSignature =
                                                teiViewerState.signatures[
                                                    check
                                                ];
                                            teiViewerState.updateIIIF = true;
                                            teiViewerState.updateSection = true;
                                        }
                                    }
                                });
                            }
                        }
                    } else {
                        // if the index is out of bounds, stop checking
                        found = true;
                    }
                }
                const nextBackStep = () => {
                    if (indexToCheck[0] > 0) {
                        return indexToCheck[0] - 1;
                    } else {
                        return 0;
                    }
                };

                const nextForwardStep = () => {
                    if (indexToCheck[1] > teiViewerState.signatures.length) {
                        return teiViewerState.signatures.length - 1;
                    } else {
                        return indexToCheck[1] + 1;
                    }
                };
                indexToCheck = [nextBackStep(), nextForwardStep()];
            }
        });
    }

    $effect(() => {
        if (teiViewerState.updateTEI) {
            // page changed elsewhere

            // find the pb that corresponds to the new page
            const targetPbN =
                teiViewerState.signatures[
                    teiViewerState.currentPage - parseInt(startPage)
                ];

            let pb = document.querySelector(`tei-pb[n="${targetPbN}"]`);

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
                teiViewerState.currentSignature = pb.getAttribute("n");
            }
            teiViewerState.updateTEI = false;
        }
    });

    function scrollToPB(signature) {
        let pb = document.querySelector(
            `tei-pb[n="${signature}"]`,
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
            pb.scrollIntoView();
        }
    }

    onMount(async () => {
        try {
            if (path === "" || path === undefined) {
                throw "No path specified";
            }
            await loadTei(path).then(() => {
                // checks to see if array of pbs is in state
                if (teiViewerState.signatures.length == 0) {
                    // get an array of all pbs
                    const pbElm = document.querySelectorAll("tei-pb");
                    // put the n attribute of each pb in the teiVierState store
                    pbElm.forEach((pb) => {
                        teiViewerState.signatures.push(pb.getAttribute("n"));
                    });
                }

                if (teiViewerState.currentSignature === undefined) {
                    teiViewerState.currentSignature =
                        teiViewerState.signatures[0];
                } else if (
                    teiViewerState.currentPage !==
                    teiViewerState.signatures.indexOf(
                        teiViewerState.currentSignature,
                    ) +
                        parseInt(startPage)
                ) {
                    // If the current page and current signature do not match, update the current signature to match -- means the view was facsimile only and the page was changed:
                    teiViewerState.currentSignature =
                        teiViewerState.signatures[
                            teiViewerState.currentPage - parseInt(startPage)
                        ];

                        scrollToPB(
                            teiViewerState.currentSignature,
                        );
                } else {
                    // if the current signature is not the first one, scroll to it
                    scrollToPB(
                            teiViewerState.currentSignature,
                        );
                }

                // Might need to adjust the rate ot throttling later -- currently hard to tell because the iiif document is taking a while
                const throttledScrollHandler = _.throttle(
                    turnPageOnScroll,
                    300,
                );

                const debouncedScrollHandler = _.debounce(
                    turnPageOnScroll,
                    150,
                );

                document
                    .querySelector("[data-testid='transcription']")
                    .addEventListener("scroll", debouncedScrollHandler);
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
