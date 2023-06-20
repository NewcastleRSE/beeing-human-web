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
    import { RangeSlider, ProgressRadial, SlideToggle } from '@skeletonlabs/skeleton';
    import { onMount, createEventDispatcher } from 'svelte';

    import {Soundfont} from 'smplr';

    // PARAMETERS
    export let midiFile = undefined;
    export let timeMap = undefined;

    // Event dispatcher
    const dispatch = createEventDispatcher();

    let Player = undefined;
    let context = undefined;
    let instruments = [];
    let totalTime = 0;
    let currentTime = 0;
    let loaded = false;
    // initialise data object for voices
    let voicesDict = []

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

        // disable all voices that have been turned off -- this is needed if the user skips to a certain time after enabling or disabling voices
        for (const voice in voicesDict) {
            if (!voicesDict[voice]['playing']) {
                Player.tracks[parseInt(voice) + 1].disable();
            }
        }

        console.log(event);
        
        // gets the timeNow in miliseconds to allow for dynamic highlighting of the MEI score - 120 is the default BPM, need a way of getting this programatically
        let timeNow = Math.round(event.tick / Player.division / 120 * 60 * 1000);
        if (event.name == 'Note on' && event.velocity > 0) {
            try {
                dispatch('noteOn', timeMap[timeNow]['on']);
            }
            catch (error) {
                console.log(error);
                console.log(timeNow);
                console.log(timeMap);
            }
            // playable tracks start at index 1, instruments at index 0, but track 1 does not have a playable instrument -- this might need to be adjusted for the real case;
            instruments[event.track - 2].start({note: event.noteName, velocity: event.velocity});
        } else if (event.name == 'Note on' && event.velocity == 0) {
            try {
                dispatch('noteOff', timeMap[timeNow]['off']);
            }
            catch (error) {
                console.log(error);
                console.log(timeNow);
                console.log(timeMap);
            }
            instruments[event.track -2].stop();
        }
    }

    const skipTo = async function() {
        if (Player.isPlaying()) {
            stopInstruments();
            await Player.stop();
            await Player.skipToSeconds(currentTime);
            startPlay();
        } else {
            Player.skipToSeconds(currentTime);
        }
    }

    const toggleVoice = function () {
        // splits the index and name in the prop name of the SlideToggle
        // this.name is in the format [int]-name
        const indexName = this.name.split('-')

        if (!voicesDict[parseInt(indexName[0])]['playing']) {
            instruments[parseInt(indexName[0])].stop();
            Player.tracks[parseInt(indexName[0]) + 1].disable();
        } else {
            Player.tracks[parseInt(indexName[0]) + 1].enable();
        }
    }

    onMount(async ()=> {
        // # start player
        Player = new MidiPlayer.Player((event) => playNote(event));
        
        // # Load midi file
        Player.loadDataUri(midiFile);
        totalTime = Player.getSongTime();
        
        // # create audio context
        context = new AudioContext();

        // # Find voices list and load instruments
        
        // get list of events (one track for each voice, plus one track with playback information (eventList[0]))
        let eventList = Player.getEvents();

        // initialise object with chosen samples for each voice -- this needs to be updated manually to reflect the names of each voice and the chosen instrument from https://gleitz.github.io/midi-js-soundfonts/MusyngKite/names.json
        const instrumentsChosen = {
            'Superius': 'violin',
            'Contratenor': 'viola',
            'PrimusTenor': 'cello',
            'SecundusTenor': 'flute',
            'Bassus': 'contrabass',
        }
        
        // Gets voices names from event list, initialises the instrument sample, builds the data object for voices
        for (let i = 1; i < eventList.length; i++) {
            if (eventList[i][0]['name'] === 'Sequence/Track Name') {
                let instrument = await new Soundfont(context, {
                    instrument: instrumentsChosen[eventList[i][0]['string']]
                }).loaded();
                instruments.push(instrument);
                voicesDict.push({
                    name: eventList[i][0]['string'],
                    instrumentTrack: i-1,
                    chosenInstrument: instrumentsChosen[eventList[i][0]['string']],
                    playing: true
                })
            }
        }
        console.log(voicesDict);
        
        // # update current play time
        setInterval(function () {
            if (Player.isPlaying()) {
                currentTime = totalTime - Player.getSongTimeRemaining();
            }
        }, 1000)

        // # Finish loading
        loaded = true;
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
    {#if !loaded}
        <ProgressRadial/>
    {:else}
        {secsToMinSecs(currentTime)}
        <RangeSlider bind:value={currentTime} bind:max={totalTime} step={0.5} on:click={skipTo(currentTime)}/>
        {secsToMinSecs(totalTime)}
        {#each voicesDict as voice}
            <br/>
            <span>{voice.name}</span><SlideToggle name={voice.instrumentTrack}-{voice.name} bind:checked={voice.playing} on:change={toggleVoice}/>
        {/each}
    {/if}
</span>