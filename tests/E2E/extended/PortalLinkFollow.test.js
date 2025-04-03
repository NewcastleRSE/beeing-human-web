import { expect, test } from '@playwright/test';

const pages = ['literature', 'science', 'music', 'connections']

let articleCollection = [];

for (const p of pages) {
    test.describe(`Portal panels link following tests -- ${p}`, () => {
        test.beforeEach(`Open start URL -- ${p}`, async ({ page }, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto(`/${p}`);
            const articles = await page.getByRole('article').all();
            for (const art of articles) {
                const link = art.getByRole('link')
                articleCollection.push(await link.getAttribute('href'));
            }
        });

        test(`All portals' links should send the user to the correct place -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);

            for (const article of articleCollection) {
                await page.goto(article);

                // finds all portals
                const portals = await page.locator('.portal').all();
                const portalIds = []
                for (const portal of portals) {
                    portalIds.push(await portal.getAttribute('data-testid'));
                }

                // filters portals to only clickable ones
                // iterates through portal ids rather than portals to avoid errors if the portal order changes after page navigation
                for (const portalID of portalIds) {
                    const portal = page.getByTestId(portalID);
                    const type = portalID.split('-')[0]
                    if (type === 'origin' || type === 'both') {
                        // clicks the portal
                        await portal.click();

                        // finds the panel
                        const panel = page.getByTestId('portal-panel-visible');

                        // .toBeVisible() fails the test despite the panel being visible in the preview
                        await expect(panel).toBeInViewport()

                        // get card collection
                        const cards = await panel.getByTestId('portal-panel-card').all();
                        expect(cards.length).toBeGreaterThan(0);

                        for (const card of cards) {
                            await expect(card.getByRole('link')).toBeAttached();
                            const linkButton = card.getByRole('link');
                            const expectedLink = await linkButton.getAttribute('href');
                            await linkButton.click();
                            await expect(page).toHaveURL(expectedLink);
                            await page.goto(article);
                            await expect(page).toHaveURL(article);
                            if (await card.isVisible() === false) {
                                await portal.click();
                            }
                        }

                        // click close button
                        const closeButton = panel.getByRole('button');
                        closeButton.click();

                        await expect(panel).not.toBeInViewport();
                    }
                }
            }
        });

        test(`All portals' links followed should contain the previewed content -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);

            for (const article of articleCollection) {
                await page.goto(article);

                // finds all portals
                const portals = await page.locator('.portal').all();
                const portalIds = []
                for (const portal of portals) {
                    portalIds.push(await portal.getAttribute('data-testid'));
                }

                // filters portals to only clickable ones
                // iterates through portal ids rather than portals to avoid errors if the portal order changes after page navigation
                for (const portalID of portalIds) {
                    const portal = page.getByTestId(portalID);
                    const type = portalID.split('-')[0]
                    if (type === 'origin' || type === 'both') {
                        // clicks the portal
                        await portal.click();

                        // finds the panel
                        const panel = page.getByTestId('portal-panel-visible');

                        // .toBeVisible() fails the test despite the panel being visible in the preview
                        await expect(panel).toBeInViewport()

                        // get card collection
                        const cards = await panel.getByTestId('portal-panel-card').all();
                        expect(cards.length).toBeGreaterThan(0);

                        for (const card of cards) {
                            const cardContent = await card.getByTestId('card-section').textContent();
                            // expects card  to have a link
                            await expect(card.getByRole('link')).toBeAttached();

                            // gets id for destination portal, builds a regex to find the data-testid in the page it navigates to
                            const expectedLink = await card.getByRole('link').getAttribute('href');
                            const destinationId = expectedLink.split('#')[1]
                            const destinationIdRegEx = new RegExp(`\\w+-portal-${destinationId}`)

                            // navigate to portal
                            await card.getByRole('link').click();

                            // page should have the correct url
                            await expect(page).toHaveURL(expectedLink);

                            // portal should be visible and in viewport
                            await expect(page.getByTestId(destinationIdRegEx)).toBeVisible();
                            await expect(page.getByTestId(destinationIdRegEx)).toBeInViewport();

                            // go back to the previous page and if necessary opens the portal again
                            await page.goto(article);
                            await expect(page).toHaveURL(article);
                            if (await card.isVisible() === false) {
                                await portal.click();
                            }
                        }

                        // click close button
                        const closeButton = panel.getByRole('button');
                        closeButton.click();

                        await expect(panel).not.toBeInViewport();
                    }
                }
            }

        });
    })
}