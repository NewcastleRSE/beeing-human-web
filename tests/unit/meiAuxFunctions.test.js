import { afterEach, beforeAll, describe, expect, it } from "vitest";

import { loadMei } from "../../src/utils/loadFunctions";
import { cleanup } from "@testing-library/svelte";
import {readFile} from 'fs/promises';

import { meiMidi, timeMap } from "../mocks/mockVarsMEI";

describe('Load MEI file and produce SVG', () => {
    let response;
    beforeAll(async () => {
        // load the file and create the response object which will be used by all tests
        let meiString = await readFile('static/content/music/data/CRIM_Model_0001.mei').then((buffer) => buffer.toString());
        
        response = await loadMei(meiString);
    });
    
    afterEach(() => cleanup());

    it('should be able to read a MEI file and turn it into an array of SVGs', async () => {
        // SVG was created
        expect(response.svg).toBeTruthy();
        // midi was created
        expect(response.midi).toBeTruthy();
        // timemap was created
        expect(response.timeMap).toBeTruthy();
    });

    it('should be able to create an svg array with the correct number of pages', async () => {
        const nrPages = 21
        
        expect(response.svg.length).toEqual(nrPages);
    });

    // It cannot create the same svg because some ids are generated on the fly
    // it('should create the same svg as the one previously defined', async () => {
    //     let meiString = await readFile('static/content/music/data/CRIM_Model_0001.mei').then((buffer) => buffer.toString());
    //     let response = await loadMei(meiString);

    //     expect(response.svg[0]).toEqual(meiSvg[0]);
    // }, {timeout: 15000});

    it('should create the same midi file as the one previously defined', async () => {
        expect(response.midi).toEqual(meiMidi);
    });

    it('should create the same timemap as the one previously defined', async () => {
        expect(response.timeMap).toEqual(timeMap);
    });
})