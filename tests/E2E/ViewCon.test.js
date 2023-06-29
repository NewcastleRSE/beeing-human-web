import { expect, test } from "@playwright/test";

test('Page loads and has expected option', async({page}) => {
    await page.goto("/");
    await expect(page.getByText('Connections')).toBeVisible();
});

test('Selecting Connections and pressing go sends the user to the correct page', async({page}) => {
    await page.goto("/");
    await page.getByText('Connections').click();
    await expect(page.getByText('Connections')).toBeChecked();
    await page.getByRole('link', { name: 'Go' }).click();
    await page.waitForURL('**/connections');
    await expect(page).toHaveURL('/content/connections');
});

test('Connections content page should have a header containing Connections', async({page}) => {
    await page.goto("/content/connections");
    await expect(page.getByRole("heading", {name: 'Connections Test'})).toBeVisible();
});

test('Expect content page to have several sections', async({page}) => {
    await page.goto("/content/connections");
    const headings = await page.getByRole('heading').allInnerTexts();
    expect(headings.length).toBeGreaterThan(1);
});