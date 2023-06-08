import { expect, test } from "@playwright/test";

test('Page loads and has expected option', async({page}) => {
    await page.goto("/");
    await expect(page.getByText('Interdisciplinarity')).toBeVisible();
});

test('Selecting Interdisciplinarity and pressing go sends the user to the correct page', async({page}) => {
    await page.goto("/");
    await page.getByText('Interdisciplinarity').click();
    await expect(page.getByText('Interdisciplinarity')).toBeChecked();
    await page.getByRole('link', { name: 'Go' }).click();
    await page.waitForURL('**/interdisciplinarity');
    await expect(page).toHaveURL('/content/interdisciplinarity');
});

test('Interdisciplinarity content page should have a header containing interdisciplinarity', async({page}) => {
    await page.goto("/content/interdisciplinarity");
    await expect(page.getByRole("heading", {name: 'Interdisciplinarity Test'})).toBeVisible();
});

test('Expect content page to have several sections', async({page}) => {
    await page.goto("/content/interdisciplinarity");
    const headings = await page.getByRole('heading').allInnerTexts();
    expect(headings.length).toBeGreaterThan(1);
});