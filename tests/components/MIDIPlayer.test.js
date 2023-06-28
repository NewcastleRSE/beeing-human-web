import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import MIDIPlayer from '../../src/lib/MIDIPlayer.svelte';

import {timeMap, meiMidi} from '../mocks/mockVarsMEI';

import { AudioContext } from "standardized-audio-context-mock";

// Testing components that use the AudioContext is quite complicated -- parking this for now  as it isn't mission critical -- created a GH issue (#36) to document this decision
// describe('Display MIDI playback controls and play midi', () => {
//     afterEach(() => cleanup());

//     global.AudioContext = AudioContext;

//     it('should be able to mount the component', () => {
//         let container = render(MIDIPlayer, {midiFile: meiMidi, timeMap: timeMap});
//         expect(container).toBeTruthy();
//     });
// });

describe('No tests have been developed here yet', () => {
    it('should be testing nothing', () => {
        let container = '';
        expect(container).toBeFalsy();
    });

});