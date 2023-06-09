export function getMissingEvents(eventList, timeMap, division) {
    // returns an object indexed by miliseconds that includes details of missing events so that a timer can be triggered on play events
    /**
     * @typedef {Object} previousEvents, indexed by milliseconmds
     * @property {int} missingEvent - the missing event it corresponds to, in milliseconds
     * @property {int} timerDelta - the value to set the timer to, in milliseconds
     * @property {Array[string]} onNotes - an array of ids identifying the notes that should be on
     * @property {Array[string]} offNotes - an array of ids identigying the notes that should be off
     */
    
    // Figure out ticks that have 'Note On' events
    let listOfPlayEvents = {}
    for (let i = 1; i < eventList.length; i++) {
        for (let event of eventList[i]) {
            if (event.name === 'Note on') {
                let milliseconds = Math.round(event.tick / division / 120 * 60 * 1000);
                if (!listOfPlayEvents[milliseconds]) {
                    listOfPlayEvents[milliseconds] = {
                        'tick': event.tick,
                        'milliseconds': milliseconds,
                        'trackIndex': i,
                    }
                }
            }
        }
    }

    let listOfMissingEvents = []
    // compares the list of play events to the timemap and identifies the milliseconds that should have a play event but do not
    let keys = Object.keys(timeMap)
    for (let i of keys) {
        if (!listOfPlayEvents[parseInt(i)]) {
            listOfMissingEvents.push(parseInt(i));
        }
    }
    
    // for each missing event, find the last event that is not missing:
    let previousEvents = {};
    let previousEvent = undefined;
    keys = Object.keys(listOfPlayEvents);
    for (let missingEvent of listOfMissingEvents) {
        for (let i=0; i<keys.length; i++) {
            if (parseInt(keys[i]) < missingEvent) {
                // Build the previous event object
                previousEvent = listOfPlayEvents[keys[i]];
                previousEvent['missingEvent'] = missingEvent;
                previousEvent['timerDelta'] = missingEvent - previousEvent.milliseconds;
                previousEvent['onNotes'] = timeMap[missingEvent]['on'];
                previousEvent['offNotes'] = timeMap[missingEvent]['off'];
            }
        }
        previousEvents[previousEvent.milliseconds] = previousEvent;
    }

    return previousEvents
}

export function secsToMinSecs(time) {
    // converts total time in seconds into a minutes:seconds string
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes *60);
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${seconds}`
}