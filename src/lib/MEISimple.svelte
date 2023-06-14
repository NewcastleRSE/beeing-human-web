<!--
    @component
    This is a naive implementation of Verovio to engrave MEI data into an SVG. Later development should focus in moving this transformation server side, at build time.
    
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