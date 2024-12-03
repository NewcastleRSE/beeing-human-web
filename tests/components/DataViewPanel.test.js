import {cleanup, render, screen} from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import DataViewPanel from '../../src/lib/DataViewPanel.svelte'

import { datasets } from '../mocks/mockVarsDataView';

vi.hoisted(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        enumerable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // deprecated
            removeListener: vi.fn(), // deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe ('Load and display data view panel', () => {
    afterEach(() => cleanup());

    it('should be able to mount the component without any data', () => {
        const container = render(DataViewPanel, {dataset: ''});
        expect(container).toBeTruthy();
    });

    it('should display an error message if no data has been passed', async () => {
        render(DataViewPanel, {dataset: ''});
        const errorMessage = await screen.findByText('Error: no data available', {exact: false})
        expect(errorMessage).toBeTruthy();
    });

    it('should be able to display the data when the required data is passed', async () => {
        render(DataViewPanel, {dataset: datasets[0]});
        const container = screen.getByTestId('data-content-div');
        expect(container).toBeTruthy();
    });


});