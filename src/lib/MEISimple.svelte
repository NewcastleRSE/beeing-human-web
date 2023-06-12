<!--
    @component
    This is a naive implementation of Verovio to engrave MEI data into an SVG. Later development should focus in moving this transformation server side, at build time.
    
-->

<script>
    import { onMount } from "svelte";
    import verovio from 'verovio';
    import MidiPlayer from "./MIDIPlayer.svelte";

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
                    let base64midi = vrvToolkit.renderToMidi();
                    let midiString = 'data:audio/midi;base64,' + base64midi;
                });
        }

    });

</script>

<div id="MEI-container" data-testid="MEI-Container">
</div>
<MidiPlayer midiFile = midiString/>