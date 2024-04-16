import { cleanup, render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Portal from '../../src/lib/Portal.svelte';

describe('Portal mounting tests', () => {
    afterEach(() => cleanup());

    it('should be able to mount the component wihtout any data', () => {
        const container = render(Portal, {id: 'something'});
        expect(container).toBeTruthy();
    });

    // testing slots at component level is discouraged (https://testing-library.com/docs/svelte-testing-library/example/#slots) -- leaving slot testing for E2E

    it('should have the appropriate class list if it is an "origin" or "both" portal', async () => {
        const expectedClassList = "text-amber-600 bg-slate-300 rounded-md border-[1px] border-slate-600 px-1 hover:bg-slate-200 hover:text-amber-800 hover:font-semibold hover:cursor-pointer".split(' ')
        
        render(Portal, {id: 'originPortal', type: 'origin'})
        render(Portal, {id: 'bothPortal', type: 'both'})

        const originPortal = await screen.findByTestId('origin-portal-originPortal');
        expect(Array.from(originPortal.classList)).toEqual(expectedClassList);

        const bothPortal = await screen.findByTestId('origin-portal-originPortal');
        expect(Array.from(bothPortal.classList)).toEqual(expectedClassList);

    });

    it('should have an empty class list if it is a portal of type "destination"', async () => {
        render(Portal, {id: 'emptyPortal', type:'destination'})

        const destPortal = await screen.findByTestId('destination-portal-emptyPortal');

        expect(Array.from(destPortal.classList).length).toEqual(0);
    });

    it('should throw an error if the portal is created with an invalid id', () => {
        // here be dragons -- testing errors thrown by components is more trouble than its worth
        // render(Portal, {id: 'badPortal', type:'invalidType'})
    })
})

describe('Portal interaction tests', () => {
    afterEach(() => cleanup());

    it('should open a Portal panel if the portal is clicked', async () => {
        const toggleSidePanel = vi.fn();
        const user = userEvent.setup()

        render(Portal, {id:'openPortalTest', destination:'#', toggleSidePanel: toggleSidePanel});

        await user.click(await screen.findByTestId('both-portal-openPortalTest'));

        expect(toggleSidePanel).toHaveBeenCalledOnce();

    })
})