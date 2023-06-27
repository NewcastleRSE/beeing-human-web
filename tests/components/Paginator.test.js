import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Paginator from '../../src/lib/Paginator.svelte';
import { tick } from "svelte";


describe('Display multi-page content', () => {
    afterEach(() => cleanup());

    it('should be able to mount the component', () => {
        render(Paginator, {data: [], raw: false});
        expect(screen.findByTestId('paginator')).toBeTruthy();
    });

    it('should have a next button for multipage content', async () => {
        let content = ['first page', 'second page'];
        render(Paginator, {data: content, raw: false});
        let buttons = await screen.findAllByRole('button');
        expect(buttons.length).toEqual(1);
    });

    it('should not have a previous button for at the first page', async () => {
        let content = ['first page', 'second page'];
        render(Paginator, {data: content, raw: false});
        let prevButton = screen.queryByTestId('btn-prev');
        expect(prevButton).toBeFalsy();
    });

    it('should pass content as raw html if flag is true', async () => {
        let content = ['<p data-testid="this-is-the-first-page">first page</p>', '<p>This is the second page</p>'];
        render(Paginator, {data: content, raw: true});
        let firstPage = await screen.findByTestId('this-is-the-first-page');
        expect(firstPage).toBeTruthy();
    });

    it('should move the page when the next button is pressed', async () => {
        let content = ['First Page', 'Second Page'];
        render(Paginator, {data: content, raw: false});
        let nxtButton = await screen.findByTestId('btn-nxt');
        nxtButton.click();
        await tick();
        let displayContent = await screen.findByText('Second Page', {exact: false});
        expect(displayContent).toBeTruthy();
    });

    it('should remove the next button when the last page is reached', async () => {
        let content = ['First Page', 'Second Page'];
        render(Paginator, {data: content, raw: false});
        let nxtButton = await screen.findByTestId('btn-nxt');
        nxtButton.click();
        await tick();
        let otherNxtButton = screen.queryByTestId('btn-nxt');
        expect(otherNxtButton).toBeFalsy();
    });

    it('should move back to the original page when the previous button is pressed', async () => {
        let content = ['First Page', 'Second Page'];
        render(Paginator, {data: content, raw: false});
        let nxtButton = await screen.findByTestId('btn-nxt');
        nxtButton.click();
        await tick();
        let prevButton = await screen.findByTestId('btn-prev');
        prevButton.click();
        await tick();
        let displayContent = await screen.findByText('First Page', {exact: false});
        expect(displayContent).toBeTruthy();
    });

    // Haven't really found a way to test this function directly yet
    // it('should jump to any page when the goToPage function is called', async () => {
    //     let content = ['First Page', 'Second Page', 'Third Page'];
    //     render(Paginator, {data: content, raw: false});
    //     act(goToPage(2));
    // })
});