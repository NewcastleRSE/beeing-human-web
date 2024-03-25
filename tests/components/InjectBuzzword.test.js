import {describe, expect, it, afterEach} from 'vitest';
import {render, cleanup, screen} from '@testing-library/svelte';

import InjectBuzzword from '$lib/InjectBuzzword.svelte'

describe('Mount tests', () => {
    afterEach(() => cleanup())

    it('should be able to mount the component', () => {
        const container = render(InjectBuzzword);
        expect(container).toBeTruthy();
    });

    it('should throw an error if it tries to mount the component without a buzzname', async () => {
        render(InjectBuzzword);
        const errorMessage = await screen.findByTestId('error-message')
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.innerHTML).toContain('You need to pass a buzzword file name');
    });

    it('should throw an error if it tries to mount the component with a non-existing buzzname', async () => {
        render(InjectBuzzword, {buzzName: 'fakeBuzzword'});
        const errorMessage = await screen.findByTestId('error-message')
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.innerHTML).toContain('Could not load buzzword \'fakeBuzzword\'');
    });

    it('should be able to load and mount the component if the buzzword exists', async () => {
        render(InjectBuzzword, {buzzName: 'buzz1'});

        const buzzContent = 'Impossible considered invitation him men instrument saw celebrated unpleasant. Put rest and must set kind next many near nay'

        const buzzword = await screen.findByText(buzzContent, {exact: false});
        expect(buzzword).toBeTruthy();
    });
});

describe('Markdown formatting tests', () => {
    afterEach(() => cleanup())

    it('should be able to turn md into images', async () => {
        render(InjectBuzzword, {buzzName: 'buzz9'});

        const img = await screen.findAllByAltText('A bee');
        expect(img).toBeTruthy();
    });

    it('should be able to turn basic formatting (strong) into HTML', async () => {
        render(InjectBuzzword, {buzzName: 'buzz20'});

        const paragraph = await screen.findByText('The biggest challenge in designing', {exact: false});

        expect(paragraph).toBeTruthy();
        expect(paragraph.innerHTML).toContain('<strong>')
    });

    it('should be able to turn basic formatting (italics) into HTML', async () => {
        render(InjectBuzzword, {buzzName: 'play'});

        const paragraph = (await screen.findByText('At the end of chapter one,', {exact: false})).parentElement;

        expect(paragraph.innerHTML).toContain('<em>');
    });

    it('should be able to turn basic formatting (blockquotes) into HTML', async () => {
        render(InjectBuzzword, {buzzName: 'play'});

        const paragraph = (await screen.findByText('At the end of chapter one,', {exact: false})).parentElement;

        expect(paragraph.innerHTML).toContain('<blockquote>');
    });

})