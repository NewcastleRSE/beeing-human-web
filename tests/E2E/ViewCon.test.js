import { expect, test } from "@playwright/test";

import {buzzwords, listAuthors, listTags} from '../mocks/mockVarsBuzzwords'

test.describe('Page navigation tests', () => {
    test('Page loads and has expected option', async ({ page }) => {
        await page.goto("/");
        await expect(page.getByText('Connections')).toBeVisible();
    });

    test('Selecting Connections and pressing go sends the user to the correct page', async ({ page }) => {
        await page.goto("/");
        await page.getByText('Connections').click();
        await expect(page.getByText('Connections')).toBeChecked();
        await page.getByRole('link', { name: 'Go' }).click();
        await page.waitForURL('**/connections');
        await expect(page).toHaveURL('/content/connections');
    });
})

test.describe('Page content containers exist tests', () => {

    test.beforeEach('Open start URL', async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        await page.goto('/content/connections');
    })

    test('Connections content page should have a header containing Connections', async ({ page }) => {
        await expect(page.getByRole("heading", { name: 'Connections Test' })).toBeVisible();
    });

    test('Expect content page to have several sections', async ({ page }) => {
        const headings = await page.getByRole('heading').allInnerTexts();
        expect(headings.length).toBeGreaterThan(1);
    });

    test('Page should have a container of buzzwords', async ({ page }) => {
        const container = page.getByTestId('card-collection');
        await expect(container).toBeVisible();
    });

    test('Page should have two containers of tag selectors', async ({ page }) => {
        const containers = await page.getByTestId('tag-selector-container').all();
        expect(containers.length).toEqual(2);
    });

    test('Page should have one search bar', async ({ page }) => {
        const container = page.getByTestId('search-bar-container');
        await expect(container).toBeVisible();
    });
})

test.describe('Page has correct contents tests', () => {
    test.beforeEach('Open start URL and load data from files', async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        await page.goto('/content/connections');

        // loading data should really be replicated here rather than read from a static mock variable, but it is proving to be a little too complex to do. Just using the static mock for now, might need to create a few scripts to automatically update it
        
    })

    test('Page should have as many cards as there are buzzwords', async ({ page }) => {
        const buzzCards = await page.getByTestId('buzzword-card').all();
        expect(buzzCards.length).toEqual(buzzwords.length);
    });

    test('Page should have as many tag selectors as there are tags', async({page}) => {
        const tagChips = await page.getByTestId('tags-chip').all();
        expect(tagChips.length).toEqual(listTags.length);
    });

    test('Page should have as many author selectors as there are authors', async({page}) => {
        const authorChips = await page.getByTestId('authors-chip').all();
        expect(authorChips.length).toEqual(listAuthors.length);
    });
})

