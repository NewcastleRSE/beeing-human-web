<!--
    @component
    This is a simple implementation of a midiplayer, to try playback from the MEI encoded music notation. See [the npm page](https://www.npmjs.com/package/midi-player-js) for more.

    Currently it is capable of decoding the string into MIDIjs, but it needs another library to play it. [See this example](https://github.com/grimmdude/MidiPlayerJS/blob/master/demo/js/app.js) for a case using (soundfont-player)[https://github.com/danigb/soundfont-player] -- this has, however, been deprecated, and they recommend using [smplr](https://github.com/danigb/smplr) which is a lot more powerful than `MIDIPlayerSimple` but that will take some considerable dev time to get working.

    props:
        `midiFile`: a midi file encoded as a base64 string exported from Verovio, excluding the header `data:audio/midi;base64,`
    usage:
        `<MIDIPlayer midiFile = {midiString}/>`
    
-->

<script>
    import MidiPlayer from 'midi-player-js';
    import Icon from '@iconify/svelte';
    import { RangeSlider } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';

    import {Soundfont} from 'smplr';

    // PARAMETERS
    export let midiFile = undefined;

    let Player = undefined;
    let context = undefined;
    let instruments = [];
    let totalTime = 0;
    let currentTime = 0;

    const startPlay = function() {
        if (Player.isPlaying()) {
            Player.pause();
            stopInstruments();
        } else {
            Player.play();
        }
    }

    const stopPlay = function() {
        stopInstruments();
        context.suspend();
        Player.stop();
        currentTime = 0;
    }

    const stopInstruments = function() {
        for (let i = 0; i < instruments.length; i++){
            instruments[i].stop();
        }
    }

    const playNote = function(event) {
        context.resume();
        // in the example file, stopped notes have velocity = 0, this might need to be readjusted
        if (event.name == 'Note on' && event.velocity > 0) {
            // playable tracks start at index 1, instruments at index 0, but track 1 does not have a playable instrument -- this might need to be adjusted for the real case;
            instruments[event.track - 2].start({note: event.noteName, velocity: event.velocity});
        } else if (event.name == 'Note on' && event.velocity == 0) {
            instruments[event.track -2].stop();
        }
    }

    const skipTo = async function() {
        // function works but is a bit flaky -- need to await the result of skip to restart
        if (Player.isPlaying()) {
            stopInstruments();
            await Player.stop();
            await Player.skipToSeconds(currentTime);
            startPlay();
        } else {
            Player.skipToSeconds(currentTime);
            console.log('here');
        }
    }

    onMount(async ()=> {
        // start player
        Player = new MidiPlayer.Player((event) => playNote(event));
        // let buffer = base64ToBuffer(midiFile);
        // Player.loadArrayBuffer(buffer);
        Player.loadDataUri(midiFile);
        totalTime = Player.getSongTime();
        
        // create audio context
        context = new AudioContext();

        // load instrument per track
        let nrInstruments = Player.tracks.length - 1
        for (let i = 0; i < nrInstruments; i++) {
            let instrument = await new Soundfont(context, {
                instrument: 'church_organ'
                // instrument: 'acoustic_grand_piano'
            }).loaded();
            instruments.push(instrument);
        };

        // update current play time
        setInterval(function () {
            if (Player.isPlaying()) {
                currentTime = totalTime - Player.getSongTimeRemaining();
            }
        }, 1000)
    });

    // Utility functions (might be separated into a different module later)
    function secsToMinSecs(time) {
        // converts total time in seconds into a minutes:seconds string
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes *60);
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');
        return `${minutes}:${seconds}`
    }

</script>

<button id="playMIDI" on:click={startPlay}><Icon icon="material-symbols:play-pause"/></button>
<button id="stopMIDI" on:click={stopPlay}><Icon icon="material-symbols:stop"/></button>
<span>
    {secsToMinSecs(currentTime)}
    <RangeSlider bind:value={currentTime} bind:max={totalTime} step={0.5} on:click={skipTo(currentTime)}/>
    {secsToMinSecs(totalTime)}
</span>