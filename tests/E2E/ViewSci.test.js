import { expect, test } from "@playwright/test";


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
            const dropDowns = await page.getByLabel('Treatment group').all();
            console.log(dropDowns.length);
            const selectDropdownTop = dropDowns[0];
            const selectDropdownBottom = dropDowns[1];

            console.log(await selectDropdownBottom.inputValue());

            expect(selectDropdownTop).toHaveValue('All');
            expect(selectDropdownBottom).toHaveValue('All');

            await selectDropdownTop.selectOption('Stressed');

            expect(selectDropdownTop).toHaveValue('Stressed');
            expect(selectDropdownBottom).toHaveValue('All');

        })
    });
});