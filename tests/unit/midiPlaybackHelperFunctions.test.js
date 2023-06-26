import { afterEach, describe, expect, it } from "vitest";

import { timeMap, eventList } from "../mocks/mockVarsMEI";

import { secsToMinSecs, getMissingEvents } from "../../src/utils/MIDIPlaybackHelper";
import { cleanup } from "@testing-library/svelte";

afterEach(() => cleanup());

describe('Turn seconds into a MM:SS string', () => {
    it('should turn less than 60 seconds into a 00:SS string', () => {
        let seconds = 30;
        let expected = '00:30';
        expect(secsToMinSecs(seconds)).toEqual(expected);
    });

    it('should turn less than 10 seconds into a 00:0S string', () => {
        let seconds = 3;
        let expected = '00:03';
        expect(secsToMinSecs(seconds)).toEqual(expected);
    });

    it('should turn more than 60 seconds into a 0M:SS string', () => {
        let seconds = 90;
        let expected = '01:30';
        expect(secsToMinSecs(seconds)).toEqual(expected);
    });

    it('should turn more than 60 seconds into a MM:SS string', () => {
        let seconds = 630;
        let expected = '10:30';
        expect(secsToMinSecs(seconds)).toEqual(expected);
    });
});

describe('Produce a list of missing events', () => {
    it('should be able to produce a list of missing events given a timemap, eventList, and division', () =>  {
        let expected = {"2000":{"tick":480,"milliseconds":2000,"trackIndex":1,"missingEvent":4000,"timerDelta":2000,"onNotes":["m-92"],"offNotes":["m-71"]}}
        let result = getMissingEvents(eventList, timeMap, 120);
        expect(result).toEqual(expected);
    });
})