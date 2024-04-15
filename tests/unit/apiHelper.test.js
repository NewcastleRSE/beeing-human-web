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
            'not a path': 'not content',
            '/wellFormedPath.md': 'this is content but without a portal',
            '/wellFormedPath2.md': 'this is content and contains a <Portal id="fakePortal">Portal</Portal>.',
            'another bad path': 'also not content'
        }
        const result = getPortalsAPI(fakePathObject);
        console.log(result)
        expect(Object.keys(result).includes('errors'));
        expect(result.errors.length).toEqual(2);
        expect(result.errors).toEqual(['not a path', 'another bad path'])
    });

    it('should return an object with an error key if it contains malformed XML', () => {
        const fakePathObject = {
            '/good/path.md': 'This is a correct <Portal id="goodPortal">portal</Portal>',
            '/bad/path.md': 'This <Portal>Portal never closes and is incorrect'
        }

        const result = getPortalsAPI(fakePathObject);
        console.log(result);
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