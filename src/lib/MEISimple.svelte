<!--
    @component
    This is a naive implementation of Verovio to engrave MEI data into an SVG. Later development should focus in moving this transformation server side, at build time.
    
-->

<script>
    import { onMount } from "svelte";
    import verovio from 'verovio';
    // import MidiPlayer from "./MIDIPlayer.svelte";
    import MidiPlayerSimple from "./MIDIPlayerSimple.svelte";
    import { ProgressRadial } from '@skeletonlabs/skeleton'
    
    let midiString = '';
    let base64midi = '';
    let ready = false;

    onMount(async () => {
        verovio.module.onRuntimeInitialized = function () {
            // Starts a new verovio toolkit
            const vrvToolkit = new verovio.toolkit();

            // set rendering options
            vrvToolkit.setOptions({
                scale: 30
            });


            fetch('https://www.verovio.org/examples/downloads/Schubert_Lindenbaum.mei')
                .then((response) => response.text())
                .then((meiXML) => {
                    let svg = vrvToolkit.renderData(meiXML, {});
                    document.getElementById("MEI-container").innerHTML = svg;
                    base64midi = vrvToolkit.renderToMIDI();
                    midiString = 'data:audio/midi;base64,' + base64midi;
                    ready = true;
                });
        }

    });

</script>

<div id="MEI-container" data-testid="MEI-Container">
    {#if !ready}
        <ProgressRadial/>
    {/if}
</div>
{#if !base64midi}
    <p>Not ready yet!</p>
{:else}
    <!-- <MidiPlayer midiFile = {base64midi}/> -->
    <MidiPlayerSimple midiFile = {midiString}/>
{/if}