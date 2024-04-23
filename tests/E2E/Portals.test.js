import {expect, test} from '@playwright/test';

const pages = ['literature', 'science', 'music', 'connections']

for (const p of pages){
    test.describe(`Portal visibility tests -- ${p}`, () => {
        test.beforeEach(`Open start URL -- ${p}`, async({page}, testInfo) => {
            console.log(`Running ${testInfo.title}`);
            await page.goto(`/${p}`);
        })

        test(`Page should contain Portals -- ${p}`, async ({page}) => {
            await expect(page).toHaveURL(`/${p}`);
            const portals = await page.locator('.portal').all();
            expect(portals.length).toBeGreaterThan(0);
        });

        test(`Portals should have different types and those types need to be valid -- ${p}`, async({page}) => {
            await expect(page).toHaveURL(`/${p}`);
            const legalTypes = ['destination', 'origin', 'both']
            const portals = await page.locator('.portal').all();
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                expect(legalTypes).toContain(type);
            }
        })

        test(`Portals of type 'destination' should not have any class besides 'portal', i.e., they should not be distinctive -- ${p}`, async({page}) => {
            await expect(page).toHaveURL(`/${p}`);
            const portals = await page.locator('.portal').all();
            for (const portal of portals) {
                const type = (await portal.getAttribute('data-testid')).split('-')[0]
                if (type === 'destination') {
                    const classes = Object.values(await portal.evaluate(el => el.classList));
                    expect(classes).toEqual(['portal']);
                }
            }
        })
    })
}