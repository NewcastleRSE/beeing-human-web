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

    let { path = "", statusCheck } = $props();

    let loaded = $state(false);
    let error = $state(undefined);

    async function loadTei(path) {
        console.log("adding tei");
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
                console.log("finished");
                loaded = true;
                statusCheck({ loaded: "loaded" });
                return path;
            });
    }

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
                    let pb = document.querySelector(
                        `tei-pb[n="${teiViewerState.currentSignature}"]`,
                    );

                    // if pb is hidden, find the closest visible element and scroll to that
                    if (pb && pb.classList.contains("hidden")) {
                        // find closest element that is not hidden
                        let closestVisible = pb.previousElementSibling;
                        while (closestVisible.classList.contains("hidden")) {
                            closestVisible =
                                closestVisible.previousElementSibling;
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

{@debug teiViewerState}

<div id="TEI-container" data-testid="TEI-container">
    {#if !loaded}
        <p id="loading-message">Loading...</p>
    {/if}
    {#if error}
        <p data-testid="error-message">{error}</p>
    {/if}
</div>
