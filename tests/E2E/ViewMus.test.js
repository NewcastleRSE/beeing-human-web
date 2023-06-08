import { expect, test } from "@playwright/test";

test('Page loads and has expected option', async({page}) => {
    await page.goto("/");
    await expect(page.getByText('Music')).toBeVisible();
});

test('Selecting Music and pressing go sends the user to the correct page', async({page}) => {
    await page.goto("/");
    await page.getByText('Music').click();
    await expect(page.getByText('Music')).toBeChecked();
    await page.getByRole('link', { name: 'Go' }).click();
    await page.waitForURL('**/music');
    await expect(page).toHaveURL('/content/music');
});

test('Music content page should have a header containing music', async({page}) => {
    await page.goto("/content/music");
    await expect(page.getByRole("heading", {name: 'Music Test'})).toBeVisible();
});

test('Expect content page to have several sections', async({page}) => {
    await page.goto("/content/music");
    const headings = await page.getByRole('heading').allInnerTexts();
    expect(headings.length).toBeGreaterThan(1);
});

test('Expect music view to have a media player element', async({page}) => {
    await page.goto('/content/music');
    await Promise.all([
        page.locator('audio').waitFor('visible'),
        expect(page.locator('audio')).toBeVisible()
    ]);
})

// Ideally, we would be able to test if audio is playing, but currently does not seem to be a way of doing it
