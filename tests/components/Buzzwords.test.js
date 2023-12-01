import {cleanup, render, screen, within} from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

import Buzzwords from '../../src/lib/Buzzwords.svelte';

import { buzzwords, listAuthors, listTags } from '../mocks/mockVarsBuzzwords';

function formatDate(buzzwords) {
    buzzwords = buzzwords.map((buzz) => {
        return {...buzz, date: new Date(buzz.date)}
    })
    return buzzwords
}

describe('Load and display Buzzwords', () => {
    
    afterEach(()=> cleanup());

    it('should be able to mount the component without any data', ()=> {
        const container = render(Buzzwords, {buzzwords: '', listTags: '', listAuthors: ''});
        expect(container).toBeTruthy();
    });

    it('should display an error if no data is passed', async ()=> {
        render(Buzzwords, {buzzwords: '', listTags: '', listAuthors:''});
        const errorMessage = await screen.findByText('Error: Something went wrong.', {exact: false});
        expect(errorMessage).toBeTruthy();
    });

    it('should display the collection of buzzwords when the required data is passed', async () => {
        render(Buzzwords, {buzzwords: formatDate(buzzwords), listTags: listTags, listAuthors: listAuthors});
        const container = await screen.findByTestId('card-collection');
        expect(container).toBeTruthy();
    });

    it('should be able to display at least one card for a buzzword', async() => {
        render(Buzzwords, {buzzwords: formatDate(buzzwords), listTags: listTags, listAuthors: listAuthors});
        const card = await screen.findAllByTestId('buzzword-card');
        expect(card).toBeTruthy();
    });

    it('should display as many cards as there are buzzwords', async() => {
        render(Buzzwords, {buzzwords: formatDate(buzzwords), listTags: listTags, listAuthors: listAuthors});
        const card_collection = await screen.findAllByTestId('buzzword-card');
        expect(card_collection.length).toEqual(buzzwords.length);
    });

    it('each card should contain at least content', async() => {
        render(Buzzwords, {buzzwords: formatDate(buzzwords), listTags: listTags, listAuthors: listAuthors});
        const card_collection = screen.getAllByTestId('buzzword-card');
        for (let card of card_collection) {
            const content = within(card).findByTestId('buzzword-content');
            expect(content).toBeTruthy();
        }
    });

    it('should contain at least one Tag selector element', async() => {
        render(Buzzwords, {buzzwords: formatDate(buzzwords), listTags: listTags, listAuthors: listAuthors});
        const tag_selectors = await screen.findAllByTestId('tag-selector-container');
        expect(tag_selectors).toBeTruthy();
    });

    it('should contain one tag selector for authors', async() => {
        render(Buzzwords, {buzzwords: formatDate(buzzwords), listTags: listTags, listAuthors: listAuthors});
        const author_selector = await screen.findByText('authors', {exact: false});
        expect(author_selector).toBeTruthy();
    });

    it('should contain one tag selector for tags', async() => {
        render(Buzzwords, {buzzwords: formatDate(buzzwords), listTags: listTags, listAuthors: listAuthors});
        const tags_selector = await screen.findByText('tags', {exact: false});
        expect(tags_selector).toBeTruthy();
    });

    it('should contain a search bar', async() => {
        render(Buzzwords, {buzzwords: formatDate(buzzwords), listTags: listTags, listAuthors: listAuthors});
        const searchBar = await screen.findByRole('searchbox');
        expect(searchBar).toBeTruthy();
    });

});