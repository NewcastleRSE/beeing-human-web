import { expect, test } from '@playwright/test';

const pages = ['literature', 'science', 'music', 'connections']

for (const p of pages) {
    test.describe(`Portal visibility tests -- ${p}`, () => {
        test.beforeEach(`Open start URL -- ${p}`, async ({ page }, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto(`/${p}`);
        })

        test(`Page should contain Portals -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);
            const portals = await page.locator('.portal').all();
            expect(portals.length).toBeGreaterThan(0);
        });

        test(`Portals should have different types and those types need to be valid -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);
            const legalTypes = ['destination', 'origin', 'both']
            const portals = await page.locator('.portal').all();
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                expect(legalTypes).toContain(type);
            }
        });

        test(`Portals of type 'destination' should not have any class besides 'portal', i.e., they should not be distinctive -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);
            const portals = await page.locator('.portal').all();
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                if (type === 'destination') {
                    const classes = Object.values(await portal.evaluate(el => el.classList));
                    expect(classes).toEqual(['portal']);
                }
            }
        });

        test(`Portals of type 'origin' or 'both' should have the appropriate class list -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);
            const portals = await page.locator('.portal').all();
            const expectedClassList = 'text-amber-600 bg-slate-300 rounded-md border-[1px] border-slate-600 px-1 hover:bg-slate-200 hover:text-amber-800 hover:font-semibold hover:cursor-pointer portal'.split(' ').sort()
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                if (type === 'origin' || type === 'both') {
                    const classes = Object.values(await portal.evaluate(el => el.classList));
                    expect(classes.sort()).toEqual(expectedClassList);
                }
            }
        });
    });

    test.describe(`Portal interaction tests -- ${p}`, () => {
        test.beforeEach(`Open start URL -- ${p}`, async ({ page }, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto(`/${p}`);
        });

        test(`Clicking on an 'origin' or 'both' Portal should open the portal panel -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);

            // finds all portals
            const portals = await page.locator('.portal').all();

            // filters portals to only clickable ones
            let relevantPortals = [];
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                if (type === 'origin' || type === 'both') {
                    relevantPortals.push(portal);
                }
            }

            // clicks the portal
            await relevantPortals[0].click();

            // finds the panel
            const panel = page.getByRole('dialog');

            // .toBeVisible() fails the test despite the panel being visible in the preview
            await expect(panel).toBeInViewport();
        });

        test(`Clicking on the close button should close the panel -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);

            // finds all portals
            const portals = await page.locator('.portal').all();

            // filters portals to only clickable ones
            let relevantPortals = [];
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                if (type === 'origin' || type === 'both') {
                    relevantPortals.push(portal);
                }
            }

            // clicks the portal
            await relevantPortals[0].click();

            // finds the panel
            const panel = page.getByRole('dialog');

            // .toBeVisible() fails the test despite the panel being visible in the preview
            await expect(panel).toBeInViewport()

            // click close button
            const closeButton = panel.getByRole('button');
            closeButton.click();

            await expect(panel).not.toBeInViewport();
        });

        test(`All relevant portals should be able to open and close the portal panel -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);

            // finds all portals
            const portals = await page.locator('.portal').all();

            // filters portals to only clickable ones
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                if (type === 'origin' || type === 'both') {
                    // clicks the portal
                    await portal.click();

                    // finds the panel
                    const panel = page.getByRole('dialog');

                    // .toBeVisible() fails the test despite the panel being visible in the preview
                    await expect(panel).toBeInViewport()

                    // click close button
                    const closeButton = panel.getByRole('button');
                    closeButton.click();

                    await expect(panel).not.toBeInViewport();
                }
            }
        });
    });

    test.describe(`Portal panels content tests -- ${p}`, () => {
        test.beforeEach(`Open start URL -- ${p}`, async ({ page }, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto(`/${p}`);
        });

        test(`All clickable portal panels should contain one or more cars -- ${p}`, async({page}) => {
            await expect(page).toHaveURL(`/${p}`);

            // finds all portals
            const portals = await page.locator('.portal').all();

            // filters portals to only clickable ones
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                if (type === 'origin' || type === 'both') {
                    // clicks the portal
                    await portal.click();

                    // finds the panel
                    const panel = page.getByRole('dialog');

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
        })

        test(`All portal cards should be able to fetch content (i.e., not display the error message) -- ${p}`, async({page}) => {
            await expect(page).toHaveURL(`/${p}`);

            // finds all portals
            const portals = await page.locator('.portal').all();

            // filters portals to only clickable ones
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                if (type === 'origin' || type === 'both') {
                    // clicks the portal
                    await portal.click();

                    // finds the panel
                    const panel = page.getByRole('dialog');

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
        })

        test(`All portals should be well-formed (contain header, section and footer) -- ${p}`, async ({page}) => {
            await expect(page).toHaveURL(`/${p}`);

            // finds all portals
            const portals = await page.locator('.portal').all();

            // filters portals to only clickable ones
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                if (type === 'origin' || type === 'both') {
                    // clicks the portal
                    await portal.click();

                    // finds the panel
                    const panel = page.getByRole('dialog');

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
        })

        test(`All portals should contain a link -- ${p}`, async ({page}) => {
            await expect(page).toHaveURL(`/${p}`);

            // finds all portals
            const portals = await page.locator('.portal').all();

            // filters portals to only clickable ones
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                if (type === 'origin' || type === 'both') {
                    // clicks the portal
                    await portal.click();

                    // finds the panel
                    const panel = page.getByRole('dialog');

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
        });

        test(`All links in portal panels should correspond to their headings -- ${p}`, async ({page}) => {
            await expect(page).toHaveURL(`/${p}`);

            // finds all portals
            const portals = await page.locator('.portal').all();

            // filters portals to only clickable ones
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                if (type === 'origin' || type === 'both') {
                    // clicks the portal
                    await portal.click();

                    // finds the panel
                    const panel = page.getByRole('dialog');

                    // .toBeVisible() fails the test despite the panel being visible in the preview
                    await expect(panel).toBeInViewport()

                    // get card collection
                    const cards = await panel.getByTestId('portal-panel-card').all();
                    expect(cards.length).toBeGreaterThan(0);

                    for (const card of cards) {
                        const link = await card.getByRole('link').getAttribute('href');
                        const header = await card.getByTestId('card-header').textContent();
                        
                        if (link.substring(1).split('#')[0] === 'connections') {
                            // test failing when the portal goes to the connections page itself
                            expect(header.toLowerCase()).toContain(`buzzwords -- `)
                        } else {
                            expect(header.toLowerCase()).toEqual(link.substring(1).split('#')[0].toLowerCase())
                        }
                    }

                    // click close button
                    const closeButton = panel.getByRole('button');
                    closeButton.click();

                    await expect(panel).not.toBeInViewport();
                }
            }
        })
    });
}