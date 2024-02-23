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
})
