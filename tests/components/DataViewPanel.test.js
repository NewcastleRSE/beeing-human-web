import {cleanup, render, screen, within} from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import DataViewPanel from '../../src/lib/DataViewPanel.svelte'

import { datasets, tabs } from '../mocks/mockVarsDataView';

describe ('Load and display data view panel', () => {
    afterEach(() => cleanup());

    it('should be able to mount the component without any data', () => {
        const container = render(DataViewPanel, {datasets: ''});
        expect(container).toBeTruthy();
    });

    it('should display an error message if no data has been passed', async () => {
        render(DataViewPanel, {datasets: ''});
        const errorMessage = await screen.findByText('Error: no data available', {exact: false})
        expect(errorMessage).toBeTruthy();
    });

    it('should be able to display the data when the required data is passed', async () => {
        render(DataViewPanel, {datasets: datasets});
        const container = await screen.findAllByTestId('tab-group');
        expect(container).toBeTruthy();
    });

    it('should be able to display as many tab groups as there are datasets', async() => {
        render(DataViewPanel, {datasets: datasets});
        const tabGroups = await screen.findAllByTestId('tab-group');
        expect(datasets.length).toEqual(tabGroups.length);
    });

    it('should contain the correct number of tabs', async () => {
        render(DataViewPanel, {datasets: datasets});
        const tabGroups = await screen.findAllByTestId('tab-group');
        for (let group of tabGroups) {
            const tabsRendered = await within(group).findAllByTestId('tab');
            expect(tabsRendered.length).toEqual(tabs.length);
        };
    });

    it('each tab should have the expected name', async () => {
        render(DataViewPanel, {datasets: datasets});
        const tabGroups = await screen.findAllByTestId('tab-group');
        for (let group of tabGroups) {
            for (let tab of tabs) {
                let renderedTab = await within(group).findByText(tab, {exact: false});
                expect(renderedTab).toBeTruthy();
            }
        }
    })
});

