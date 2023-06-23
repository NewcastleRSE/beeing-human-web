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
    import MIDIPlayer from "./MIDIPlayer.svelte";
    import Paginator from "./Paginator.svelte";

    export let meiSvg = undefined;
    export let meiMidi = undefined;
    export let timeMap = undefined;

    let goToPage;

    const noteOn = function (event) {
        // when a note is played, add a custom class to the element with the corresponding note id
        // console.log('Notes on: ', event.detail);
        for (let i in event.detail) {
            let element = document.getElementById(event.detail[i])
            if (!element) {
                // if the element does not exist in the currently displayed SVG, it looks for the page that has it and displays that page.
                for (let page in meiSvg) {
                    if (meiSvg[page].includes(`id="${event.detail[i]}"`)) {
                        goToPage(page);
                    }
                }
            }
            if (element) {
                element.classList.add('note-playing');
            }
        }
    }

    const noteOff = function (event) {
        // when a note stops playing, removes the custom class to the element with the corresponding note id
        // console.log('Notes off: ', event.detail);
        for (let i in event.detail) {
            let element = document.getElementById(event.detail[i])
            if(element) {
                // Only removes the class if the element is currently visible (if it isn't, it won't have the class anyway)
                element.classList.remove('note-playing');
            }
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
    {#if meiSvg.length > 1}
        <Paginator data = {meiSvg} raw=true bind:goToPage={goToPage}/>
    {:else}
        {@html meiSvg[0]}
    {/if}
</div>

<style>
    /* Style to fill in notes currently being played */
    :global(.note-playing) {
        fill: red;
        color: red;
    }
</style>