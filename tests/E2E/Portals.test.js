import { expect, test } from '@playwright/test';

const pages = ['literature', 'science', 'music', 'connections']

for (const p of pages) {
    test.describe(`Portal visibility tests -- ${p}`, () => {
        test.beforeEach(`Open start URL -- ${p}`, async ({ page }, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto(`/${p}`);
            const articles = await page.getByRole('article').all();
            console.log(articles);
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
            const panel = page.getByTestId('portal-panel-visible');
            console.log(panel);

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
            const panel = page.getByTestId('portal-panel-visible');

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
                    const panel = page.getByTestId('portal-panel-visible');

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

        test(`All clickable portal panels should contain one or more cards -- ${p}`, async({page}) => {
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
                    const panel = page.getByTestId('portal-panel-visible');

                    // .toBeVisible() fails the test despite the panel being visible in the preview
                    await expect(panel).toBeInViewport()

                    // get card collection
                    const cards = await panel.getByTestId('portal-panel-card').all();
                    expect(cards.length).toBeGreaterThan(0);

                    for (const card of cards) {
                        const link = await card.getByRole('link').getAttribute('href');
                        const header = await card.getByTestId('card-header').textContent();
                        
                        if (link.substring(1).split('#')[0] === 'connections') {
                            // test is a bit weak here: it first tries to figure out whether the portal is linking to a buzzword (i.e., does the header containg '--' like portals to buzzwords should) to then test the assertion; the problem, of course, is that it asserts that headers should be of a certain format, but the header is used to decide which test to make. It is enough for now, but flagging it as bad test design.
                            if (header.toLowerCase().includes(' -- ')) {
                                expect(header.toLowerCase()).toContain(`buzzwords -- `)
                            } else {
                                expect(header.toLowerCase()).toEqual(link.substring(1).split('#')[0].toLowerCase())
                            }
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

    test.describe(`Portal panels link following tests -- ${p}`, () => {
        test.beforeEach(`Open start URL -- ${p}`, async ({ page }, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto(`/${p}`);
        });

        test(`All portals' links should send the user to the correct place -- ${p}`, async ({page}) => {
            await expect(page).toHaveURL(`/${p}`);
    
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
                        const expectedLink = await card.getByRole('link').getAttribute('href');
                        await card.getByRole('link').click();
                        await expect(page).toHaveURL(expectedLink);
                        await page.goBack();
                        await expect(page).toHaveURL(`/${p}`);
                        if (await card.isVisible() === false){
                            await portal.click();
                        }
                    }
    
                    // click close button
                    const closeButton = panel.getByRole('button');
                    closeButton.click();
    
                    await expect(panel).not.toBeInViewport();
                }
            }
        });

        test(`All portals' links followed should contain the previewed content -- ${p}`, async ({page}) => {
            await expect(page).toHaveURL(`/${p}`);
    
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
                        await page.goBack();
                        await expect(page).toHaveURL(`/${p}`);
                        if (await card.isVisible() === false){
                            await portal.click();
                        }
                    }
    
                    // click close button
                    const closeButton = panel.getByRole('button');
                    closeButton.click();
    
                    await expect(panel).not.toBeInViewport();
                }
            }
        });

        test(`All portals' links followed should be highlighted -- ${p}`, async ({page}) => {
            await expect(page).toHaveURL(`/${p}`);
    
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

                        // portal should contain 'underline' class
                        await expect(page.getByTestId(destinationIdRegEx)).toHaveClass(/underline/);

                        // go back to the previous page and if necessary opens the portal again
                        await page.goBack();
                        await expect(page).toHaveURL(`/${p}`);
                        if (await card.isVisible() === false){
                            await portal.click();
                        }
                    }
    
                    // click close button
                    const closeButton = panel.getByRole('button');
                    closeButton.click();
    
                    await expect(panel).not.toBeInViewport();
                }
            }
        });
    })
}

// Content of portal should be highlighted in the followed link