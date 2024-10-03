<script>
    import { onDestroy, onMount } from "svelte";
    import { browser } from "$app/environment";
    import { ProgressRadial } from "@skeletonlabs/skeleton";

    // This needs to be imported only on the browser, otherwise it will generate an error
    // import "tify";
    import "tify/dist/tify.css";

    let loaded = false;
    let iiif = undefined;

    export let manifest = undefined;
    export let startPage = undefined;

    function buildIIIFY(manifest) {
        iiif = new Tify({
            container: "#facsimile-viewer",
            manifestUrl: manifest,
        });
        removeHeader()
    }

    function removeHeader() {
        try {
            iiif.ready.then(() => {
                iiif.setPage([parseInt(startPage)]);
                const iiifTitleHeader = document.getElementsByClassName('tify-header-title')[0];
                if (iiifTitleHeader) {
                    iiifTitleHeader.remove();
                }
            })
        } catch (e) {
            console.warn('iiify is not ready')
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

        if (iiif && loaded) {
            
        }
    });

    onDestroy(() => {
        if (iiif) {
            iiif.destroy();
        }
    });

    $: if (iiif && loaded && manifest) {
        iiif.destroy();
        iiif = undefined;
        buildIIIFY(manifest);
    }
</script>

<div id="facsimile-viewer"></div>
<style>
    #facsimile-viewer {
        height: 100vh;
    }
</style>
