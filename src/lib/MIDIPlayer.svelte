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

    import { getMissingEvents, secsToMinSecs } from '../utils/MIDIPlaybackHelper'

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

    let missingEvents = undefined;
    let timers = [];

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
        dispatch('playStopped');
        for (let timer of timers) {
            clearTimeout(timer);
        }
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

        
        // gets the timeNow in miliseconds to allow for dynamic highlighting of the MEI score - 120 is the default BPM, need a way of getting this programatically
        let timeNow = Math.round(event.tick / Player.division / 120 * 60 * 1000);

        // sets timer to dispatch events that are not played
        if (missingEvents[timeNow]) {
            let timer = setTimeout(function () {
                // console.log(missingEvents[timeNow]);
                dispatch('noteOn', missingEvents[timeNow]['onNotes']);
                dispatch('noteOff', missingEvents[timeNow]['offNotes']);
            }, missingEvents[timeNow]['timerDelta']);
            // add timeout ID to an array so that it can be cleared if the users stops or pauses playback before the timer is activated
            // console.log(timer);
            timers.push(timer);
        }
        try {
            // if there is a play event, dispatch both notes on and off to update the interface
                if (event.name === 'Note on') {
                    dispatch('noteOn', timeMap[timeNow]['on']);
                    dispatch('noteOff', timeMap[timeNow]['off']);
                }
            }
            catch (error) {
                console.log(error);
                console.log(timeNow);
                console.log(timeMap);
            }
        if (event.name == 'Note on' && event.velocity > 0) {
            // playable tracks start at index 1, instruments at index 0, but track 1 does not have a playable instrument -- this might need to be adjusted for the real case;
            instruments[event.track - 2].start({note: event.noteName, velocity: event.velocity});
        } else if (event.name == 'Note on' && event.velocity == 0) {
            instruments[event.track -2 ].stop();
        }
    }

    const skipTo = async function() {
        if (Player.isPlaying()) {
            stopInstruments();
            dispatch('skipPlay');
            for (let timer of timers) {
                clearTimeout(timer);
            }
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

        // There is a know bug in syncing with the SVG highlighting: if the voice that is turned off is the only one to have a playevent at a particular point, it will either not turn on or not turn off, because the MIDI player is not emitting any play events. This will remain like this for now. Two possible solutions: 1) create a list of all the note IDs that belong to a particular voice and set timers to turn them on and off; or 2) dont' deactivate the track, but simply not play the instrument if a track is !playing -- this is, obviously, the better solution, but it is a little hacky.

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

        // Emit event when player reaches the end of the file
        Player.on('endOfFile', function() {
            dispatch('playStopped');
        })
        
        // # Load midi file
        Player.loadDataUri(midiFile);
        totalTime = Player.getSongTime();
        
        // # create audio context
        try {
            context = new AudioContext();
        } catch (error) {
            console.log(error);
            context = '';
        }

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
            'default': 'acoustic_grand_piano'
        }
        
        // Gets voices names from event list, initialises the instrument sample, builds the data object for voices
        for (let i = 1; i < eventList.length; i++) {
            let voice = 'default';
            if (eventList[i][0]['name'] === 'Sequence/Track Name') {
                // if there is a sequence/track name
                if (Object.keys(instrumentsChosen).includes(eventList[i][0]['string'])) {
                    voice = eventList[i][0]['string'];
                }
            }
            let instrument = await new Soundfont(context, {
                    instrument: instrumentsChosen[voice]
                }).loaded();
            instruments.push(instrument);
            voicesDict.push({
                    name: voice,
                    instrumentTrack: i-1,
                    chosenInstrument: instrumentsChosen[voice],
                    playing: true
                })
        }
        
        // # update current play time
        setInterval(function () {
            if (Player.isPlaying()) {
                currentTime = totalTime - Player.getSongTimeRemaining();
            }
        }, 1000)

        missingEvents = getMissingEvents(eventList, timeMap, Player.division);
        // console.log(missingEvents);

        // # Finish loading
        loaded = true;
    });
    

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