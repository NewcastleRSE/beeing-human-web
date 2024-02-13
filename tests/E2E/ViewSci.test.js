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
        })
    })
})