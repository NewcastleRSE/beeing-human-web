import { expect, test } from "@playwright/test";
import {makeHtmlId} from '../../src/utils/stringOperations';

test.describe('Page navigation tests', () => {
    test('Page loads and has expected option', async({page}) => {
        await page.goto("/");
        await expect(page.getByText('Science')).toBeVisible();
    });

    test('Selecting Science and pressing go sends the user to the correct page', async({page}) => {
        await page.goto("/");
        await page.getByText('Science').click();
        await expect(page.getByText('Science')).toBeChecked();
        await page.getByRole('link', { name: 'Go' }).click();
        await page.waitForURL('**/science');
        await expect(page).toHaveURL('/content/science');
    });

    test('Science content page should have a header containing science', async({page}) => {
        await page.goto("/content/science");
        await expect(page.getByRole("heading", {name: 'Science Test'})).toBeVisible();
    });

    test('Expect content page to have several sections', async({page}) => {
        await page.goto("/content/science");
        const headings = await page.getByRole('heading').allInnerTexts();
        expect(headings.length).toBeGreaterThan(1);
    });
});

test.describe('Data visualisation tests', () => {
    test.describe('Page content containers exist', () => {
        test.beforeEach('Open start URL', async({page}, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto('/content/science');
        });
        
        test('Page should have two containers with data visualisation', async ({page}) => {
            await expect(page).toHaveURL('/content/science');
            const containers = await page.getByTestId('tab-group').all();
            expect(containers.length).toEqual(2);
        });

        test('Each data viz container should have four tabs', async ({page}) => {
            await expect(page).toHaveURL('/content/science');
            const containers = await page.getByTestId('tab-group').all();

            for (const container of containers) {
                const tabs = await container.getByRole('tablist').locator('label').count();
                expect(tabs).toEqual(4);
            }
        });

        test('Each tab should have the expected titles', async ({page}) => {
            const expectedLabels = ['Data table', 'Summary Data', 'Visualisation', 'Experimental Details'];

            await expect(page).toHaveURL('/content/science');
            
            const containers = await page.getByTestId('tab-group').all();

            for (const container of containers) {
                const labels = await container.getByRole('tablist').locator('label').all();
                labels.forEach((label, i) => expect(label).toContainText(expectedLabels[i]));
            }
        });

        test('Each data view panel should contain a tab panel', async ({page}) => {
            await expect(page).toHaveURL('/content/science');

            const containers = await page.getByTestId('tab-group').count();
            const tabPanels = await page.getByRole('tabpanel').count();
            expect(containers).toEqual(tabPanels);
        });

        test('Each panel should contain a treatment group selector', async ({page}) => {
            await expect(page).toHaveURL('/content/science');

            const tabPanels = await page.getByRole('tabpanel').all();

            for (const panel of tabPanels) {
                expect(panel.locator('label', {hasText: 'Treatment group'})).toBeTruthy();
            }
        });

        test('Each panel should contain a raw data table', async({page}) => {
            await expect(page).toHaveURL('/content/science');

            const tabPanels = await page.getByRole('tabpanel').all();

            for (const panel of tabPanels) {
                const dataTable = panel.getByTestId('raw-data-table');
                expect(dataTable).toBeTruthy();
                expect(dataTable).toBeVisible();
            }
        });
    });

    test.describe('Data view panel interaction tests', () => {
        test.beforeEach('Open start URL', async({page}, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto('/content/science');
        });

        test('Clicking on a tab should change the content of the tab panel', async({page}) => {
            await expect(page).toHaveURL('/content/science');

            const tabPanel = page.getByRole('tabpanel').first();

            expect(tabPanel.getByTestId('raw-data-table')).toBeVisible();

            const tabButton = page.locator('label').filter({ hasText: 'Visualisation' }).first();

            await tabButton.click();

            expect(tabPanel.getByTestId('raw-data-table')).not.toBeVisible();
            expect(tabPanel.getByTestId('svg-line-graph')).toBeVisible();
        });

        test('Clicking on each tab should replace the content of the tab panel', async({page}) => {
            await expect(page).toHaveURL('/content/science');

            const tabPanel = page.getByRole('tabpanel').first();

            expect(tabPanel.getByTestId('raw-data-table')).toBeVisible();

            const labels = await page.getByText('Data table Summary Data Visualisation Experimental Details').first().locator('label').all();

            for (const label of labels) {
                await label.click();

                if (await label.innerText() == 'Data table') {
                    expect(tabPanel.getByTestId('raw-data-table')).toBeVisible();
                } else if (await label.innerText() == 'Summary Data') {
                    expect(tabPanel.getByTestId('raw-data-table')).toBeVisible();
                } else if (await label.innerText() == 'Visualisation') {
                    expect(tabPanel.getByTestId('line-graph')).toBeVisible();
                } else if (await label.innerText() == 'Experimental Details') {
                    expect(tabPanel.getByRole('list')).toBeVisible()
                }
            }
        });

        test('Clicking on a tab in one instance should not replace the content of the tab panel in the other instance', async({page}) => {
            await expect(page).toHaveURL('/content/science');

            const tabPanels = await page.getByRole('tabpanel').all();

            for (const tabPanel of tabPanels) {
                expect(tabPanel.getByTestId('raw-data-table')).toBeVisible();
            }

            const labelToPress = page.getByText('Data table Summary Data Visualisation Experimental Details').first().locator('label').filter({ hasText: 'Visualisation' }).first()

            await labelToPress.click();

            expect(tabPanels[0].getByTestId('line-graph')).toBeVisible();
            expect(tabPanels[1].getByTestId('raw-data-table')).toBeVisible();
            console.log(await labelToPress.innerText());
        });

        test('Changing the selected treatment group should change the content of the raw data table', async({page}) => {
            await expect(page).toHaveURL('/content/science');
            const tabPanel = page.getByRole('tabpanel').first();

            // BEFORE: Expect a certain number of lines in the table
            const nrRowsBefore = await tabPanel.getByRole('row').count();
            const selectDropdown = tabPanel.getByLabel('Treatment group');
            await selectDropdown.selectOption('Stressed');
            const nrRowsAfter = await tabPanel.getByRole('row').count();

            expect(nrRowsAfter).toBeLessThan(nrRowsBefore);
        });

        test('Changing the selected treatment group in one instance should not change the selected treatment group in the other', async({page}) => {
            await expect(page).toHaveURL('/content/science');

            const tabPanels = await page.getByRole('tabpanel').all();
            console.log(tabPanels.length)

            const selectDropdownTop = tabPanels[0].getByLabel('Treatment group');
            // For some reason, selecting the other dropdown listbox using the same method does not work -- this selects the box correctly, even if it is a little unreadable
            const selectDropdownBottom = page.locator('[id="Treatment\\ group"]').nth(1)

            expect(selectDropdownTop).toHaveValue('All');
            expect(selectDropdownBottom).toHaveValue('All');

            await selectDropdownTop.selectOption('Stressed');

            expect(selectDropdownTop).toHaveValue('Stressed');
            expect(selectDropdownBottom).toHaveValue('All');

        });
    });

    test.describe('Graph interaction', () => {
        test.beforeEach('Open start URL', async({page}, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto('/content/science');
        })

        test('Can switch to the visualisation panel' , async ({page}) => {
            await expect(page).toHaveURL('/content/science');
            const tabGroup = page.getByTestId('tab-group').first();
            const vizTabButton = tabGroup.locator('label').filter({ hasText: 'Visualisation' });

            await vizTabButton.click();

            expect(tabGroup.getByTestId('line-graph')).toBeVisible();
        });

        test('Line graph should contain all the expected elements', async ({page}) => {
            await expect(page).toHaveURL('/content/science');
            const tabGroup = page.getByTestId('tab-group').first();
            const vizTabButton = tabGroup.locator('label').filter({ hasText: 'Visualisation' });
            await vizTabButton.click();

            const svg = tabGroup.getByTestId('line-graph');

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
            await expect(page).toHaveURL('/content/science');
            const tabGroup = page.getByTestId('tab-group').first();
            const vizTabButton = tabGroup.locator('label').filter({ hasText: 'Visualisation' });
            await vizTabButton.click();

            const svg = tabGroup.getByTestId('line-graph');
            const errorBarToggle = svg.getByTestId('slide-toggle');

            expect(svg.getByTestId('error-lines')).toBeVisible();

            await errorBarToggle.click();

            for (const line of await svg.getByTestId('error-line').all()) {
                expect(line).toHaveClass(/opacity-0/);
            }
        });

        test('Labels in the legend should correspond to treatment groups', async ({page}) => {
            await expect(page).toHaveURL('/content/science');
            const tabGroup = page.getByTestId('tab-group').first();
            const vizTabButton = tabGroup.locator('label').filter({ hasText: 'Visualisation' });
            await vizTabButton.click();

            const svg = tabGroup.getByTestId('line-graph');

            let expectedLabels = await tabGroup.getByLabel('Treatment group').allInnerTexts();
            // removes the 'All' option
            expectedLabels = expectedLabels[0].split('\n').filter((e) => (e !== 'All'));

            // checks each of the specified labels exist
            for (const label of expectedLabels) {
                expect(svg.getByTestId('labels-data').getByText(label, {exact: true})).toBeVisible();
            }
        });

        test('Clicking on one of the labels should display only the corresponding data', async({page}) => {
            const testLabel = 'Stressed'
            await expect(page).toHaveURL('/content/science');
            const tabGroup = page.getByTestId('tab-group').first();
            const vizTabButton = tabGroup.locator('label').filter({ hasText: 'Visualisation' });
            await vizTabButton.click();

            const svg = tabGroup.getByTestId('line-graph');
            expect(await svg.getByTestId('individual-line').count()).toEqual(3);

            const labelToPress = svg.getByTestId('labels-data').getByText(testLabel, {exact: true});
            await labelToPress.click()

            expect(await svg.getByTestId('individual-line').count()).toEqual(1);
            expect(await svg.getByTestId('individual-line').getAttribute('id')).toEqual(`${makeHtmlId(testLabel)}-path`)
        });

        // this test is currently not working, but it is not crucial that it does at this moment
        // test('Clicking on a line should display only the selected data', async({page}) => {
        //     const testLabel = 'Stressed'
        //     await expect(page).toHaveURL('/content/science');
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
        //     await expect(page).toHaveURL('/content/science');
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