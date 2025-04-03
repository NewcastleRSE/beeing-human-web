import { expect, test } from '@playwright/test';

const pages = ['literature', 'science', 'music', 'connections']

let articleCollection = [];

for (const p of pages) {
    test.describe(`Portal interaction tests -- ${p}`, () => {
        test.beforeEach(`Open start URL -- ${p}`, async ({ page }, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto(`/${p}`);
            const articles = await page.getByRole('article').all();
            for (const art of articles) {
                const link = art.getByRole('link')
                articleCollection.push(await link.getAttribute('href'));
            }
        });

        test(`Clicking on an 'origin' or 'both' Portal should open the portal panel -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);

            for (const article of articleCollection) {
                await page.goto(article);

                // finds all portals
                const portals = await page.locator('.portal').all();

                if (portals) {
                    // filters portals to only clickable ones
                    let relevantPortals = [];
                    for (const portal of portals) {
                        const type = (await portal.getAttribute('data-testid')).split('-')[0]
                        if (type === 'origin' || type === 'both') {
                            relevantPortals.push(portal);
                        }
                    }

                    if (relevantPortals.length > 0) {
                        // clicks the portal
                        await relevantPortals[0].click();

                        // finds the panel
                        const panel = page.getByTestId('portal-panel-visible');
                        console.log(panel);

                        // .toBeVisible() fails the test despite the panel being visible in the preview
                        await expect(panel).toBeInViewport();
                    }
                }
            }
        });

        test(`Clicking on the close button should close the panel -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);

            for (const article of articleCollection) {
                await page.goto(article);
                
                // finds all portals
                const portals = await page.locator('.portal').all();

                if (portals) {
                    // filters portals to only clickable ones
                    let relevantPortals = [];
                    for (const portal of portals) {
                        const type = (await portal.getAttribute('data-testid')).split('-')[0]
                        if (type === 'origin' || type === 'both') {
                            relevantPortals.push(portal);
                        }
                    }

                    if (relevantPortals.length > 0) {
                        // clicks the portal
                        await relevantPortals[0].click();

                        // finds the panel
                        const panel = page.getByTestId('portal-panel-visible');

                        // .toBeVisible() fails the test despite the panel being visible in the preview
                        await expect(panel).toBeInViewport()

                        // click close button
                        const closeButton = panel.getByRole('button');
                        closeButton.click();

                        await expect(panel).not.toBeInViewport();
                    }
                }
            }
        });

        test(`All relevant portals should be able to open and close the portal panel -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);

            for (const article of articleCollection) {
                await page.goto(article);

                // finds all portals
                const portals = await page.locator('.portal').all();

                // filters portals to only clickable ones
                for (const portal of portals) {
                    const type = (await portal.getAttribute('data-testid')).split('-')[0]
                    if (type === 'origin' || type === 'both') {
                        // clicks the portal
                        await portal.click();

                        // finds the panel
                        const panel = page.getByTestId('portal-panel-visible');

                        // .toBeVisible() fails the test despite the panel being visible in the preview
                        await expect(panel).toBeInViewport()

                        // click close button
                        const closeButton = panel.getByRole('button');
                        closeButton.click();

                        await expect(panel).not.toBeInViewport();
                    }
                }
            }

        });
    });
}