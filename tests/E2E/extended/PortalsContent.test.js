import { expect, test } from '@playwright/test';

const pages = ['literature', 'science', 'music', 'connections']

let articleCollection = [];

for (const p of pages) {
    test.describe(`Portal panels content tests -- ${p}`, () => {
        test.beforeEach(`Open start URL -- ${p}`, async ({ page }, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto(`/${p}`);
            const articles = await page.getByRole('article').all();
            for (const art of articles) {
                const link = art.getByRole('link')
                articleCollection.push(await link.getAttribute('href'));
            }
        });

        test(`All clickable portal panels should contain one or more cards -- ${p}`, async ({ page }) => {
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

                        // get card collection
                        const cards = await panel.getByTestId('portal-panel-card').all();
                        expect(cards.length).toBeGreaterThan(0);

                        // click close button
                        const closeButton = panel.getByRole('button');
                        closeButton.click();

                        await expect(panel).not.toBeInViewport();
                    }
                }
            }
        })

        test(`All portal cards should be able to fetch content (i.e., not display the error message) -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);

            for (const article of articleCollection) {
                await page.goto(article)

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

                        // get card collection
                        const cards = await panel.getByTestId('portal-panel-card').all();
                        expect(cards.length).toBeGreaterThan(0);

                        for (const card of cards) {
                            await expect(card.getByText('Could not fetch preview')).toHaveCount(0);
                        }

                        // click close button
                        const closeButton = panel.getByRole('button');
                        closeButton.click();

                        await expect(panel).not.toBeInViewport();
                    }
                }
            }
        })

        test(`All portals should be well-formed (contain header, section and footer) -- ${p}`, async ({ page }) => {
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

                        // get card collection
                        const cards = await panel.getByTestId('portal-panel-card').all();
                        expect(cards.length).toBeGreaterThan(0);

                        for (const card of cards) {
                            await expect(card.getByTestId('card-header')).toBeVisible();
                            await expect(card.getByTestId('card-section')).toBeVisible();
                            await expect(card.getByTestId('card-footer')).toBeVisible();
                        }

                        // click close button
                        const closeButton = panel.getByRole('button');
                        closeButton.click();

                        await expect(panel).not.toBeInViewport();
                    }
                }
            }
        })

        test(`All portals should contain a link -- ${p}`, async ({ page }) => {
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

                        // get card collection
                        const cards = await panel.getByTestId('portal-panel-card').all();
                        expect(cards.length).toBeGreaterThan(0);

                        for (const card of cards) {
                            await expect(card.getByRole('link')).toBeAttached();
                        }

                        // click close button
                        const closeButton = panel.getByRole('button');
                        closeButton.click();

                        await expect(panel).not.toBeInViewport();
                    }
                }
            }
        });

        test(`All links in portal panels should correspond to their headings -- ${p}`, async ({ page }) => {
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

                        // get card collection
                        const cards = await panel.getByTestId('portal-panel-card').all();
                        expect(cards.length).toBeGreaterThan(0);

                        for (const card of cards) {
                            const link = await card.getByRole('link').getAttribute('href');
                            const header = await card.getByTestId('card-header').textContent();

                            if (link.substring(1).split('#')[0] === 'connections/buzzwords-feed') {
                                // test is a bit weak here: it first tries to figure out whether the portal is linking to a buzzword (i.e., does the header containg '--' like portals to buzzwords should) to then test the assertion; the problem, of course, is that it asserts that headers should be of a certain format, but the header is used to decide which test to make. It is enough for now, but flagging it as bad test design.
                                if (header.toLowerCase().includes(' -- ')) {
                                    expect(header.toLowerCase()).toContain(`buzzwords -- `)
                                } else {
                                    expect(header.toLowerCase()).toEqual(link.substring(1).split('#')[0].split('/')[0].toLowerCase())
                                }
                            } else {
                                expect(header.toLowerCase()).toEqual(link.substring(1).split('#')[0].split('/')[0].toLowerCase())
                            }
                        }

                        // click close button
                        const closeButton = panel.getByRole('button');
                        closeButton.click();

                        await expect(panel).not.toBeInViewport();
                    }
                }
            }
        })
    });
}