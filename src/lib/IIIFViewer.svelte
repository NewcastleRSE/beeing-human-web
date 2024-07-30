<script>
    import { onMount } from "svelte";
    import {beforeNavigate} from '$app/navigation';
    import { browser } from "$app/environment";

    // import "tify";
    import "tify/dist/tify.css";

    let iiif = undefined;
    export let manifest =
        "https://iiif.archive.org/iiif/catalogueofbirds1623butl/manifest.json";

    onMount(async () => {
        if (browser) {
            await import("tify")
            iiif = new Tify({
                container: "#test",
                manifestUrl: manifest,
            });
        }
    });
    
</script>

<div id="test" style="height: 640px" />
