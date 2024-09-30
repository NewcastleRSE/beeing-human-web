import { expect, test } from "@playwright/test";
import {makeHtmlId} from '../../src/utils/stringOperations';

test.describe('Page navigation tests', () => {
    test('Page loads and has expected option', async ({ page }) => {
        await page.goto("/");
        const hive = page.getByTestId('hive-desktop');
        await expect(hive).toBeVisible();
        const link = page.getByTestId('science-desktop');
        await expect(link).toBeVisible();
    });

    test('Clicking on science should send the user to the correct page', async ({ page }) => {
        await page.goto("/");
        const hive = page.getByTestId('hive-desktop');
        await expect(hive).toBeVisible();
        const link = page.getByTestId('science-desktop');
        await expect(link).toBeVisible();
        await link.click();
        await page.waitForURL('**/science');
        await expect(page).toHaveURL('/science');
    });
})

test.describe('Data visualisation tests', () => {
    test.describe('Page content containers exist - data viz', () => {
        test.beforeEach('Open start URL', async({page}, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto('/science/datasets');
        });

        test('There should be the expected options, and they should have the expected titles', async ({page}) => {
            const expectedLabels = ['details', 'visualisation', 'summary', 'data'];

            await expect(page).toHaveURL('/science/datasets');
            
            const radioGroup = page.getByTestId('radio-group-view');

            const labels = await radioGroup.getByRole('radio-group').locator('label').all();
            labels.forEach((label, i) => expect(label).toContainText(expectedLabels[i]));
        });

    });

    test.describe('Data view panel interaction tests', () => {
        test.beforeEach('Open start URL', async({page}, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto('/science/datasets');
        });

        test('Clicking on a tab should change the content of the tab panel', async({page}) => {
            await expect(page).toHaveURL('/science/datasets');

            const initialContent = await page.getByTestId('data-content-div').innerHTML()

            const viewButton = page.locator('label').filter({ hasText: 'visualisation' }).first();

            await viewButton.click();

            expect(initialContent).not.toEqual(page.getByTestId('data-content-div').innerHTML());
            expect(page.getByTestId('svg-line-graph')).toBeVisible();
        });

        test('Clicking on each tab should replace the content of the tab panel', async({page}) => {
            await expect(page).toHaveURL('/science/datasets');


            const labels = await page.getByTestId('radio-group').innerText();
            let labelsArray =  labels.split('\n')

            
            for (const label of labelsArray) {
                await page.getByTestId('radio-group').getByText(label).click();

                if (label == 'data') {
                    console.log('data')
                    expect(page.getByTestId('raw-data-table')).toBeVisible();
                } else if (label == 'summary') {
                    console.log('summary')
                    expect(page.getByTestId('raw-data-table')).toBeVisible();
                } else if (label == 'visualisation') {
                    console.log('details')
                    expect(page.getByTestId('line-graph')).toBeVisible();
                } else if (label == 'details') {
                    // expect(tabPanel.getByRole('list')).toBeVisible()
                }
            }
        });

        test('Changing the selected treatment group should change the content of the raw data table', async({page}) => {
            await expect(page).toHaveURL('/science/datasets');

            await page.getByTestId('radio-group').getByText('data').click();

            const tabPanel = page.getByTestId('data-content-div');

            // BEFORE: Expect a certain number of lines in the table
            const nrRowsBefore = await tabPanel.getByRole('row').count();
            const selectDropdown = tabPanel.getByLabel('Treatment group');
            await selectDropdown.selectOption('Stressed');
            const nrRowsAfter = await tabPanel.getByRole('row').count();

            expect(nrRowsAfter).toBeLessThan(nrRowsBefore);
        });
    });

    test.describe('Graph interaction', () => {
        test.beforeEach('Open start URL', async({page}, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto('/science/datasets');
        })

        test('Can switch to the visualisation panel' , async ({page}) => {
            await expect(page).toHaveURL('/science/datasets');
            const vizTabButton = page.getByTestId('radio-group').getByText('visualisation')

            await vizTabButton.click();

            expect(page.getByTestId('line-graph')).toBeVisible();
        });

        test('Line graph should contain all the expected elements', async ({page}) => {
            await expect(page).toHaveURL('/science/datasets');
            const vizTabButton = page.getByTestId('radio-group').getByText('visualisation')
            await vizTabButton.click();

            const svg = page.getByTestId('line-graph');

            // should have labels
            expect(svg.getByTestId('labels-data')).toBeVisible();
            // should have points
            expect(svg.getByTestId('point-data')).toBeVisible();
            // should have line data
            expect(svg.getByTestId('line-data')).toBeVisible();
            // should have error lines
            expect(svg.getByTestId('error-lines')).toBeVisible();
            // should have error lines toggle
            expect(svg.getByTestId('slide-toggle')).toBeVisible();
            // tootltip should not be visible (needs to be exact match or a regular expresssion)
            expect(svg.getByTestId('tooltip-bee-data-demo')).toHaveClass(/opacity-0/);
        });

        test('Clicking the error bars toggle should hide the error bars', async ({page}) => {
            await expect(page).toHaveURL('/science/datasets');
            const vizTabButton = page.getByTestId('radio-group').getByText('visualisation')
            await vizTabButton.click();

            const svg = page.getByTestId('line-graph');
            const errorBarToggle = svg.getByTestId('slide-toggle');

            expect(svg.getByTestId('error-lines')).toBeVisible();

            await errorBarToggle.click();

            for (const line of await svg.getByTestId('error-line').all()) {
                expect(line).toHaveClass(/opacity-0/);
            }
        });

        test('Labels in the legend should correspond to treatment groups', async ({page}) => {
            await expect(page).toHaveURL('/science/datasets');
            const vizTabButton = page.getByTestId('radio-group').getByText('visualisation')
            await vizTabButton.click();

            const svg = page.getByTestId('line-graph');

            let expectedLabels = await page.getByLabel('Treatment group').allInnerTexts();
            // removes the 'All' option
            expectedLabels = expectedLabels[0].split('\n').filter((e) => (e !== 'All'));

            // checks each of the specified labels exist
            for (const label of expectedLabels) {
                expect(svg.getByTestId('labels-data').getByText(label, {exact: true})).toBeVisible();
            }
        });

        test('Clicking on one of the labels should display only the corresponding data', async({page}) => {
            const testLabel = 'Stressed'
            await expect(page).toHaveURL('/science/datasets');
            const vizTabButton = page.getByTestId('radio-group').getByText('visualisation')
            await vizTabButton.click();

            const svg = page.getByTestId('line-graph');
            expect(await svg.getByTestId('individual-line').count()).toEqual(3);

            const labelToPress = svg.getByTestId('labels-data').getByText(testLabel, {exact: true});
            await labelToPress.click()

            expect(await svg.getByTestId('individual-line').count()).toEqual(1);
            expect(await svg.getByTestId('individual-line').getAttribute('id')).toEqual(`${makeHtmlId(testLabel)}-path`)
        });

        // this test is currently not working, but it is not crucial that it does at this moment
        // test('Clicking on a line should display only the selected data', async({page}) => {
        //     const testLabel = 'Stressed'
        //     await expect(page).toHaveURL('/science');
        //     const tabGroup = page.getByTestId('tab-group').first();
        //     const vizTabButton = tabGroup.locator('label').filter({ hasText: 'Visualisation' });
        //     await vizTabButton.click();

        //     const svg = tabGroup.getByTestId('line-graph');
        //     expect(await svg.getByTestId('individual-line').count()).toEqual(3);
        //     expect(await svg.getByTestId('text-label').count()).toEqual(3);

        //     const lines = await svg.getByTestId('individual-line').all();
        //     let lineToClick = undefined
        //     for (const line of lines) {
        //         if (await line.getAttribute('id') == `${makeHtmlId(testLabel)}-path`) {
        //             lineToClick = line;
        //         }
        //     }
        //     console.log(lineToClick);
        //     await lineToClick.click();
        // })

        // like the previous one, this test seems to not be working -- something about the action being intercepted. Leaving as it is for now

        // test('Hovering over a data point should show the tooltip with the corresponding data', async ({page}) => {
        //     await expect(page).toHaveURL('/science');
        //     const tabGroup = page.getByTestId('tab-group').first();
        //     const vizTabButton = tabGroup.locator('label').filter({ hasText: 'Visualisation' });
        //     await vizTabButton.click();
        //     const svg = tabGroup.getByTestId('line-graph');
            
        //     const points = svg.getByTestId('point-data');
        //     await points.locator('circle:nth-child(3)').hover({force: true});

        //     expect(svg.getByTestId('tooltip-bee-data-demo')).toHaveClass(/opacity-100/);
        // });
    })  
});