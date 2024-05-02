import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import PortalPanel from "../../src/lib/PortalPanel.svelte";

describe('Portal panel mounting tests', () => {
    afterEach(() => cleanup());

    it('should be able to mount the component without any data', () => {
        const container = render(PortalPanel);
        expect(container).toBeTruthy();
    });

    it('should have the correct number of destination cars', () => {
        const destinationList = ['test1#link', 'test2#link', 'test3#link']
        render(PortalPanel, {destination: destinationList});
        const nrCards = screen.getByTestId('portal-panel-card-list-div').children.length;
        expect(nrCards).toEqual(destinationList.length)
    });

    it('should use the destination list to create headers for the cards', () => {
        const destinationList = ['test1#link', 'test2#link', 'test3#link']
        
        render(PortalPanel, {destination: destinationList});
        
        const cardCollection = screen.getByTestId('portal-panel-card-list-div').children;
        const renderedHeaders = Array.from(cardCollection).map((x) => within(x).getByTestId('card-header').innerHTML.toLowerCase());

        const expectedHeaders = destinationList.map((x) => x.split('#')[0].toLowerCase());

        expect(renderedHeaders).toEqual(expectedHeaders);
    })
});

describe('User interaction tests',  () => {

    afterEach(() => cleanup());

    it('Portal panel should send an event when close button is clicked', async () => {
        const user  = userEvent.setup();

        const {component} = render(PortalPanel);

        const mock = vi.fn();
        component.$on('close', mock)

        const button = screen.getByRole('button');
        await user.click(button);
        
        expect(mock).toHaveBeenCalledOnce();
    })
})