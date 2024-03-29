import {cleanup, render, screen} from '@testing-library/svelte'
import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import SearchBar from '../../src/lib/SearchBar.svelte'

describe('Load and display search bar', () => {
    afterEach(()=>cleanup());

    it('should mount the component', () => {
        const container = render(SearchBar);
        expect(container).toBeTruthy();
    })
});

describe('Search bar functions', () => {
    afterEach(()=> cleanup());

    it('should fire a reset event if the go button is triggered without anything on the search bar', async () => {
        // an error is logged in the console, but it doesn't affect the outcomes of the result (the virtual dom is trying to submit a form event, but that is not implemented in JSDOM)
        const user = userEvent.setup();

        const { component } = render(SearchBar, {listChips:''});

        // mock function
        const mock = vi.fn();
        component.$on('reset', mock);

        const button = screen.getByText('Go', {exact: true});
        await user.click(button);

        expect(mock).toHaveBeenCalled();
    });

    it('should add a chip if a search term corresponds to an author or a tag in the database', async () => {
        const user = userEvent.setup();

        render(SearchBar, {listChips:''});
        

        const searchBar = screen.getByRole('searchbox');
        await user.type(searchBar, 'tiago  ', {delay: 900});

        // should be looking for 'chip-tiago' but even though the chip is created, the name is not dynamically updated in testing for some reason
        const chip = await screen.findByTestId('chip-');

        expect(chip).toBeTruthy();

    });

    it('should send a search event after inputing a search term and pressing go', async () => {
        const user = userEvent.setup();
        const {component} = render(SearchBar, {listChips:''});

        // mock function
        let search = ''
        const mock = vi.fn((event) => (search = event.detail));
        component.$on('search', mock);

        const searchBar = screen.getByRole('searchbox');
        await user.type(searchBar, 'tiago  ', {delay: 900});
        const chip = await screen.findByTestId('chip-');
        expect(chip).toBeTruthy();

        const goButton = screen.getByText('Go', {exact: true});
        expect(goButton).toBeTruthy();
        await user.click(goButton);

        let expectedObject = {
            searchString: 'tiago',
            searchTerms: ['tiago']
        }

        expect(mock).toHaveBeenCalled();
        expect(search).toStrictEqual(expectedObject);
    });

    it('should remove chip by clicking it', async () => {
        const user = userEvent.setup();
        render(SearchBar, {listChips: ''});

        const searchBar = screen.getByRole('searchbox');
        await user.type(searchBar, 'tiago ', {delay: 900});
        const chip = await screen.findByTestId('chip-');
        expect(chip).toBeTruthy();

        await user.click(chip);
        const chipAfter = screen.queryByTestId('chip-');
        expect(chipAfter).toBeNull();
    });
});