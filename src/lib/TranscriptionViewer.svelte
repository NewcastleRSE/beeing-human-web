<script>
    import TeiSimple from "./TEISimple.svelte";
    import IiifViewer from "./IIIFViewer.svelte";

    export let teiPath = "https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/dev/1623_consolidated.xml"

    export let iiifManifest;
    export let startPage;

    import {activeDataset, activeView} from '../stores/dataViewer'
    import { onMount } from "svelte";

    let ready = false;

    onMount (() => {
        if (!isNaN($activeDataset)) {
            $activeDataset = teiPath;
        }
        ready = true;
    })

    $: console.log($activeDataset, $activeView)

</script>

{#if ready}
    <div class="md:flex w-full mx-auto md:p-8 max-h-screen">
        <div class="md:flex-1 md:w-full md:w-1/2 md:max-h-full" data-testid="iiif-viewer">
            {#await iiifManifest then}
                <IiifViewer manifest = {iiifManifest} startPage= {startPage}/>
            {/await}
        </div>
        <div class="md:flex w-full md:w-1/2 md:overflow-auto" data-testid="transcription">
            
            <TeiSimple
                path={$activeDataset}
            />
        </div>
    </div>
{/if}
