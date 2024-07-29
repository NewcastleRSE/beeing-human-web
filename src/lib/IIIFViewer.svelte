<script>
    import { onDestroy, onMount } from "svelte";
    import { browser } from "$app/environment";

    import "tify";
    import "tify/dist/tify.css";

    let iiif = undefined;
    export let manifest =
        "https://iiif.archive.org/iiif/catalogueofbirds1623butl/manifest.json";

    onMount(() => {
        if (browser) {
            iiif = new Tify({
                container: "#test",
                manifestUrl: manifest,
            });
        }
    });

    onDestroy(() => {
        if (browser && iiif) {
            iiif.destroy()
        }
    })
    
</script>

<div id="test" style="height: 640px" />
