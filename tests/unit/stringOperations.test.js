import {cleanup, render, screen, within} from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

import * as stringOps from '../../src/utils/stringOperations';

describe('Test makeHtmlId()', () => {
    afterEach(() => cleanup());

    it('should be able to return an id for something', () => {
        expect(stringOps.makeHtmlId('something')).toEqual('something');
    });

    it('should be able to replace spaces with hiphens', () => {
        expect(stringOps.makeHtmlId('this is something')).toEqual('this-is-something');
    });

    it('should be able to remove parenthesis from strings', () => {
        expect(stringOps.makeHtmlId('(why) do you thin(k) that')).toEqual('why-do-you-think-that');
    })

    it('should be able to throw an error if no string has been passed', () => {
        expect(() => stringOps.makeHtmlId(undefined)).toThrowError();
    });
});

describe('Get filename from path', () => {
    afterEach(() => cleanup());

    it('should be able to return a file name with the extension', () => {
        const testPath = '/path/to/test/file.txt'

        expect(stringOps.getFileNameFromPath(testPath)).toBe('file.txt');
    });

    it('should be able to return a file name without extension', () => {
        const testPath = 'path/to/another/file.xml'
        expect(stringOps.getFileNameFromPathWithoutExtension(testPath)).toBe('file');
    });

    it('should be able to return the file name correctly from a variety of starting paths', () => {
        const testArray = [
            '/this/is/the/first/path/to/file.txt',
            'this/is/the/second/path/to/file.txt',
            './this/is/the/third/path/to/file.txt',
            '../this/is/the/fourth/path/to/file.txt',
            '../../another/path/file.txt',
            '/file.txt',
            'file.txt',
            'FILE/PATH/IN/CAPS/file.txt',
            'fILe/Path/in/Mixed/Case/file.txt'
        ]

        for (const test of testArray) {
            expect(stringOps.getFileNameFromPath(test)).toBe('file.txt');
        }
    })
})
