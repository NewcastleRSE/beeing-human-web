import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import TEISimple from '../../src/lib/TEISimple.svelte'

describe('Import and transform TEI file', () => {
    afterEach(()=> cleanup());

    it('should be able to mount the component', () => {
        const container = render(TEISimple, {path: '../../static/content/literature/data/Coopers_hill_1655.xml'});
        expect(container).toBeTruthy();
    })

    it('should throw an error if no file is passed or isn\'t found', async ()=> {
        render(TEISimple, {path: ''});
        await screen.findByTestId('error-message', undefined, {timeout: 10000});
    }, {timeout: 15000});
})