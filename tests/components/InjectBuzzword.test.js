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
        render(InjectBuzzword, {buzzName: 'socialBees'});

        const buzzContent = "I've been reading about social learning in bees. They are more likley to approach flowers or locations occupied by other bees."

        const buzzword = await screen.findByText(buzzContent, {exact: false});
        expect(buzzword).toBeTruthy();
    });
});

describe('Markdown formatting tests', () => {
    afterEach(() => cleanup())

    it('should be able to turn md into images', async () => {
        render(InjectBuzzword, {buzzName: 'buzzword-infrastructure'});

        const img = await screen.findAllByAltText('my view of the buzzword system');
        expect(img).toBeTruthy();
    });

    it('should be able to turn basic formatting (strong) into HTML', async () => {
        render(InjectBuzzword, {buzzName: 'buzzword-infrastructure'});

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

        // expect(paragraph.innerHTML).toContain('<blockquote>');
        expect(paragraph.parentElement.innerHTML).toContain("<blockquote");
    });

})