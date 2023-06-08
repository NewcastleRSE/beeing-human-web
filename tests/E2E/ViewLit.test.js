import { expect, test } from "@playwright/test";

test('Page loads and has expected option', async({page}) => {
    await page.goto("/");
    await expect(page.getByText('Literature')).toBeVisible();
});

test('Selecting Literature and pressing go sends the user to the correct page', async({page}) => {
    await page.goto("/");
    await page.getByText('Literature').click();
    await expect(page.getByText('Literature')).toBeChecked();
    await page.getByRole('link', { name: 'Go' }).click();
    await page.waitForURL('**/literature');
    await expect(page).toHaveURL('/content/literature');
});

test('Literature content page should have a header containing Literature', async({page}) => {
    await page.goto("/content/literature");
    await expect(page.getByRole("heading", {name: 'Literature Test'})).toBeVisible();
});

test('Expect content page to have several sections', async({page}) => {
    await page.goto("/content/literature");
    const headings = await page.getByRole('heading').allInnerTexts();
    expect(headings.length).toBeGreaterThan(1);
});

// Test that page has tei-container
test('Expect that the literature view contains a TEI-container element', async({page}) => {
    await page.goto("/content/literature");
    const container = page.getByTestId('TEI-container');
    // this waits until both promises are resolved before timing out -- if the expect was outside the await block, it would return immediately and the test would be flaky.
    await Promise.all([
        container.waitFor('visible'),
        expect(container).toBeVisible()
    ]);
});

// Test that tei-title is visible
// this test will need to be changed to the correct title expected, Coopers Hill is just for testing/dev
test('Expect that the literature view contains TEI-title after the page loads', async({page}) => {
    await page.goto('/content/literature');
    const container = page.getByTestId('TEI-container');
    await Promise.all([
        container.waitFor('visible'),
        expect(page.getByText('COOPERS HILL.', { exact: true })).toBeVisible()
    ]);
});

// Test that tei-body is visible
test('Expect that the literature view contains TEI-body after the page loads', async({page}) => {
    await page.goto('/content/literature');
    const teiText = page.getByText('COOPERS HILL.', { exact: true });
    await Promise.all([
        teiText.waitFor('visible'),
        // locating by css selectors is considered bad practice, but there's no other way (currently) of locating this element; for a simple existence check, it's fine
        expect(page.locator('css=tei-body')).toBeVisible()
    ]);
});

// Test that tei-header is not visible
test('Expect that the literature view contains TEI-header after the page loads, but that this is not visible', async({page}) => {
    await page.goto('/content/literature');
    const teiText = page.getByText('COOPERS HILL.', { exact: true });
    await Promise.all([
        teiText.waitFor('visible'),
        // locating by css selectors is considered bad practice, but there's no other way (currently) of locating this element; for a simple existence check, it's fine
        expect(page.locator('css=tei-teiheader')).not.toBeVisible()
    ]);
});

// Test that behaviours were applied
// this is here just as an example of how we could test that behaviours are applied.
// In the dev scenario, we look for one of the links that should have resulted from applying the note[type='gloss'] behaviour
test('Expect behaviours to have been applied to TEI, by checking what happens with gloss notes', async({page}) => {
    await page.goto('/content/literature');
    const teiText = page.getByText('COOPERS HILL.', {exact: true});
    await Promise.all([
        teiText.waitFor('visible'),
        expect(page.getByRole('link', { name: '1', exact: true })).toBeVisible()
    ]);
});