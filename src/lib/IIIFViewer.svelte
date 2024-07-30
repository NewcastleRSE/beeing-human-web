<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import {ProgressRadial} from '@skeletonlabs/skeleton'

    // import "tify";
    import "tify/dist/tify.css";

    let iiif = undefined;
    let loaded = false;
    export let manifest =
        "https://iiif.archive.org/iiif/catalogueofbirds1623butl/manifest.json";

    onMount(async () => {
        if (browser) {
            await import("tify")
            iiif = new Tify({
                manifestUrl: manifest,
            });
        }
        loaded = true;
    });

    $: if (loaded && browser && iiif) {
        iiif.mount('#facsimile-viewer')

        iiif.ready.then( () => {
            iiif.setPage([23]);
            
            // Remove the header -- some of this functionality might need to be moved somewhere else
            const tifyHeader = document.getElementsByClassName('tify-header')[0]
            tifyHeader.remove()
        })
    }
    
</script>

{#if !loaded}
    <ProgressRadial/>
{/if}
<div id="facsimile-viewer"/>
