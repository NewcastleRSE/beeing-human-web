<script>
    import { onDestroy, onMount } from "svelte";
    import { browser } from "$app/environment";
    import { elementReady } from "../utils/generalHelpers";

    import { teiViewerState } from "../stores/teiViewer.svelte";

    import PageSelectButton from "./PageSelectButton.svelte";

    // This needs to be imported only on the browser, otherwise it will generate an error
    // import "tify";
    import "tify/dist/tify.css";

    let iiif = $state(undefined);
    let changeHere = false;

    let { manifest = undefined, startPage = undefined } = $props();

    function buildIIIFY(manifest) {
        iiif = new Tify({
            container: "#facsimile-viewer",
            manifestUrl: manifest,
        });
        removeHeader();
        addListenersToButtons();
        replacePageSelectButton();
    }

    async function removeHeader() {
        try {
            await iiif.ready.then(() => {
                iiif.setPage([teiViewerState.currentPage]);
                const iiifTitleHeader =
                    document.getElementsByClassName("tify-header-title")[0];
                if (iiifTitleHeader) {
                    iiifTitleHeader.remove();
                }
            });
        } catch (e) {
            console.warn("tify is not ready");
        }
    }

    async function replacePageSelectButton() {
        try {
            await iiif.ready.then(() => {
                const pageSelectButton = document.querySelector(
                    ".tify-header-column.-pagination",
                );
                if (pageSelectButton) {
                    // find custom page select button
                    let customButton = document.querySelector(
                        "#custom-page-select-button",
                    );
                    // replace the page select button with the custom button
                    pageSelectButton.replaceWith(customButton);
                }

                // find parent container
                const barHeader = document.querySelector(
                    ".tify-header-column.-title",
                );
                // delete class list
                barHeader.classList = "";
            });
        } catch (e) {
            console.warn("tify is not ready");
        }
    }

    async function addListenersToButtons() {
        try {
            await iiif.ready.then(() => {
                // Add event listener to the next page button
                elementReady(".tify-scan-page-button.-next").then(() => {
                    const nextButton = document.querySelector(
                        ".tify-scan-page-button.-next",
                    );
                    nextButton.addEventListener("click", () => {
                        teiViewerState.currentPage += 1;
                        teiViewerState.updateTEI = true;
                    });
                });

                elementReady(".tify-header-button[title='Next page']").then(
                    () => {
                        const nextButton = document.querySelector(
                            ".tify-header-button[title='Next page'",
                        );
                        nextButton.addEventListener("click", () => {
                            teiViewerState.currentPage += 1;
                            teiViewerState.updateTEI = true;
                        });
                    },
                );

                elementReady(".tify-scan-page-button.-previous").then(() => {
                    const prevButton = document.querySelector(
                        ".tify-scan-page-button.-previous",
                    );
                    prevButton.addEventListener("click", () => {
                        teiViewerState.currentPage -= 1;
                        teiViewerState.updateTEI = true;
                    });
                });

                elementReady(".tify-header-button[title='Previous page']").then(
                    () => {
                        const prevButton = document.querySelector(
                            ".tify-header-button[title='Previous page'",
                        );
                        prevButton.addEventListener("click", () => {
                            teiViewerState.currentPage -= 1;
                            teiViewerState.updateTEI = true;
                        });
                    },
                );
            });
        } catch (e) {
            console.warn("tify is not ready", e);
        }
    }

    async function changePage(pageNumber = teiViewerState.currentPage) {
        try {
            console.log("changing page to ", pageNumber);
            teiViewerState.scrolling = true;
            await iiif.ready.then(() => {
                iiif.setPage([parseInt(pageNumber)]);
                teiViewerState.currentPage = parseInt(pageNumber);
                console.log('changed page to ', pageNumber);
                changeHere = false;
                teiViewerState.scrolling = false;
            });
        } catch (e) {
            console.warn("tify is not ready");
        }
    }

    onMount(async () => {
        if (browser) {
            try {
                // import tify and create a new instance
                await import("tify").then(() => {
                    if (manifest && startPage) {
                        if (
                            teiViewerState.currentPage === undefined &&
                            teiViewerState.currentSignature === undefined
                        ) {
                            // mounting on first page load
                            teiViewerState.currentPage = parseInt(startPage);
                        }
                        buildIIIFY(manifest);
                        if (
                            
                            teiViewerState.currentSignature !== undefined
                        ) {
                            // mounting after the view was changed to transcription
                            changePage(
                                teiViewerState.signatures.indexOf(
                                    teiViewerState.currentSignature,
                                ) + parseInt(startPage),
                            );
                        }
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
    });

    $effect(() => {
        if (teiViewerState.updateIIIF) {
            // set currentSignature to the signature of the current page in the viewer
            changePage(
                teiViewerState.signatures.indexOf(
                    teiViewerState.currentSignature,
                ) + parseInt(startPage),
            );
            teiViewerState.updateIIIF = false;
        }
    });

    onDestroy(() => {
        if (iiif) {
            iiif.destroy();
        }
    });
</script>

{@debug teiViewerState}

<div id="facsimile-viewer" class="h-full"></div>
<PageSelectButton
    currentPage={teiViewerState.currentPage}
    newPage={(nP) => {
        teiViewerState.updateTEI = true;
        teiViewerState.updateSection = true;
        teiViewerState.currentPage = parseInt(nP);
    }}
/>
