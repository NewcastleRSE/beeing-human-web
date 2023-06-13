<!--
    @component
    This is a simple implementation of a midiplayer, to try playback from the MEI encoded music notation. It follows the Verovio guide:  see [this](https://book.verovio.org/interactive-notation/playing-midi.html) for more. The Midi library used is MIDIjs, which is a legacy library without (apparently) much in the way of customisation. See [the web page for more on the library](http://www.midijs.net/)
    
    props:
        `midiFile`: a midi file encoded as a base64 string exported from Verovio, including the header `data:audio/midi;base64,`
    usage:
        `<MIDIPlayerSimple midiFile = {midiString}`
-->

<script>
    export let midiFile = undefined;

    const startPlay = function() {
        console.log('start');
        MIDIjs.play(midiFile);
    }

    const stopPlay = function() {
        console.log('stop');
        MIDIjs.stop();
    }

</script>

<svelte:head>
    <script src="https://www.midijs.net/lib/midi.js"></script>
</svelte:head>

<button id="playMIDI" on:click={startPlay}>Play</button>
<button id="stopMIDI" on:click={stopPlay}>Stop</button>
