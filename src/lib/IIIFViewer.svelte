<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import {ProgressRadial} from '@skeletonlabs/skeleton'

    // This needs to be imported only on the browser, otherwise it will generate an error
    // import "tify";
    import "tify/dist/tify.css";

    let iiif = undefined;
    let loaded = false;
    // export let manifest =
    //     "https://iiif.archive.org/iiif/catalogueofbirds1623butl/manifest.json";

    // alternative manifest
    export let manifest = "https://iiif.archive.org/iiif/RAM2023-1081/manifest.json"

    export let startPage = 5;

    onMount(async () => {
        if (browser) {
            // import tify and create a new instance
            await import("tify")
            iiif = new Tify({
                manifestUrl: manifest,
            });
        }
        loaded = true;
    });

    $: if (loaded && browser && iiif) {
        // once it's loaded and we're on the browser, it mounts the instance to the correct div
        iiif.mount('#facsimile-viewer')

        iiif.ready.then( () => {
            // sets the starting page
            // iiif.setPage([21]);

            // for alternative manifest
            iiif.setPage([startPage])
            
            // Remove the header -- some of this functionality might need to be moved somewhere else
            // const tifyHeader = document.getElementsByClassName('tify-header')[0]
            // tifyHeader.remove()
            
            // Remove just the title bar
            const tifyTitle = document.getElementsByClassName('tify-header-title')[0];
            tifyTitle.remove();
        })
    }
    
</script>

{#if !loaded}
    <ProgressRadial/>
{/if}
<div id="facsimile-viewer"/>

<style>
    #facsimile-viewer {
        height: 100vh;
    }
</style>
