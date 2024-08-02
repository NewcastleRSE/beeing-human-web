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

    onMount(async () => {
        if (browser) {
            try {
                // import tify and create a new instance
                await import("tify").then(() => {
                    if (manifest && startPage) {
                        iiif = new Tify({
                            container: "#facsimile-viewer",
                            manifestUrl: manifest,
                        });
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
        loaded = true;

        if (iiif) {
            iiif.ready.then(() => {
                iiif.setPage([parseInt(startPage)]);
                const iiifTitleHeader = document.getElementsByClassName('tify-header-title')[0];
                if (iiifTitleHeader) {
                    iiifTitleHeader.remove();
                }
            })
        }
    });

    onDestroy(() => {
        if (iiif) {
            iiif.destroy();
        }
    });
</script>

<div id="facsimile-viewer"></div>
<style>
    #facsimile-viewer {
        height: 100vh;
    }
</style>
