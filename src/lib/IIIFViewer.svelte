<script>

    import { onDestroy, onMount } from "svelte";
    import { browser } from "$app/environment";

    // This needs to be imported only on the browser, otherwise it will generate an error
    // import "tify";
    import "tify/dist/tify.css";

    let loaded = $state(false);
    let iiif = $state(undefined);

    let { manifest = undefined, startPage = undefined } = $props();

    function buildIIIFY(manifest) {
        iiif = new Tify({
            container: "#facsimile-viewer",
            manifestUrl: manifest,
        });
        removeHeader()
    }

    async function removeHeader() {
        try {
            await iiif.ready.then(() => {
                iiif.setPage([parseInt(startPage)]);
                const iiifTitleHeader = document.getElementsByClassName('tify-header-title')[0];
                if (iiifTitleHeader) {
                    iiifTitleHeader.remove();
                }
            })
        } catch (e) {
            console.warn('tify is not ready')
        }
    }

    async function changePage(pageNumber) {
        try {
            await iiif.ready.then(() => {
                iiif.setPage([parseInt(pageNumber)]);
            });
        } catch (e) {
            console.warn('tify is not ready');
        }
    }

    async function previousPage() {
        try {
            await iiif.ready.then(() => {
                console.log(iiif.viewer)
            });
        } catch (e) {
            console.warn('tify is not ready', e);
        }
    }

    async function nextPage() {
        try {
            await iiif.ready.then(() => {
                iiif.nextPage();
            });
        } catch (e) {
            console.warn('tify is not ready');
        }
    }

    onMount(async () => {
        if (browser) {
            try {
                // import tify and create a new instance
                await import("tify").then(() => {
                    if (manifest && startPage) {
                        buildIIIFY(manifest)
                    }
                });
                loaded = true
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


<button onclick={() => previousPage()}>-</button><button onclick={() => changePage(2)}>Go to Page 2</button><button onclick={() => nextPage()}>+</button>
<div id="facsimile-viewer" class="h-full">
</div>

