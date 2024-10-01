<script>
    import TeiSimple from "./TEISimple.svelte";
    import IiifViewer from "./IIIFViewer.svelte";

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
        {#if $activeView === 'both' || $activeView === 'facsimile'}
            <div class="md:flex-1 md:{$activeView == 'both' ? 'w-1/2' : 'w-full'} md:max-h-full" data-testid="iiif-viewer">
                <IiifViewer manifest = {transcriptionData[$activeDataset].iiifManifest} startPage= {transcriptionData[$activeDataset].manifestStartPage}/>
            </div>
        {/if}
        {#if $activeView === 'both' || $activeView === 'transcription'}
            <div class="md:flex w-full md:{$activeView == 'both' ? 'w-1/2' : 'w-full'} md:overflow-auto" data-testid="transcription">
                <TeiSimple
                    path={transcriptionData[$activeDataset].teiURL}
                />
            </div>
        {/if}
    </div>
{/if}
