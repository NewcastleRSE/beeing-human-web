<!--
    @component
    This is a naive implementation of Verovio to engrave MEI data into an SVG and pass the generated MIDI file to the player. The transformation happens server side, at build time, and the component expects the result in page.data. The component runs through each SVG page in the array and displays it -- later development can introduce pagination to this.
    props:
        `meiSvg`: an array of SVGs (one per page) to be rendered;
        `meiMidi`: a base64 string representing a MIDI file;
    usage:
        ```
        <MEISimple meiSvg = {data.view.mei.svg} meiMidi = {data.view.mei.midi}/>
        ```
    
-->

<script>
    import MidiPlayerSimple from "./MIDIPlayerSimple.svelte";

    export let meiSvg = undefined;
    export let meiMidi = undefined;
</script>

<MidiPlayerSimple midiFile = {meiMidi}/>
<div id="MEI-container">
    {#each meiSvg as page}
        {@html page}
    {/each}
</div>