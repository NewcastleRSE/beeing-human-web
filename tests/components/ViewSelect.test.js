import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";
import userEvent from '@testing-library/user-event';

import { view } from "../../src/stores/viewChoice";
import { get } from "svelte/store";

import ViewSelect from '../../src/lib/ViewSelect.svelte';

describe('View Select radio button tests', ()=> {
    afterEach(()=>cleanup());
    const user = userEvent.setup();

    it('should be able to mount the component', () => {
        const container = render(ViewSelect);
        expect(container).toBeTruthy();
    });

    it('should change the value of `view` depending on user selection', async () => {
        render(ViewSelect);
        
        // Choose literature
        const litButton = screen.getByText('Literature');
        await user.click(litButton);
        expect(get(view)).toBe('literature');

        // Choose science
        const sciButton = screen.getByText('Science');
        await user.click(sciButton);
        expect(get(view)).toBe('science');

        // Choose music
        const musButton = screen.getByText('Music');
        await user.click(musButton);
        expect(get(view)).toBe('music');

        // Choose connections
        const intButton = screen.getByText('Connections');
        await user.click(intButton);
        expect(get(view)).toBe('connections');

    });

    it('should change the selected view after the user changes it', async () => {
        render(ViewSelect);
        
        // Choose music
        const musButton = screen.getByText('Music');
        await user.click(musButton);
        expect(get(view)).toBe('music');

        // Choose another
        const sciButton = screen.getByText('Science');
        await user.click(sciButton);
        expect(get(view)).not.toBe('music');
    });
});