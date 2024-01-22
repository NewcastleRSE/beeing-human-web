import { cleanup, render, screen, within } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import GroupSelector from '../../src/lib/GroupSelector.svelte';

describe('Load and display correct options in the group selector', () => {
    afterEach(() => cleanup());

    let testGroups = ['one', 'two', 'three'];
    let testSelected = 'one';
    let testName = 'test';

    it('should be able to mount the component', () => {
        const container = render(GroupSelector, {groups: testGroups, selected: testSelected, name: testName});
        expect(container).toBeTruthy();
    });

    it('should display an error message if the component is created without data', async () => {
        render(GroupSelector);
        const errorMessage = await screen.findByText('Error: nothing to be selected', {exact: true});
        expect(errorMessage).toBeTruthy();
    })

    it('the name should be used as a label for the selector', async () => {
        render(GroupSelector, {groups: testGroups, selected: testSelected, name:testName});
        const label = await screen.findByText(testName, {exact: true});
        expect(label).toBeTruthy();
    });

    it('should contain a select element', async () => {
        render(GroupSelector, {groups: testGroups, selected: testSelected, name:testName});
        const selectElement = await screen.findByRole('combobox');
        expect(selectElement).toBeTruthy();
    });

    it('the select element should contain the expected options', async () => {
        render(GroupSelector, {groups: testGroups, selected: testSelected, name:testName});
        const selectElement = await screen.findByRole('combobox');
        const options = await within(selectElement).findAllByRole('option');
        const renderedOptions = options.map((e) => e.getAttribute('value'));
        expect(renderedOptions).toEqual(testGroups);
    });

    it('should have the selected element as default', async () => {
        render(GroupSelector, {groups: testGroups, selected: testSelected, name:testName});
        const selectedElement = await screen.findByRole('option', {name: testSelected});
        expect(selectedElement.selected).toBe(true);
    });
});

describe('Interaction with the group selector works as expected', () => {
    afterEach(() => cleanup());

    let testGroups = ['one', 'two', 'three'];
    let testSelected = 'one';
    let testName = 'test';

    it('should change the selected group when clicking on a difference option', async () => {
        render(GroupSelector, {groups: testGroups, selected: testSelected, name:testName});
        const selectedElement = await screen.findByRole('option', {name: testSelected});
        expect(selectedElement.selected).toBe(true);

        // click on a different option
        // this one is a bit of a mess, correct this test
        await userEvent.selectOptions(await screen.findByRole('option', testGroups[1]));

    })
})