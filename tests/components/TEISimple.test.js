import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import TEISimple from '../../src/lib/TEISimple.svelte'

describe('Import and transform TEI file', () => {
    afterEach(()=> cleanup());

    it('should be able to mount the component', () => {
        const container = render(TEISimple);
        expect(container).toBeTruthy();
    })

    // This test apparently fails do to a know error -- see: https://github.com/vitest-dev/vitest/issues/2834
    // Implemented `alias` workaround for now
    // Currently, test shows an error that comes from CITEICean, but that can safely be ignored
    it('should throw an error if no file is passed or isn\'t found', async ()=> {
        render(TEISimple, {path: ''});
        await screen.findByTestId('error-message', undefined, {timeout: 10000});
    }, {timeout: 15000});

    it('should be able to create a tei-container', async () => {
        render(TEISimple);
        const container = await screen.findByTestId('TEI-container', {exact: false});
        expect(container).toBeTruthy();
    })
})