import {afterEach, describe, expect, it} from 'vitest';
import { cleanup } from '@testing-library/svelte';

import { getPortalsAPI } from '../../src/utils/apiHelper';

describe('Test getPortalsAPI function', () => {
    afterEach(() => cleanup());

    it('should throw a reference error if no paths were given', async () => {
        // nothing was passed to the function
        expect(() => getPortalsAPI()).toThrowError('No list of paths was passed to the API function');

        // empty object was passed to the function
        const emptyObject = {}
        expect(() => getPortalsAPI(emptyObject)).toThrowError('No list of paths was passed to the API function');

    });

    it('should return an object with an error key if the path is not well formed', () => {
        const fakePathObject = {
            'not a path': {'default': 'not content'},
            '/wellFormedPath.md': {'default': 'this is content but without a portal'},
            '/wellFormedPath2.md': {'default': 'this is content and contains a <Portal id="fakePortal">Portal</Portal>.'},
            'another bad path': {'default': 'also not content'}
        }
        const result = getPortalsAPI(fakePathObject);
        expect(Object.keys(result).includes('errors'));
        expect(result.errors.length).toEqual(2);
        expect(result.errors).toEqual(['not a path', 'another bad path'])
    });

    it('should return an object with an error key if it contains malformed XML', () => {
        const fakePathObject = {
            '/good/path.md': {'default': 'This is a correct <Portal id="goodPortal">portal</Portal>'},
            '/bad/path.md': {'default': 'This <Portal>Portal never closes and is incorrect'},
            '/mixed/path.md': {'default': 'This <Portal id="wellFormed">Portal</Portal> contains a mix of well and <Portal>badly formed portals'},
            '/another/mixed/path.md': {'default': 'This <Portal id="openPortal">document contains a good <Portal id="closedPortal">portal</Portal> inside a bad portal'},
            '/no/portals.md': {'default': 'This entry contains no portals and should not produce any errors'}
        }

        const result = getPortalsAPI(fakePathObject);
        
        expect(Object.keys(result).includes('errors'));
        expect(Object.keys(result).includes('goodPortal'));
        expect(Object.keys(result).includes('wellFormed'));
        expect(Object.keys(result).includes('closedPortal'));
        expect(result.errors.length).toEqual(3);
    });

    it('should create an id for the portal based on its end index if none is found', () => {
        const fakePathObject = {
            '/portal/with/id.md': {'default': 'This <Portal id="hasOne">portal</Portal> has an id'},
            '/portal/withoutid.md': {'default': 'This portal <Portal>does not have an id</Portal>'}
        }

        const result = getPortalsAPI(fakePathObject);
        
        expect(Object.keys(result).includes('hasOne'));
        expect(Object.keys(result).includes('undefined-53'));
    });

    it('should transform any markdown into html', () => {
        const fakePathObject = {
            '/portal/with/italics.md': {'default': 'This <Portal id="italics">*portal is in italics*.</Portal>'},
            '/portal/with/bold.md': {'default': 'This <Portal id="bold">**portal is in italics**.</Portal>'}
            // can add more md, but these are the most likely
        }

        const result = getPortalsAPI(fakePathObject);
        expect(result.italics.content).toContain('<em>');
        expect(result.bold.content).toContain('<strong>');
    })

    // it('should return an object with an error key if it cannot parse the md', () => {
    //     // cannot find a string that will trigger an error in the parse-md, but if an error does occur, it should work as expected
    //     const fakePathObject = {
    //         '/wellFormed/Path.md': 'this:fake metadata \n---\nthis should *be* badly** formatted markdown'
    //     }
    //     const result = getPortalsAPI(fakePathObject);
    //     console.log(result)
    // })


})