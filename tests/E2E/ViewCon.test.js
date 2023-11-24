import { expect, test } from "@playwright/test";

import { buzzwords, listAuthors, listTags } from '../mocks/mockVarsBuzzwords'
import { daysOfTheWeek, monthsOfTheYear } from '../../src/utils/generalConstants'

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
        await expect(page).toHaveURL('/content/connections');
        await expect(page.getByRole("heading", { name: 'Connections Test' })).toBeVisible();
    });

    test('Expect content page to have several sections', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const headings = await page.getByRole('heading').allInnerTexts();
        expect(headings.length).toBeGreaterThan(1);
    });

    test('Page should have a container of buzzwords', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const container = page.getByTestId('card-collection');
        await expect(container).toBeVisible();
    });

    test('Page should have two containers of tag selectors', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const containers = await page.getByTestId('tag-selector-container').all();
        expect(containers.length).toEqual(2);
    });

    test('Page should have two reset buttons (one per tag selector)', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const resetButtons = await page.getByTestId('tag-reset-button').all();
        expect(resetButtons.length).toEqual(2);
    });

    test('Page should have one search bar', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const container = page.getByTestId('search-bar-container');
        await expect(container).toBeVisible();
    });

    test('Page should have one go button for the search bar', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const resetButton = page.getByText('Go', { exact: true });
        await expect(resetButton).toBeVisible();
    });

    test('Page should have one reset all button', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const resetAllButton = page.getByText('Reset all', { exact: true });
        await expect(resetAllButton).toBeVisible();
    });
})

test.describe('Page has correct contents tests', () => {
    test.beforeEach('Open start URL and load data from files', async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        await page.goto('/content/connections');

        // loading data should really be replicated here rather than read from a static mock variable, but it is proving to be a little too complex to do. Just using the static mock for now, might need to create a few scripts to automatically update it

    })

    test('Page should have as many cards as there are buzzwords', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const buzzCards = await page.getByTestId('buzzword-card').all();
        expect(buzzCards.length).toEqual(buzzwords.length);
    });

    test('Page should have as many tag selectors as there are tags', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const tagChips = await page.getByTestId('tags-chip').all();
        expect(tagChips.length).toEqual(listTags.length);
    });

    test('Page should have as many author selectors as there are authors', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const authorChips = await page.getByTestId('authors-chip').all();
        expect(authorChips.length).toEqual(listAuthors.length);
    });

    test('Each buzzword-card should contain at least a buzzword-content', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const buzzCards = await page.getByTestId('buzzword-card').all();
        for (let card of buzzCards) {
            expect(card.getByTestId('buzzword-content')).toBeVisible();
        }
    });

    test('Each buzzword-card should contain the correct tags', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const buzzCards = await page.getByTestId('buzzword-card').all();
        for (let card of buzzCards) {
            let id = await card.getAttribute('id');
            let originalData = buzzwords.find((buzz) => buzz.id === id);
            let displayTags = await card.getByTestId('chip-tag').allInnerTexts();
            if (originalData.tags) {
                // If the buzzword has tags, each tag should match the original data tags
                expect(displayTags.map((tag) => tag.toLowerCase()).sort()).toEqual(originalData.tags.sort());
            } else {
                // If the buzzword does not have tags, it should not show any tags
                expect(displayTags).toEqual([]);
            }
        }
    });

    test('Each buzzword-card should contain the correct date', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const buzzCards = await page.getByTestId('buzzword-card').all();
        for (let card of buzzCards) {
            let id = await card.getAttribute('id');
            let originalData = buzzwords.find((buzz) => buzz.id === id);
            if (originalData.date) {
                let displayDate = await card.getByTestId('buzzword-date').textContent();
                let expectedDate = new Date(originalData.date);
                let expectedDateString = `${daysOfTheWeek[expectedDate.getDay()]}, ${expectedDate.getDate()} of ${monthsOfTheYear[expectedDate.getMonth()]} ${expectedDate.getFullYear()}`
                expect(displayDate).toEqual(expectedDateString);
            } else {
                await expect(card.getByTestId('buzzword-date')).toHaveCount(0);
            }
        }
    });

    test('Each buzzword-card should contain the correct author', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        const buzzCards = await page.getByTestId('buzzword-card').all();
        for (let card of buzzCards) {
            let id = await card.getAttribute('id');
            let originalData = buzzwords.find((buzz) => buzz.id === id);
            if (originalData.author) {
                let displayAuthor = await card.getByTestId('buzzword-byline').textContent();
                expect(displayAuthor.toLowerCase()).toMatch(`by ${originalData.author}`);
            } else {
                await expect(card.getByTestId('buzzword-byline')).toHaveCount(0);
            }
        }
    });

    test('Each buzzword that contains an image has the image displayed', async ({ page }) => {
        await expect(page).toHaveURL('/content/connections');
        // regex to find md image insertion
        const regex = /(?<alt>!\[[^\]]*\])\((?<filename>.*?)(?=\"|\))\)/
        let buzzImage = buzzwords.filter((buzz) => buzz.content.match(regex));
        let cards = await page.getByTestId('buzzword-card').all();
        for (let buzz of buzzImage) {
            // for each buzz that should contain an image
            let card;
            for (let c of cards) {
                // find the card that contains the buzz with image
                let tmpId = await c.getAttribute('id');
                if (tmpId === buzz.id) {
                    card = c;
                    break;
                }
            }
            // find all images in each buzzword
            let regexGlobal = /(?<alt>!\[[^\]]*\])\((?<filename>.*?)(?=\"|\))\)/g
            let imgs = [...buzz.content.matchAll(regexGlobal)];
            for (let img of imgs) {
                // for each expected img, ensure the image exists

                // gets alt text without md syntax
                const altText = img.groups.alt.slice(2, -1);
                const imgSrc = img.groups.filename;
                const imgEl = card.getByAltText(altText);

                // image should be visible and should have the same path
                expect(imgEl).toBeVisible();
                expect(await imgEl.getAttribute('src')).toEqual(imgSrc);
            }
        }
    })
})

