<script>
    import TeiSimple from "./TEISimple.svelte";
    import IiifViewer from "./IIIFViewer.svelte";

    export let startPage;

    import {activeDataset, activeView} from '../stores/dataViewer'
    import { onMount } from "svelte";

    import transcriptionData from '../routes/(sections)/literature/transcription/transcriptionData.json'

    let ready = false;

    onMount (() => {
        if ($activeDataset === 0) {
            $activeDataset = "1623";
        }
        ready = true;
    })

    $: console.log($activeDataset, $activeView)

</script>

{#if ready}
    <div class="md:flex w-full mx-auto md:p-8 max-h-screen">
        <div class="md:flex-1 md:w-full md:w-1/2 md:max-h-full" data-testid="iiif-viewer">
            <IiifViewer manifest = {transcriptionData[$activeDataset].iiifManifest} startPage= {transcriptionData[$activeDataset].manifestStartPage}/>
        </div>
        <div class="md:flex w-full md:w-1/2 md:overflow-auto" data-testid="transcription">
            
            <TeiSimple
                path={transcriptionData[$activeDataset].teiURL}
            />
        </div>
    </div>
{/if}
