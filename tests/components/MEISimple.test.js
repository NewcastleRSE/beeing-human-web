import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import MEISimple from '../../src/lib/MEISimple.svelte'

import { meiSvg, singleMeiSvg, meiMidi, timeMap } from "../mocks/mockVarsMEI";

vi.hoisted(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        enumerable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // deprecated
            removeListener: vi.fn(), // deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe('Transform and display MEI file', () => {
    afterEach(() => cleanup());

    it('should be able to mount the component', () => {
        const container = render(MEISimple, {meiSvg: '', meiMidi: '', timeMap: ''});
        expect(container).toBeTruthy();
    });

    // MIDI playback is currently not deployed
    // it('should display an error message if no midi file or no timeMap is passed', async () => {
    //     render(MEISimple, {meiSvg: '', meiMidi: '', timeMap: ''}); 
    //     const errorMessage = await screen.findByText('Playback is not available', {exact: false});
    //     expect(errorMessage).toBeTruthy();
    // });

    it('should display an error message if no SVG file is passed', async () => {
        render(MEISimple, {meiSvg: '', meiMidi: '', timeMap: ''});
        const errorMessage = await screen.findAllByText('Could not engrave the MEI file.', {exact: false});
        expect(errorMessage).toBeTruthy();
    });

    it('should render a single SVG object when a single page is passed', async () => {
        const container = render(MEISimple, {meiSvg: singleMeiSvg, meiMidi: '', timeMap: ''});
        const nrSvgs = (await container.findAllByText('engraved with', {exact: true})).length
        expect(nrSvgs).toEqual(singleMeiSvg.length);
    });
    
    it('should render a single SVG object when multiple pages are passed, because the other pages are hidden by the paginator', async () => {
        const container = render(MEISimple, {meiSvg: meiSvg, meiMidi: '', timeMap: ''});
        const nrSvgs = (await container.findAllByText('engraved with', {exact: true})).length
        expect(nrSvgs).toEqual(1);
    });

    it('should not create a paginator object when a single page is passed', async () => {
        render(MEISimple, {meiSvg: singleMeiSvg, meiMidi: '', timeMap: ''})
        const paginator = await screen.queryByTestId('paginator')
        expect(paginator).toBeFalsy();
    });

    it('should create a paginator object when multiple pages are passed', async () => {
        render(MEISimple, {meiSvg: meiSvg, meiMidi: '', timeMap: ''})
        const paginator = await screen.findByTestId('paginator')
        expect(paginator).toBeTruthy();
    });

    // MIDI playback is currently not deployed

    // it('should not create a MIDIPlayer with a midi file but without a timemap', async () => {
    //     render(MEISimple, {meiSvg: meiSvg, meiMidi: meiMidi, timeMap: ''});
    //     const error = await screen.findByText('Playback is not available');
    //     expect(error).toBeTruthy();
    // });

    // it('should not create a MIDIPlayer without a midi file but with a timemap', async () => {
    //     render(MEISimple, {meiSvg: meiSvg, meiMidi: '', timeMap: timeMap});
    //     const error = await screen.findByText('Playback is not available');
    //     expect(error).toBeTruthy();
    // });

    // This test fails because it needs to mock an audio context -- probably easier to do it in E2E, rather than component testing
    /*
    it('should create a MIDIPlayer with a midi file and a timemap', async () => {
        render(MEISimple, {meiSvg: singleMeiSvg, meiMidi: meiMidi, timeMap: timeMap});
        const buttons = await screen.findAllByRole('button');
        expect(buttons.length).toEqual(2);
    });
    */
})