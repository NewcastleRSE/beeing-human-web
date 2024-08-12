import { expect, test } from "@playwright/test";

test.describe('Page navigation tests', () => {
    test('Page loads and has expected option', async ({ page }) => {
        await page.goto("/");
        const hive = page.getByTestId('hive-desktop');
        await expect(hive).toBeVisible();
        const link = page.getByTestId('literature-desktop');
        await expect(link).toBeVisible();
    });

    test('Clicking on literature should send the user to the correct page', async ({ page }) => {
        await page.goto("/");
        const hive = page.getByTestId('hive-desktop');
        await expect(hive).toBeVisible();
        const link = page.getByTestId('literature-desktop');
        await expect(link).toBeVisible();
        await link.click();
        await page.waitForURL('**/literature/');
        await expect(page).toHaveURL('/literature/');
    });
})

test.describe('Page has TEI content', () => {
    // Test that page has tei-container
    test('Expect that the literature view contains a TEI-container element', async ({ page }) => {
        await page.goto("/literature");
        const container = page.getByTestId('TEI-container');
        // this waits until both promises are resolved before timing out -- if the expect was outside the await block, it would return immediately and the test would be flaky.
        await Promise.all([
            container.waitFor('visible'),
            expect(container).toBeVisible()
        ]);
    });

    // Test that tei-title is visible
    // this test will need to be changed to the correct title expected, Coopers Hill is just for testing/dev
    test('Expect that the literature view contains TEI-title after the page loads', async ({ page }) => {
        await page.goto('/literature');
        const container = page.getByTestId('TEI-container');
        await Promise.all([
            container.waitFor('visible'),
            expect(page.getByText('Feminine Monarchie', { exact: true })).toBeVisible()
        ]);
    });

    // Test that tei-body is visible
    test('Expect that the literature view contains TEI-body after the page loads', async ({ page }) => {
        await page.goto('/literature');
        const teiText = page.getByText('Feminine Monarchie', { exact: true });
        await Promise.all([
            teiText.waitFor('visible'),
            // locating by css selectors is considered bad practice, but there's no other way (currently) of locating this element; for a simple existence check, it's fine
            expect(page.locator('css=tei-body')).toBeVisible()
        ]);
    });

    // Test that tei-header is not visible
    test('Expect that the literature view contains TEI-header after the page loads, but that this is not visible', async ({ page }) => {
        await page.goto('/literature');
        const teiText = page.getByText('Feminine Monarchie', { exact: true });
        await Promise.all([
            teiText.waitFor('visible'),
            // locating by css selectors is considered bad practice, but there's no other way (currently) of locating this element; for a simple existence check, it's fine
            expect(page.locator('css=tei-teiheader')).not.toBeVisible()
        ]);
    });

    // Test that behaviours were applied
    // this is here just as an example of how we could test that behaviours are applied.
    // In the dev scenario, we look for one of the links that should have resulted from applying the note[type='gloss'] behaviour
    // test('Expect behaviours to have been applied to TEI, by checking what happens with gloss notes', async({page}) => {
    //     await page.goto('/literature');
    //     const teiText = page.getByText('COOPERS HILL.', {exact: true});
    //     await Promise.all([
    //         teiText.waitFor('visible'),
    //         expect(page.getByRole('link', { name: '1', exact: true })).toBeVisible()
    //     ]);
    // });
});

test.describe('Page has IIIF viewer content', () => {
    test('Expect that page contains the IIIF viewer', async ({page}) => {
        await page.goto('/literature');
        const iiifViewer = page.getByTestId('iiif-viewer');
        await expect(iiifViewer).toBeVisible();
    })
})

