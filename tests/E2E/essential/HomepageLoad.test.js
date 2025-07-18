import { expect, test } from "@playwright/test";

test("Page loads and has expected header", async ({ page }) => {
  await page.goto("/");
  const banner = page.getByTestId('logo-landing-page');
  await expect(banner).toBeVisible();
  expect(page.getByText('Inspired by Charles')).toBeVisible();
});

test('Page loads and has expected ViewSelector', async({page}) => {
  await page.goto("/");
  await expect(page.getByTestId('hive-desktop')).toBeVisible();
});

// test('Page loads and has link to About page', async({page}) => {
//   await page.goto("/");
//   const aboutLink = await page.getByRole('link', { name: 'About' }).getAttribute('href');
//   expect(aboutLink).toContain('about');
// })