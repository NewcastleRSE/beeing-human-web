import { expect, test } from '@playwright/test';

const pages = ['literature', 'science', 'music', 'connections']

let articleCollection = [];

for (const p of pages) {
    test.describe(`Portal visibility tests -- ${p}`, () => {
        test.beforeEach(`Open start URL -- ${p}`, async ({ page }, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto(`/${p}`);
            const articles = await page.getByRole('article').all();
            for (const art of articles) {
                const link = art.getByRole('link')
                articleCollection.push(await link.getAttribute('href'));
            }
        })

        test(`Portals should have different types and those types need to be valid -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);
            const legalTypes = ['destination', 'origin', 'both']
            for (const article of articleCollection) {
                await page.goto(article);
                const portals = await page.locator('.portal').all();
                if (portals) {
                    for (const portal of portals) {
                        const type = (await portal.getAttribute('data-testid')).split('-')[0]
                        expect(legalTypes).toContain(type);
                    }
                }
            }
        });

        test(`Portals of type 'destination' should not have any class besides 'portal', i.e., they should not be distinctive -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);
            for (const article of articleCollection) {
                await page.goto(article);
                const portals = await page.locator('.portal').all();
                for (const portal of portals) {
                    const type = (await portal.getAttribute('data-testid')).split('-')[0]
                    if (type === 'destination') {
                        const classes = Object.values(await portal.evaluate(el => el.classList));
                        expect(classes).toEqual(['portal']);
                    }
                }
            }
        });

        test(`Portals of type 'origin' or 'both' should have the appropriate class list -- ${p}`, async ({ page }) => {
            await expect(page).toHaveURL(`/${p}`);
            for (const article of articleCollection) {
                await page.goto(article);
                const portals = await page.locator('.portal').all();
                const expectedClassList = 'text-amber-600 bg-slate-300 rounded-md border-[1px] border-slate-600 px-1 hover:bg-slate-200 hover:text-amber-800 hover:font-semibold hover:cursor-pointer portal'.split(' ').sort()
                for (const portal of portals) {
                    const type = (await portal.getAttribute('data-testid')).split('-')[0]
                    if (type === 'origin' || type === 'both') {
                        const classes = Object.values(await portal.evaluate(el => el.classList));
                        expect(classes.sort()).toEqual(expectedClassList);
                    }
                }
            }
        });
    });
}

// Content of portal should be highlighted in the followed link