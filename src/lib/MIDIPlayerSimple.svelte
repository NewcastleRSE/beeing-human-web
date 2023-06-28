<!--
    @component
    This is a simple implementation of a midiplayer, to try playback from the MEI encoded music notation. It follows the Verovio guide:  see [this](https://book.verovio.org/interactive-notation/playing-midi.html) for more. The Midi library used is MIDIjs, which is a legacy library without (apparently) much in the way of customisation. See [the web page for more on the library](http://www.midijs.net/)
    
    props:
        `midiFile`: a midi file encoded as a base64 string exported from Verovio, including the header `data:audio/midi;base64,`
    usage:
        `<MIDIPlayerSimple midiFile = {midiString}`
-->

<script>
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import { RangeSlider } from '@skeletonlabs/skeleton';
    export let midiFile = undefined;

    let playEvent = undefined;
    let pause = false;
    let totalTime = 0;
    let currentTime = 0;

    const startPlay = function() {
        console.log(playEvent);
        if (!playEvent) {
            MIDIjs.play(midiFile);
        } else if (pause) {
            MIDIjs.resume();
            pause = false;
        } else if (playEvent.status === 'playing') {
            MIDIjs.pause();
            pause = true;
        }
    }

    const stopPlay = function() {
        MIDIjs.stop();
        playEvent = undefined;
        currentTime = 0;
    }
    
    const playerEvents = function (event) {
        playEvent = event;
        currentTime = playEvent.time;
    }

    function secsToMinSecs(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes *60);
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');
        return `${minutes}:${seconds}`
    }

    onMount( () => {
        MIDIjs.player_callback = playerEvents;
        MIDIjs.get_duration(midiFile, (seconds) => {totalTime = seconds});
    });

</script>

<svelte:head>
    <script src="https://www.midijs.net/lib/midi.js"></script>
</svelte:head>

<button id="playMIDI" on:click={startPlay}><Icon icon="material-symbols:play-pause"/></button>
<button id="stopMIDI" on:click={stopPlay}><Icon icon="material-symbols:stop"/></button>
<span>
    {secsToMinSecs(currentTime)}
    <RangeSlider bind:value={currentTime} bind:max={totalTime} step={0.2}/>
    {secsToMinSecs(totalTime)}
</span>
