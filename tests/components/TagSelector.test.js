import {cleanup, render, screen} from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import TagSelector from '../../src/lib/TagSelector.svelte';
import { Filters } from '../../src/classes/Filters';
import { capitaliseFirstLetter } from '../../src/utils/stringOperations';

import { listAuthors } from '../mocks/mockVarsBuzzwords';

function initFilters(list) {
    let filters = new Filters();
    for (let author of listAuthors) {
        filters.addFilter(author, 'authors');
    }
    return filters;
}

describe('Load and display tags in the TagSelector', () => { 
    afterEach(() => cleanup());

    it('should mount the component wihtout data', ()=> {
        const container = render(TagSelector, {listTags: '', filter: ''});
        expect(container).toBeTruthy();
    });

    it('should display an error if no tags are passed to the component', async () => {
        render(TagSelector, {listTags: '', filter: ''});
        const errorMessage = await screen.findByText('Something went wrong...', {exact: false});
        expect(errorMessage).toBeTruthy();
    });

    it('should create buttons if tags are passed to the component', async () => {
        let filters = initFilters(listAuthors);
        render(TagSelector, {listTags: filters, filter: 'authors'});
        const buttons = await screen.findAllByRole('button');
        expect(buttons).toBeTruthy();
    });

    it('should create as many filter buttons as there are filters', async () => {
        let filters = initFilters(listAuthors);
        render(TagSelector, {listTags: filters, filter: 'authors'});
        const buttons = await screen.findAllByRole('button');
        // There should be one more button than there are filters (the reset button)
        expect(buttons.length).toEqual(filters.length + 1);
    });

    it('should create one button for each filter, and their name should match after transformation', async () => {
        let filters = initFilters(listAuthors);
        render(TagSelector, {listTags: filters, filter: 'authors'});
        for (let author_name of listAuthors) {
            const author_button = await screen.findByText(capitaliseFirstLetter(author_name), {exact: true});
            expect(author_button).toBeTruthy();
        }
    });
})

describe('Tag operations', () => {
    afterEach(() => cleanup());
    
    it('reset button should be disabled by default', async () => {
        let filters = initFilters(listAuthors);
        render(TagSelector, {listTags: filters, filter: 'authors'});
        const resetButton = await screen.findByText('Reset', {exact: false});
        expect(resetButton).toHaveProperty('disabled');
    });

    // Enabling the reset button happens in the parent component
    
    it('fires an event when a filter button is pressed', async () => {
        const user = userEvent.setup();

        let filters = initFilters(listAuthors);
        const { component } = render(TagSelector, {listTags: filters, filter: 'authors'});

        // mock function
        let filter = '';
        const mock = vi.fn((event) => (filter = event.detail.filter));
        component.$on('filter-changed', mock);

        const button = screen.getByText(capitaliseFirstLetter(listAuthors[0]), {exact: true});
        await user.click(button);

        let expectedObject = {
            name: listAuthors[0],
            type: 'authors',
            available: true,
            active: false
        }

        expect(mock).toHaveBeenCalled();
        expect(filter).toStrictEqual(expectedObject);
    });

    it('fires an event when any filter button is pressed', async () => {
        const user = userEvent.setup();

        let filters = initFilters(listAuthors);
        const { component } = render(TagSelector, {listTags: filters, filter: 'authors'});

        // mock function
        let filter = '';
        const mock = vi.fn((event) => (filter = event.detail.filter));
        component.$on('filter-changed', mock);

        for (let author of listAuthors) {
            const button = screen.getByText(capitaliseFirstLetter(author), {exact: true});
            await user.click(button);

            let expectedObject = {
                name: author,
                type: 'authors',
                available: true,
                active: false
            }

            expect(mock).toHaveBeenCalled();
            expect(filter).toStrictEqual(expectedObject);
        }
    })
    
    // This does not work because the button is disabled -- there should be a way to temporarily activate the button for testing, but I can't seem to find how. Not significant, can test in E2E and/or the parent component
    // it('fires an event when the reset button is pressed', async () => {
    //     const user = userEvent.setup();

    //     let filters = initFilters(listAuthors);
    //     const { component } = render(TagSelector, {listTags: filters, filter: 'authors'});

    //     // mock function
    //     let filter = '';
    //     const mock = vi.fn((event) => (filter = event.detail.filter));
    //     component.$on('reset-filters', mock);

    //     const button = screen.getByText('Reset', {exact: false});
    //     // button.setAttribute('disabled', false);
    //     await user.click(button);

    //     expect(mock).toHaveBeenCalled();
    // })
})

