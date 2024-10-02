<script>
    import TeiSimple from "./TEISimple.svelte";
    import IiifViewer from "./IIIFViewer.svelte";

    import {activeDataset, activeView, editorialNotes, variationDetail} from '../stores/dataViewer'
    import { onMount } from "svelte";

    import transcriptionData from '../routes/(sections)/literature/transcription/transcriptionData.json'
    import { elasticIn } from "svelte/easing";

    let ready = false;

    onMount (() => {
        if ($activeDataset === 0) {
            $activeDataset = "1623";
        }
        ready = true;
    })

    function changeVariationDetail($variationDetail) {
        if ($variationDetail === 'no variation') {
            const apps = document.getElementsByTagName('tei-app');
            for (const app of apps) {
                for (const el of app.children) {
                    el.classList = '';
                    el.classList.add('bg-transparent');
                    if (el.innerHTML === '[+1609]' || el.innerHTML === '[Does not exist in 1609]') {
                        el.textContent = ''
                    }
                }
            }
        } else if ($variationDetail === 'major changes') {
            console.log('just major changes');
        } else if ($variationDetail === 'all changes') {
            console.log('everyting');
        }
    }

    $: if (ready && $variationDetail) {
        changeVariationDetail($variationDetail);
    }

</script>

{#if ready}
    <div class="md:flex w-full mx-auto md:p-8 max-h-screen">
        {#if $activeView === 'both' || $activeView === 'facsimile'}
            <div class="md:flex-1 w-full {$activeView == 'both' ? 'md:w-1/2' : ''} md:max-h-full" data-testid="iiif-viewer">
                <IiifViewer manifest = {transcriptionData[$activeDataset].iiifManifest} startPage= {transcriptionData[$activeDataset].manifestStartPage}/>
            </div>
        {/if}
        {#if $activeView === 'both' || $activeView === 'transcription'}
            <div class="md:flex w-full {$activeView == 'both' ? 'md:w-1/2' : ''} md:overflow-auto" data-testid="transcription">
                <TeiSimple
                    path={transcriptionData[$activeDataset].teiURL}
                />
            </div>
        {/if}
    </div>
{/if}
