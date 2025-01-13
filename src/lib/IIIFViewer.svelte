<script>
    import { onDestroy, onMount } from "svelte";
    import { browser } from "$app/environment";
    import {elementReady} from '../utils/generalHelpers'

    // This needs to be imported only on the browser, otherwise it will generate an error
    // import "tify";
    import "tify/dist/tify.css";

    let loaded = $state(false);
    let iiif = $state(undefined);
    let currentPage = $state(undefined);

    let { manifest = undefined, startPage = undefined } = $props();

    function buildIIIFY(manifest) {
        iiif = new Tify({
            container: "#facsimile-viewer",
            manifestUrl: manifest,
        });
        removeHeader();
        addListenersToButtons();
    }

    async function removeHeader() {
        try {
            await iiif.ready.then(() => {
                iiif.setPage([parseInt(startPage)]);
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

    async function addListenersToButtons() {
        try {
            await iiif.ready.then(() => {
                // Add event listener to the next page button
                elementReady(".tify-scan-page-button.-next").then(() => {
                    const nextButton = document.querySelector(".tify-scan-page-button.-next");
                    nextButton.addEventListener('click', () => {
                        currentPage += 1;
                    })
                })

                elementReady(".tify-header-button[title='Next page']").then(() => {
                    const nextButton = document.querySelector(".tify-header-button[title='Next page'");
                    nextButton.addEventListener('click', () => {
                        currentPage += 1;
                    });
                })

                elementReady(".tify-scan-page-button.-previous").then(() =>{
                    const prevButton = document.querySelector(".tify-scan-page-button.-previous");
                    prevButton.addEventListener('click', () => {
                        currentPage -= 1;
                    })
                })

                elementReady(".tify-header-button[title='Previous page']").then(() => {
                    const prevButton = document.querySelector(".tify-header-button[title='Previous page'");
                    prevButton.addEventListener('click', () => {
                        currentPage -= 1;
                    });
                })

            });
        } catch (e) {
            console.warn("tify is not ready", e);
        }
    }

    async function changePage(pageNumber) {
        try {
            await iiif.ready.then(() => {
                iiif.setPage([parseInt(pageNumber)]);
            });
        } catch (e) {
            console.warn("tify is not ready");
        }
    }

    async function previousPage() {
        try {
            await iiif.ready.then(() => {
                currentPage -= 1;
                changePage(currentPage);
            });
        } catch (e) {
            console.warn("tify is not ready", e);
        }
    }

    async function nextPage() {
        try {
            await iiif.ready.then(() => {
                currentPage += 1;
                changePage(currentPage);
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
                        buildIIIFY(manifest);
                        if (currentPage === undefined) {
                            currentPage = parseInt(startPage);
                        }
                    }
                });
                loaded = true;
            } catch (e) {
                console.error(e);
            }
        }
        loaded = true;
    });

    onDestroy(() => {
        if (iiif) {
            iiif.destroy();
        }
    });
</script>

{@debug currentPage}

<button onclick={() => previousPage()}>-</button><button
    onclick={() => changePage(2)}>Go to Page 2</button
><button onclick={() => nextPage()}>+</button>
<div id="facsimile-viewer" class="h-full"></div>
