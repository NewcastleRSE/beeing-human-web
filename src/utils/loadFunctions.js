import createVerovioModule from 'verovio/wasm';
import {VerovioToolkit} from 'verovio/esm';

export async function loadMei(meiString, arrBuff = false) {
    /**
     * Function takes an MEI file as a string and returns the generated SVG(array) and MIDI(string base64) in an object
    * @param {string} meiString - an MEI file as a string
    * @param {boolean} arrBuff - flag to output the MIDI file as an array buffer. False by default.
    */

    // Initialise variables
    let meiSvg = [];
    let meiMidi = '';
    let mei = {};
    let base64midi = '';
    
    // waits for the creation of the Verovio Module
    let VerovioModule = await createVerovioModule();
    
    // Start new toolkit
    const vTk = new VerovioToolkit(VerovioModule);
    
    // Set default options for the toolkit
    // console.log(vTk.getOptions()) for a full list of available options
    vTk.setOptions({
    scale: 30,
    });

    // Load the MEI string into the verovio toolkit, returns true if sucessful
    let loaded = vTk.loadData(meiString);

    if (loaded) {
        // get nr of pages in the MEI file, according to verovio default rendering
        let nrPages = vTk.getPageCount();

        // render the svg for each page, add to an array
        for (let page = 1; page <= nrPages; page++) {
            let meiPage = vTk.renderToSVG(page);
            meiSvg.push(meiPage);
        }

        // render the mei into a base64 string, add the necessary header
        base64midi = vTk.renderToMIDI();
    }

    // if the engraving was successful, build and return the mei object
    if (meiSvg.length > 0) {
        mei.svg = meiSvg;
        if (arrBuff) {
            mei.midi = base64midi;
        } else {
            meiMidi = 'data:audio/midi;base64,' + base64midi;
            mei.midi = meiMidi;
        }
        // Get timemap of notes on and off in miliseconds
        let timeMap = vTk.renderToTimemap();

        // Get list of notes that are turned on but never turned off
        // let danglingNotes = getDanglingNotes(timeMap);

        // Refactor timemap so that notes can be called by time
        let refactoredTimeMap = {}
        for (let entry of timeMap) {
            refactoredTimeMap[parseInt(entry.tstamp)] = entry;
        }
        
        // add timemap to mei object
        mei.timeMap = refactoredTimeMap;
        
        return mei;
    } else {
        return false;
    }
}

function getDanglingNotes(timeMap) {
    // Function looks through the timemap to find notes that are turned on but never turned off
    let leftoverNotes = []
    for (let entry of timeMap) {
        if (entry.on) {
            for (let note of entry.on) {
                leftoverNotes.push(note);
            }
        }
        if (entry.off) {
            for (let note of entry.off) {
                leftoverNotes = leftoverNotes.filter(e => e !== note);
            }
        }
    }
    // console.log(leftoverNotes);

}
