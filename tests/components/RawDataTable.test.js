import {cleanup, render, screen, within} from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

import RawDataTable from '../../src/lib/RawDataTable.svelte'
import { datasets } from '../mocks/mockVarsDataView';

describe('Load and display data table', () => {
    afterEach(() => cleanup());

    let dataObject = {data: datasets[0].data, columns: datasets[1].columns}
    let selected = 'All';

    it('should be able to mount the component', async () => {
        const container = render(RawDataTable, {tableObject: dataObject, selected:selected});
        expect(container).toBeTruthy();
    });

    it('should display error message if the component is created without data', async () => {
        render(RawDataTable);
        let errorMessage = screen.findByText('Error: no data available', {exact: true});
        expect(errorMessage).toBeTruthy();
    });

    it('should be able to mount the component without being passed a selected prop', async () => {
        render(RawDataTable, {tableObject: dataObject});
        
        // should not have error message
        const errorMessage = screen.queryAllByText('Error: no data available', {exact: false});
        expect(errorMessage.length).toEqual(0);

        // should have a table element;
        const tableEl = screen.findByTestId('raw-data-table');
        expect(tableEl).toBeTruthy();
    });

    it('should have the correct number of entries if the component is mounted successfully', async () => {
        render(RawDataTable, {tableObject: dataObject, selected: selected});
        const tBody = await screen.findByTestId('table-body');
        const tableRows = await within(tBody).findAllByRole('row');
        expect(tableRows.length).toEqual(dataObject.data.length);
    });

    it('should have the correct number of columns if the component is mounted successfully', async () => {
        render(RawDataTable, {tableObject: dataObject, selected: selected});
        const tableColumns = await screen.findAllByRole('columnheader');
        expect(tableColumns.length).toEqual(dataObject.columns.length);
    });

    it('rendered column names should be the same as the ones in the data object', async () => {
        render(RawDataTable, {tableObject: dataObject, selected: selected});
        const tableColumns = await screen.findAllByRole('columnheader');
        const colNames = tableColumns.map((e) => e.textContent);
        expect(colNames.sort()).toEqual(dataObject.columns.sort());
    });

    it('generating the raw data table with a different selected value should reduce the number of entries', async () => {
        render(RawDataTable, {tableObject: dataObject, selected: 'Stressed'});
        const tBody = await screen.findByTestId('table-body');
        const tableRows = await within(tBody).findAllByRole('row');
        expect(tableRows.length).toBeLessThan(dataObject.data.length);
    });

    it('generating the raw data table with a different selected value should have the same number of entries as those that have the same selected value', async () => {
        const newSelect = 'Stressed';
        render(RawDataTable, {tableObject: dataObject, selected: newSelect});
        const tBody = await screen.findByTestId('table-body');
        const tableRows = await within(tBody).findAllByRole('row');
        const reducedDataset = dataObject.data.filter((e) => e['Treatment group'] === newSelect);
        expect(tableRows.length).toEqual(reducedDataset.length);
    });

    // Testing redrawing raw data table with a different selected value than the one it was mounted with can be done more easily in E2E testing;
})