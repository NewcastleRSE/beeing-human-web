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
                const tabs = await container.getByRole('tablist').all();
                for (const t of tabs) {
                    console.log(await t.allInnerTexts());
                }
            }
        });

        test('Each tab should have the expected titles', async ({page}) => {
            await expect(page).toHaveURL('/content/science');
            const container = page.getByTestId('tab-group').first();

            const tabs = container.getByTestId('tablist').all();
            
        })
    })
})