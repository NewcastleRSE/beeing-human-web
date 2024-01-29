import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import DataViz from "../../src/lib/DataViz.svelte";

import { datasets } from "../mocks/mockVarsDataView";
import { makeHtmlId } from "../../src/utils/stringOperations";

describe('Load and display data viz component', () => {
    afterEach(() => cleanup());

    it('should be able to mount the component', () => {
        const container = render(DataViz, {dataObject: '', selected: '', name: 'test', rawData: ''});
        expect(container).toBeTruthy();
    });

    it('should display error message if no data has been passed', async () => {
        render(DataViz, {dataObject: '', selected: '', name: 'test', rawData: ''});
        const errorMessage = await screen.findByText('Error: No data passed', {exact: false});
        expect(errorMessage).toBeTruthy();
    });

    it('should display a different error message if no name has been passed to the component', async () => {
        render(DataViz, {dataObject: '', selected: '', name: '', rawData: ''});
        const errorMessage = await screen.findByText('Error: No name given', {exact: false});
        expect(errorMessage).toBeTruthy();
    });

    it('should mount the component if all the data has been passed correctly', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        const svgContainer = await screen.findByTestId('line-graph');
        expect(svgContainer).toBeTruthy();
    });

    it('should include a slide toggle if it mounts successfully', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        const slideToggle = await screen.findByRole('switch', {name: 'Error bars'});
        expect(slideToggle).toBeTruthy();
    });

    it('should include a tooltip element if it mounts successfully', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        const tooltipEl = await screen.findByTestId(`tooltip-${makeHtmlId(datasets[0].desc.metadata.title)}`);
        expect(tooltipEl).toBeTruthy();
    });

    it('tooltip should start with opacity at 0', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        const tooltipEl = await screen.findByTestId(`tooltip-${makeHtmlId(datasets[0].desc.metadata.title)}`);
        // check if tooltip is visible
    })
})