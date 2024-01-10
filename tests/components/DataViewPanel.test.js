import {cleanup, render, screen, within} from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

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

// Interactivity
    // First tab should be selected
    // First tab should show expected table
    // Clicking on a different tab should replace content
    // Each tab should display expected content (including presence or absence of selector)
    // Changing the selector in one tab should propagate to other tabs
    // Changing tabs in one dataset should not affect the other dataset
    // Changing selected in one dataset should not affect the other dataset