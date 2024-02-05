import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import DataViz from "../../src/lib/DataViz.svelte";

import { datasets } from "../mocks/mockVarsDataView";
import { makeHtmlId } from "../../src/utils/stringOperations";
import { getGroups } from "../../src/utils/sciDataHelper";

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

    it('tooltip should not be visible at the start', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        const tooltipEl = await screen.findByTestId(`tooltip-${makeHtmlId(datasets[0].desc.metadata.title)}`);
        let elRect = tooltipEl.getBoundingClientRect();
        expect(elRect.width).toEqual(0);
        expect(elRect.height).toEqual(0);
    });

    it('should have an svg if it was mounted correctly', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        const svg = await screen.findByTestId('svg-line-graph')
        expect(svg).toBeTruthy();
    });

    it('should contain line data', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        const lineData = await screen.findByTestId('line-data')
        expect(lineData).toBeTruthy();
    });

    it('should contain point data', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        const pointData = await screen.findByTestId('point-data')
        expect(pointData).toBeTruthy();
    });

    it('should contain error lines data', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        const errorLineData = await screen.findByTestId('error-lines')
        expect(errorLineData).toBeTruthy();
    });

    it('should contain labels data', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        const labelsData = await screen.findByTestId('labels-data')
        expect(labelsData).toBeTruthy();
    });

    it('should contain as many lines as there are treatment groups', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        const lineData = (await screen.findByTestId('line-data')).children
        expect(lineData.length).toEqual(getGroups('Treatment group', datasets[0].data).length - 1);
    });

    it('should contain as many data points as there are entries in the data', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        let pointData = Array.from((await screen.findByTestId('point-data')).children)
        // include only circles
        pointData = pointData.filter((e) => (e.tagName === 'circle'));
        expect(pointData.length).toEqual(datasets[0].summaryData.length);
     });

     it('should contain as many labels as there are treatment groups', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        let labelsData = Array.from((await screen.findByTestId('labels-data')).children);
        labelsData = labelsData.filter((e) => (e.tagName === 'text'))
        expect(labelsData.length).toEqual(getGroups('Treatment group', datasets[0].data).length - 1);
    });

    it('Labels should correspond to treatment groups', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});
        let labelsData = Array.from((await screen.findByTestId('labels-data')).children);
        labelsData = labelsData.filter((e) => (e.tagName === 'text'))
        labelsData = Array.from(labelsData.map((e) => (e.textContent)))
        
        let expectedLabels = getGroups('Treatment group', datasets[0].data).filter((e) => (e != 'All'));
        
        expect(labelsData.sort()).toEqual(expectedLabels.sort());
    });
});

describe('Interactions with the DataViz component', () => {
    afterEach(() => cleanup());

    it('should display tooltip when hovering over a data point', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});

        const user = userEvent.setup();

        let pointData = (await screen.findByTestId('point-data')).children;

        let point = pointData[0]
        
        await user.hover(point);

        const tooltip = await screen.findByTestId(`tooltip-${makeHtmlId(datasets[0].desc.metadata.title)}`)

        const tooltipClasses = Array.from(tooltip.classList);

        // test visibility
        expect(tooltipClasses).not.toContain('opacity-0');

        // test data content
        let tpMean = await within(tooltip).findByTestId('tp-mean');
        expect(tpMean).toBeTruthy();
        let tpMeanData = await within(tpMean).findByText(point.__data__.mean)
        expect(tpMeanData).toBeTruthy();

        let tpStdDev = await within(tooltip).findByTestId('tp-stdDev');
        expect(tpStdDev).toBeTruthy();
        let tpStdDevData = await within(tpStdDev).findByText(point.__data__.stdDeviation)
        expect(tpStdDevData).toBeTruthy();

        let tpStdErr = await within(tooltip).findByTestId('tp-stdErr');
        expect(tpStdErr).toBeTruthy();
        let tpStdErrData = await within(tpStdErr).findByText(point.__data__.stdError)
        expect(tpStdErrData).toBeTruthy();

        let tpBeeList = await within(tooltip).findByTestId('tp-bee-list');
        expect(tpBeeList).toBeTruthy();
    });
    
    it('should draw an outline when hovering over a data point', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});

        const resultingStyles = ['stroke-black', 'opacity-100']

        const user = userEvent.setup();

        let pointData = (await screen.findByTestId('point-data')).children;

        let point = pointData[0]
        
        await user.hover(point);

        for (let style of resultingStyles) {
            expect(Array.from(point.classList)).toContain(style)
        }        
    });

    it('should render the tooltip invisible when the mouse moves away', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});

        const user = userEvent.setup();

        let pointData = (await screen.findByTestId('point-data')).children;

        let point = pointData[0]
        
        await user.hover(point);

        const tooltip = await screen.findByTestId(`tooltip-${makeHtmlId(datasets[0].desc.metadata.title)}`)

        expect(Array.from(tooltip.classList)).not.toContain('opacity-0');

        await user.unhover(point);

        expect(Array.from(tooltip.classList)).toContain('opacity-0');
    });

    // hover over paths
    it('hovering over lines should highlight that line and group', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});

        const user = userEvent.setup();

        const lineData = (await screen.findByTestId('line-data')).children

        let testLine = lineData[0];

        await user.hover(testLine);

        // test that the selected line is thicker than the others
        for (const line of lineData) {
            if (line.getAttribute('id') === testLine.getAttribute('id')) {
                expect(line.getAttribute('stroke-width')).toEqual('2.5');
            } else {
                expect(line.getAttribute('stroke-width')).toEqual('0.5');
            }
        }

        // hovering away should return lines to normal

        await user.unhover(testLine);

        for (const line of lineData) {
            expect(line.getAttribute('stroke-width')).toEqual('1.5');
        }
        
    });

    // Clicking on a line should select only that group
    it('should redraw the graph when clicking on a data line', async () => {
        render(DataViz, {dataObject: {data: datasets[0].summaryData, labels: datasets[0].summaryColumns}, selected: 'All', name: datasets[0].desc.metadata.title, rawData: datasets[0].data});

        const user = userEvent.setup();

        const testLine = (await screen.findByTestId('line-data')).children[0]

        await user.click(testLine);

        const remainingLines = (await screen.findByTestId('line-data')).children;

        // there should only be one remaining line visible
        expect(remainingLines.length).toBe(1);
        // that line should have the same id as the one clicked
        expect(remainingLines[0].getAttribute('id')).toEqual(testLine.getAttribute('id'));
    });
    // hover over labels

})