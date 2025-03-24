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
    import { teiBehaviours } from "../utils/teiBehaviours";

    import { teiViewerState } from "../stores/teiViewer.svelte";

    let { path = "", mediaRoot = "", statusCheck } = $props();

    let loaded = $state(false);
    let error = $state(undefined);
    let changedHere = false;

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
                // find TEI container
                document.querySelector("[data-testid='transcription']").addEventListener("scroll", () => {
                    // NEEDS TO CHANGE THE TRIGGERING BEHAVIOUR TO CHANGE THE STATE - AT EACH SCROLL CHECKS TO SEE IF THE CURRENT SIGNATURE IS STILL IN VIEW: IF SO, DOES NOTHING; IF NOT, CHANGES THE CURRENT SIGNATURE TO THE CLOSEST ONE IN VIEW
                    
                    changedHere = true;
                    console.log('will activate');
                });
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
