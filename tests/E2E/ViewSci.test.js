import { expect, test } from "@playwright/test";

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