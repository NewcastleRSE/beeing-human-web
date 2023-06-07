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
// Test that tei-title is visible
// Test that tei-body is visible
// Test that tei-header is not visible
// Test that behaviours were applied