import { expect, test } from "@playwright/test";

test("Page loads and has expected h1", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bee-ing Human" })
  ).toBeVisible();
});

test('Page loads and has expected ViewSelector', async({page}) => {
  await page.goto("/");
  await expect(page.getByTestId('radio-group')).toBeVisible();
});

test('Page loads and has link to About page', async({page}) => {
  await page.goto("/");
  const aboutLink = await page.getByRole('link', { name: 'About' }).getAttribute('href');
  expect(aboutLink).toContain('about');
})