describe('Interaction with the data viz panel', () => {
    afterEach(() => cleanup());

    it('should have the first tab selected as default', async () => {
        render(DataViewPanel, {datasets: datasets});
        const tabGroups = await screen.findAllByTestId('tab-group');
        for (let group of tabGroups) {
            let renderedTabs = await within(group).findAllByTestId('tab');
            for (let [index, rTab] of renderedTabs.entries()) {
                if (index === 0) {
                    expect(rTab.getAttribute('tabindex')).toEqual('0');
                    expect(rTab.getAttribute('aria-selected')).toEqual('true');
                } else {
                    expect(rTab.getAttribute('tabindex')).toEqual('-1');
                    expect(rTab.getAttribute('aria-selected')).toEqual('false');
                }
            }
        }
    });

    it('First tab should display the expected content', async() => {
        render(DataViewPanel, {datasets: datasets});
        const tabPanels = await screen.findAllByRole('tabpanel');
        for (const [index, panel] of tabPanels.entries()) {
            // contains the correct component (raw data table)
            let dataPanel = await within(panel).findByTestId('raw-data-table');
            expect(dataPanel).toBeTruthy();
            
            // the contents of the component are correct
            for (const column of datasets[index].columns) {
                // must be find all because 'Treatment group' appears in other elements as well, which throws out an error
                const columnRendered = await within(panel).findAllByText(column, {exact: false})
                expect(columnRendered).toBeTruthy();
            }
        }
    });

    it('should change content when a different tab is clicked', async () => {
        const user = userEvent.setup();

        render(DataViewPanel, {datasets: datasets});
        let tabGroups = await screen.findAllByTestId('tab-group');

        // first tab should be a raw-data-table
        let dataPanel = await within(tabGroups[0]).findByTestId('raw-data-table');
        expect(dataPanel).toBeTruthy();

        let tabButtons = await within(tabGroups[0]).findAllByTestId('tab');

        for (const [index, button] of tabButtons.entries()) {
            if (index === 0) {
                // do nothing -- default tab selected
            } else if (index === 1) {
                // second tab should contain another data table, but different from the first
                await user.click(button)
                let newDataPanel = await within(tabGroups[0]).findByTestId('raw-data-table');
                expect(newDataPanel).toBeTruthy();
                expect(newDataPanel).not.toEqual(dataPanel);
            } else if (index === 2) {
                // third tab should contain a data viz
                await user.click(button)
                let dataViz = await within(tabGroups[0]).findByTestId('line-graph');
                expect(dataViz).toBeTruthy();
            } else if (index === 3) {
                // fourth tab should contain a list
                await user.click(button)
                let expDetails = await within(tabGroups[0]).findByRole('list');
                expect(expDetails).toBeTruthy();
            }
        }
    });

    it('changing tabs in one dataset should not affect the other dataset', async () => {
        const user = userEvent.setup();
        render(DataViewPanel, {datasets: datasets});
        let tabGroups = await screen.findAllByTestId('tab-group');
        let tabButtons = await within(tabGroups[0]).findAllByTestId('tab');

        // click the data viz button
        await user.click(tabButtons[2]);

        // first data panel should show a visualisation
        const firstDataset = await within(tabGroups[0]).findByTestId('line-graph');
        // second data panel should not be affect and show the default data table
        const secondDataset = await within(tabGroups[1]).findByTestId('raw-data-table');
        
        expect(firstDataset).toBeTruthy();
        expect(secondDataset).toBeTruthy();

    });

    it('changing selector in one tab should propagate to other tabs', async () => {
        const user = userEvent.setup();
        render(DataViewPanel, {datasets: datasets});
        let tabGroups = await screen.findAllByTestId('tab-group');
        let tabButtons = await within(tabGroups[0]).findAllByTestId('tab');
        
        // find the select box
        let selectionBox = await within(tabGroups[0]).findByRole('combobox');
        let defaultOption = await within(selectionBox).findByRole('option', {name: 'All'})

        // should contain the default option
        expect(defaultOption.selected).toBe(true);

        // select a different treatment group
        await user.selectOptions(selectionBox, 'Stressed');
        let selectOther = await within(selectionBox).findByRole('option', {name: 'Stressed'});
        expect(selectOther.selected).toBe(true);

        // Ensures the selection changed the content of the raw data table
        let newSelection = await within(tabGroups[0]).findByTestId('raw-data-table');
        expect(within(newSelection).queryAllByText('Interaction with stressed bee', {exact: true}).length).toEqual(0);

        // Change tabs
        await user.click(tabButtons[1])

        // check contents of the selector in new tab
        let otherSelectionBox = await within(tabGroups[0]).findByRole('combobox');
        let otherSelectedOptionFalse = await within(otherSelectionBox).findByRole('option', {name: 'All'})
        let otherSelectedOptionTrue = await within(otherSelectionBox).findByRole('option', {name: 'Stressed'});
        expect(otherSelectedOptionFalse.selected).toBe(false);
        expect(otherSelectedOptionTrue.selected).toBe(true);

    });

    it('Changing the selector in one dataset should not affect the selector in the other dataset', async () => {
        const user = userEvent.setup();
        render(DataViewPanel, {datasets: datasets});
        let tabGroups = await screen.findAllByTestId('tab-group');
        
        // find the select box
        let selectionBox = await within(tabGroups[0]).findByRole('combobox');
        let defaultOption = await within(selectionBox).findByRole('option', {name: 'All'})

        // should contain the default option
        expect(defaultOption.selected).toBe(true);

        // select a different treatment group
        await user.selectOptions(selectionBox, 'Stressed');
        let selectOther = await within(selectionBox).findByRole('option', {name: 'Stressed'});
        expect(selectOther.selected).toBe(true);

        let selectionBoxDataset2 = await within(tabGroups[1]).findByRole('combobox');
        let defaultOptionDataset2 = await within(selectionBoxDataset2).findByRole('option', {name: 'All'});

        // default option in dataset 2 should still be selected
        expect(defaultOptionDataset2.selected).toBe(true);

    })
})

// Interactivity
    // Changing selected in one dataset should not affect the other dataset