test.describe('Page user interactions tests', () => {
    test.beforeEach('Open start URL and load data from files', async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        await page.goto('/content/connections');

        // loading data should really be replicated here rather than read from a static mock variable, but it is proving to be a little too complex to do. Just using the static mock for now, might need to create a few scripts to automatically update it

    })

    test.describe('Test interaction with tags filter', () => {
        test('Clicking one of the filter tags should reduce the number of visible buzzword cards', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');
            const buzzCards = await page.getByTestId('buzzword-card').all();
            const nrBuzzCards = buzzCards.length;
    
            const button = page.getByRole('button', { name: 'bee-keeping' });
    
            await button.click();
    
            const reducedBuzzCards = await page.getByTestId('buzzword-card').all();
            const nrReducedBuzzCards = reducedBuzzCards.length;
    
            expect(nrBuzzCards).toBeGreaterThan(nrReducedBuzzCards);
        });
    
        test('Clicking on one of the filter tags should reduce the number of available filter tags', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');
    
            const buttons = await page.getByTestId('tags-chip').all()
            let nrStartingDisabledButtons = 0;
            for (let button of buttons ) {
                if(await button.isDisabled()) {
                    nrStartingDisabledButtons += 1;
                }
            }
    
            const button = page.getByRole('button', { name: 'bee-keeping' });
    
            await button.click();
    
            let nrEndingDisabledButtons = 0;
            for (let button of buttons ) {
                if(await button.isDisabled()) {
                    nrEndingDisabledButtons += 1;
                }
            }
    
            console.log(nrEndingDisabledButtons);
    
            expect(nrStartingDisabledButtons).toBeLessThan(nrEndingDisabledButtons);
        });
    
        test('Clicking on one of the filter tags should activate the Reset button', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');
            const resetButtons = await page.getByTestId('tag-reset-button').all();
            let resetButton;
            for (let rb of resetButtons) {
                if(await rb.getAttribute('id') === 'tags-reset') {
                    resetButton = rb;
                }
            }
    
            expect(resetButton).toBeDisabled();
    
            const button = page.getByRole('button', { name: 'bee-keeping' });
    
            await button.click();
    
            expect(resetButton).toBeEnabled();
        });

        test('Clicking on one of the filter tags should activate the Reset All button', async({page}) => {
            await expect(page).toHaveURL('/content/connections');
            const resetAllButton = await page.getByRole('button', {name: 'Reset all'});

            expect(resetAllButton).toBeDisabled();

            const button = page.getByRole('button', { name: 'bee-keeping' });
            await button.click();

            expect(resetAllButton).toBeEnabled();
        })

        test('Clicking on one of the filter tags should reduce the number of available author filters', async({page}) => {
            await expect(page).toHaveURL('/content/connections');
            const authorFilters = await page.getByTestId('authors-chip').all()
            let nrStartingAuthorFiltersActive = 0;

            for (let a of authorFilters) {
                if (await a.isEnabled()) {
                    nrStartingAuthorFiltersActive += 1;
                }
            }

            const button = page.getByRole('button', { name: 'technology' });
            await button.click();
            
            let nrEndingAuthorFiltersActive = 0;
            for (let a of authorFilters) {
                if (await a.isEnabled()) {
                    nrEndingAuthorFiltersActive += 1;
                }
            }
            
            expect(nrStartingAuthorFiltersActive).toBeGreaterThan(nrEndingAuthorFiltersActive);
        });

        test('Clicking on one of the filter tags should result in displaying the expected buzzword cards', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            const buttonToPress = 'technology';
            const expectedBuzzwords = buzzwords.filter((e) => {
                if (new Array(e.tags).flat().includes(buttonToPress)) {
                    return e;
                };
            });

            console.log(expectedBuzzwords);
            // NEED TO CHECK BUZZ IDS DISPLAYED ARE THE SAME AS THE ONE IN THIS VAR
        })
    });
});
