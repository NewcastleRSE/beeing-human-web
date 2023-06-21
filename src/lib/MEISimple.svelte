<!--
    @component
    This is a naive implementation of Verovio to engrave MEI data into an SVG and pass the generated MIDI file to the player. The transformation happens server side, at build time, and the component expects the result in page.data. The component runs through each SVG page in the array and displays it -- later development can introduce pagination to this.
    props:
        `meiSvg`: an array of SVGs (one per page) to be rendered;
        `meiMidi`: a base64 string representing a MIDI file;
        `timeMap`: a JSON object callable by time in miliseconds, timeMap[{time}][on] returns an array of notes being played and timeMap[{time}][off] returns an array of notes that should stop playing
    usage:
        ```
        <MEISimple meiSvg = {data.view.mei.svg} meiMidi = {data.view.mei.midi} timeMap = {data.view.mei.timeMap}/>
        ```
    
-->

<script>
    import MidiPlayerSimple from "./MIDIPlayerSimple.svelte";
    import MIDIPlayer from "./MIDIPlayer.svelte";

    export let meiSvg = undefined;
    export let meiMidi = undefined;
    export let timeMap = undefined;

    const noteOn = function (event) {
        // when a note is played, add a custom class to the element with the corresponding note id
        for (let i in event.detail) {
            let element = document.getElementById(event.detail[i])
            element.classList.add('note-playing');
        }
    }

    const noteOff = function (event) {
        // when a note stops playing, removes the custom class to the element with the corresponding note id
        for (let i in event.detail) {
            let element = document.getElementById(event.detail[i])
            element.classList.remove('note-playing');
        }
    }

    const allNotesOff = function (event) {
        // removes the 'note-playing' class from all notes
        const collection = document.getElementsByClassName('note-playing');
        let ids = []
        // Because getElementsByClassName, this loop should only get the ids of elements to be updated -- changing the class list on the HTMLCollection loop leads to unpredictable results
        for (let element of collection) {
            ids.push(element.id);
        }
        for (let id of ids) {
            let el = document.getElementById(id);
            el.classList.remove('note-playing');
        }
    }
</script>

<!-- <MidiPlayerSimple midiFile = {meiMidi}/> -->
<!-- MIDIPlayer currently emits two custom events, one with a note being played (noteOn) and one when a note stops playing (noteOff) -->
<MIDIPlayer midiFile = {meiMidi} timeMap = {timeMap} on:noteOn={noteOn} on:noteOff={noteOff} on:playStopped={allNotesOff} on:skipPlay={allNotesOff}/>
<div id="MEI-container">
    {#each meiSvg as page}
        {@html page}
    {/each}
</div>

<style>
    /* Style to fill in notes currently being played */
    :global(.note-playing) {
        fill: red;
        color: red;
    }
</style>