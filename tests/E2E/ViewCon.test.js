import { expect, test } from "@playwright/test";

import { buzzwords, listAuthors, listTags } from '../mocks/mockVarsBuzzwords'
import { daysOfTheWeek, monthsOfTheYear } from '../../src/utils/generalConstants'
import { get } from "svelte/store";
import { getByTestId } from "@testing-library/svelte";

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
        const buzzCards = (await page.getByTestId('buzzword-card').all()).length;
        expect(buzzCards).toEqual(buzzwords.length);
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
            await expect(card.getByTestId('buzzword-content')).toBeVisible();
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
    
            const reducedBuzzCards = (await page.getByTestId('buzzword-card').all()).length;
    
            expect(nrBuzzCards).toBeGreaterThan(reducedBuzzCards);
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
    
            await expect(resetButton).toBeEnabled();
        });

        test('Clicking on one of the filter tags should activate the Reset All button', async({page}) => {
            await expect(page).toHaveURL('/content/connections');
            const resetAllButton = await page.getByRole('button', {name: 'Reset all'});

            expect(resetAllButton).toBeDisabled();

            const button = page.getByRole('button', { name: 'bee-keeping' });
            await button.click();

            await expect(resetAllButton).toBeEnabled();
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

            // gets ids for expected cards
            const buttonToPress = 'technology';
            let expectedBuzzwords = buzzwords.filter((e) => {
                if (new Array(e.tags).flat().includes(buttonToPress)) {
                    return e;
                };
            });
            expectedBuzzwords = expectedBuzzwords.map((e) => (e.id));

            // click button
            const button = page.getByRole('button', { name: buttonToPress });
            await button.click();
            
            // gets ids for displayed cards
            const buzzCards = await page.getByTestId('buzzword-card').all();
            let buzzIds = [];
            for (let card of buzzCards) {
                buzzIds.push(await card.getAttribute('id'));
            }

            expect(buzzIds.sort()).toEqual(expectedBuzzwords.sort());
        });

        test('Clicking on two of the filter tags should only display buzzwords that contain both tags', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            // get ids for expected cards
            const buttonsToPress = ['technology', 'literature'];
            let expectedBuzzwords = buzzwords.filter((e) => {
                const array = new Array(e.tags).flat();
                    if (array.includes(buttonsToPress[0]) && array.includes(buttonsToPress[1])) {
                        return e;
                    }
                })
            expectedBuzzwords = expectedBuzzwords.map((e) => (e.id))
            
            // click buttons
            for (let b of buttonsToPress) {
                const button = page.getByRole('button', {name: b});
                await button.click();
            }

            // get ids for displayed cards
            const buzzCards = await page.getByTestId('buzzword-card').all();
            let buzzIds = [];
            for (let card of buzzCards) {
                buzzIds.push(await card.getAttribute('id'));
            }

            expect(expectedBuzzwords.sort()).toEqual(buzzIds.sort());
        });

        test('Clicking the same button twice should return the number of buzzwords to the initial value', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            let initialBuzzwords = await page.getByTestId('buzzword-card').all();

            // First click
            const button = page.getByRole('button', {name: 'technology'});
            await button.click();

            let currentBuzzwords = await page.getByTestId('buzzword-card').all();

            expect(currentBuzzwords.length).toBeLessThan(initialBuzzwords.length);

            // Second click
            await button.click();

            currentBuzzwords = await page.getByTestId('buzzword-card').all();

            expect(currentBuzzwords.length).toEqual(initialBuzzwords.length);
            
        });

        test('Clicking the same button twice should reactivate all tag buttons and deactivate the reset buttons', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            const authorChips = await page.getByTestId('authors-chip').all();
            const tagsChips = await page.getByTestId('tags-chip').all();

            let currentActive = 0;
            for (let author of authorChips) {
                if (author.isEnabled()) {
                    currentActive += 1;
                }
            }
            for (let tag of tagsChips) {
                if (tag.isEnabled()) {
                    currentActive += 1;
                }
            }

            // count nr of active chips before action
            const initialActive = currentActive;

            // first click
            const button = page.getByRole('button', {name: 'technology'});
            await button.click();

            // count nr of active chips after action
            for (let author of authorChips) {
                if (author.isDisabled()) {
                    currentActive -= 1;
                }
            }
            for (let tag of tagsChips) {
                if (tag.isDisabled()) {
                    currentActive -= 1;
                }
            };

            const resetButtons = await page.getByTestId('tag-reset-button').all();
            const resetAllButton = page.getByRole('button', {name: 'Reset all'});

            expect(currentActive).toBeLessThan(initialActive);
            
            // check that reset button for tags is active
            for (let b of resetButtons) {
                if (b.getAttribute('id') === 'tags-reset') {
                    expect(b).toBeEnabled();
                }
            }
            expect(resetAllButton).toBeEnabled();

            // second click
            await button.click();

            // count nr of active chips after action
            currentActive = 0;
            for (let author of authorChips) {
                if (await author.isEnabled()) {
                    currentActive += 1;
                }
            }
            for (let tag of tagsChips) {
                if (await tag.isEnabled()) {
                    currentActive += 1;
                }
            }

            expect(currentActive).toEqual(initialActive);
            for (let b of resetButtons) {
                await expect(b).toBeDisabled();
            }
            await expect(resetAllButton).toBeDisabled();
            
        });

        test('Clicking on the reset button should return everything to its initial state', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            let initialCountAuthors = 0;
            let initialCountTags = 0;
            const initialBuzzwords = (await page.getByTestId('buzzword-card').all()).length;

            let authorChips = await page.getByTestId('authors-chip').all();
            let tagsChips = await page.getByTestId('tags-chip').all();

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    initialCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    initialCountTags++;
                }
            }

            // first click
            await page.getByRole('button', {name: 'technology'}).click();
            const firstCountBuzzwords = (await page.getByTestId('buzzword-card').all()).length

            let firstClickAuthors = 0;
            let firstClickTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    firstClickAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    firstClickTags++;
                }
            }

            expect(firstCountBuzzwords).toBeLessThan(initialBuzzwords);
            expect(firstClickAuthors).toBeLessThan(initialCountAuthors);
            expect(firstClickTags).toBeLessThan(initialCountTags);

            // reset
            const resetButtons = await page.getByTestId('tag-reset-button').all();
            for (let rb of resetButtons) {
                if (await rb.getAttribute('id') === 'tags-reset') {
                    await rb.click();
                    break;
                }
            }

            const finalCountBuzzwords = (await page.getByTestId('buzzword-card').all()).length
            let finalCountAuthors = 0;
            let finalCountTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    finalCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    finalCountTags++;
                }
            }

            expect(finalCountBuzzwords).toEqual(initialBuzzwords);
            expect(finalCountAuthors).toEqual(initialCountAuthors);
            expect(finalCountTags).toEqual(initialCountTags);
        });

        test('Clicking on the reset all button should return everything to its initial state', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            let initialCountAuthors = 0;
            let initialCountTags = 0;
            const initialBuzzwords = (await page.getByTestId('buzzword-card').all()).length;

            let authorChips = await page.getByTestId('authors-chip').all();
            let tagsChips = await page.getByTestId('tags-chip').all();

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    initialCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    initialCountTags++;
                }
            }

            // first click
            await page.getByRole('button', {name: 'technology'}).click();
            const firstCountBuzzwords = (await page.getByTestId('buzzword-card').all()).length

            let firstClickAuthors = 0;
            let firstClickTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    firstClickAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    firstClickTags++;
                }
            }

            expect(firstCountBuzzwords).toBeLessThan(initialBuzzwords);
            expect(firstClickAuthors).toBeLessThan(initialCountAuthors);
            expect(firstClickTags).toBeLessThan(initialCountTags);

            // reset
            await page.getByRole('button', {name: 'Reset all'}).click();

            const finalCountBuzzwords = (await page.getByTestId('buzzword-card').all()).length
            let finalCountAuthors = 0;
            let finalCountTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    finalCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    finalCountTags++;
                }
            }

            expect(finalCountBuzzwords).toEqual(initialBuzzwords);
            expect(finalCountAuthors).toEqual(initialCountAuthors);
            expect(finalCountTags).toEqual(initialCountTags);
        });
    });

    test.describe('Test interaction with author filters', async () => {

        test('Clicking on one of the author tags should reduce the number of visible buzzcards', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            let buzzCards = await page.getByTestId('buzzword-card').all();

            const initialCount = buzzCards.length
            
            const button = page.getByRole('button', {name: 'Tiago'})
            await button.click();

            buzzCards = await page.getByTestId('buzzword-card').all();

            expect(buzzCards.length).toBeLessThan(initialCount);
        });

        test('Clicking on one of the author tags should reduce the number of available tag chips', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            let filterChips = await page.getByTestId('tags-chip').all();
            let initialActive = 0;
            for (let chip of filterChips) {
                expect(chip).toBeEnabled();
                if (chip.isEnabled()) {
                    initialActive++;
                }
            };

            // click button
            const button = page.getByRole('button', {name: 'Tiago'});
            await button.click();

            let finalActive = 0;
            for (let chip of filterChips) {
                if (await chip.isEnabled()) {
                    finalActive++;
                }
            }

            expect(finalActive).toBeLessThan(initialActive);
        });

        test('Clicking on one of the author filters should enable the reset button', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            const resetButtons = await page.getByTestId('tag-reset-button').all();

            let rb;
            for (let b of resetButtons) {
                if (await b.getAttribute('id') === 'authors-reset') {
                    rb = b;
                }
            }

            // checks the button is disabled at the start
            await expect(rb).toBeDisabled();

            // get the button and press it
            await page.getByRole('button', {name: 'tiago'}).click();
            await expect(rb).toBeEnabled();
        });

        test('Clicking on one of the author tags should activate the Reset All button', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            let resetButton = page.getByRole('button', {name: 'Reset all'});
            expect(resetButton).toBeDisabled();

            await page.getByRole('button', {name: 'Tiago'}).click();
            await expect(resetButton).toBeEnabled();
        });

        test('Clicking in more than one author tags should add available filter tags', async({page}) => {
            await expect(page).toHaveURL('/content/connections');
            
            // initial
            let initialCount = 0;
            let filterChips = await page.getByTestId('tags-chip').all();
            for (let chip of filterChips) {
                if(await chip.isEnabled()) {
                    initialCount++;
                }
            }

            // first button, should reduce nr of available tag chips
            await page.getByRole('button', {name: 'Tiago'}).click();
            let firstClickCount = 0;
            for (let chip of filterChips) {
                if (await chip.isEnabled()) {
                    firstClickCount++;
                }
            }
            expect(firstClickCount).toBeLessThan(initialCount);

            // second button, should be more than firstClickCount, but less than initialCount
            await page.getByRole('button', {name: 'Magnus'}).click();
            let finalCount = 0;
            for (let chip of filterChips) {
                if (await chip.isEnabled()) {
                    finalCount++;
                }
            }
            expect(finalCount).toBeLessThan(initialCount);
            expect(finalCount).toBeGreaterThan(firstClickCount);
        });

        test('Clicking on one of the author tags should result in the expected buzzwords beeing displayed', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            // gets ids for expected cards
            const buttonToPress = 'tiago';
            let expectedBuzzwords = buzzwords.filter((e) => {
                if (e.author === buttonToPress) {
                    return e;
                };
            });

            expectedBuzzwords = expectedBuzzwords.map((e) => (e.id));

            await page.getByRole('button', {name: buttonToPress}).click();

            const pageBuzzwords = await page.getByTestId('buzzword-card').all();

            const displayedBuzzwords = [];
            for (let buzz of pageBuzzwords) {
                displayedBuzzwords.push(await buzz.getAttribute('id'));
            }

            expect(displayedBuzzwords.sort()).toEqual(expectedBuzzwords.sort());
        });

        test('Clicking on two of the author tags should result in the expected buzzwords beeing displayed', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            // gets ids for expected cards
            const buttonToPress = ['tiago', 'jenny'];
            let expectedBuzzwords = buzzwords.filter((e) => {
                if (buttonToPress.includes(e.author)) {
                    return e;
                };
            });
            expectedBuzzwords = expectedBuzzwords.map((e) => (e.id));

            for (let button of buttonToPress) {
                await page.getByRole('button', {name: button}).click();
            }

            const pageBuzzwords = await page.getByTestId('buzzword-card').all();

            const displayedBuzzwords = [];
            for (let buzz of pageBuzzwords) {
                displayedBuzzwords.push(await buzz.getAttribute('id'));
            }

            expect(displayedBuzzwords.sort()).toEqual(expectedBuzzwords.sort());
        })

        test('Clicking the same button twice should return the number of buzzwords to the initial value', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            let initialBuzzwords = (await page.getByTestId('buzzword-card').all()).length;

            // First click
            const button = page.getByRole('button', {name: 'tiago'});
            await button.click();

            let currentBuzzwords = (await page.getByTestId('buzzword-card').all()).length;

            expect(currentBuzzwords).toBeLessThan(initialBuzzwords);

            // Second click
            await button.click();

            currentBuzzwords = (await page.getByTestId('buzzword-card').all()).length;

            expect(currentBuzzwords).toEqual(initialBuzzwords);
            
        });

        test('Clicking the same button twice should reactivate all tag buttons and deactivate the reset buttons', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            const authorChips = await page.getByTestId('authors-chip').all();
            const tagsChips = await page.getByTestId('tags-chip').all();

            let currentActive = 0;
            for (let author of authorChips) {
                if (author.isEnabled()) {
                    currentActive += 1;
                }
            }
            for (let tag of tagsChips) {
                if (tag.isEnabled()) {
                    currentActive += 1;
                }
            }

            // count nr of active chips before action
            const initialActive = currentActive;

            // first click
            const button = page.getByRole('button', {name: 'tiago'});
            await button.click();

            // count nr of active chips after action
            for (let author of authorChips) {
                if (author.isDisabled()) {
                    currentActive -= 1;
                }
            }
            for (let tag of tagsChips) {
                if (tag.isDisabled()) {
                    currentActive -= 1;
                }
            };

            const resetButtons = await page.getByTestId('tag-reset-button').all();
            const resetAllButton = page.getByRole('button', {name: 'Reset all'});

            expect(currentActive).toBeLessThan(initialActive);
            
            // check that reset button for tags is active
            for (let b of resetButtons) {
                if (b.getAttribute('id') === 'authors-reset') {
                    expect(b).toBeEnabled();
                }
            }
            expect(resetAllButton).toBeEnabled();

            // second click
            await button.click();

            // count nr of active chips after action
            currentActive = 0;
            for (let author of authorChips) {
                if (await author.isEnabled()) {
                    currentActive += 1;
                }
            }
            for (let tag of tagsChips) {
                if (await tag.isEnabled()) {
                    currentActive += 1;
                }
            }

            expect(currentActive).toEqual(initialActive);
            for (let b of resetButtons) {
                await expect(b).toBeDisabled();
            }
            await expect(resetAllButton).toBeDisabled();
            
        });

        test('Clicking on the reset button should return everything to its initial state', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            let initialCountAuthors = 0;
            let initialCountTags = 0;
            const initialBuzzwords = (await page.getByTestId('buzzword-card').all()).length;

            let authorChips = await page.getByTestId('authors-chip').all();
            let tagsChips = await page.getByTestId('tags-chip').all();

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    initialCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    initialCountTags++;
                }
            }

            // first click
            await page.getByRole('button', {name: 'tiago'}).click();
            const firstCountBuzzwords = (await page.getByTestId('buzzword-card').all()).length

            let firstClickAuthors = 0;
            let firstClickTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    firstClickAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    firstClickTags++;
                }
            }

            expect(firstCountBuzzwords).toBeLessThan(initialBuzzwords);
            expect(firstClickAuthors).toEqual(initialCountAuthors);
            expect(firstClickTags).toBeLessThan(initialCountTags);

            // reset
            const resetButtons = await page.getByTestId('tag-reset-button').all();
            for (let rb of resetButtons) {
                if (await rb.getAttribute('id') === 'authors-reset') {
                    await rb.click();
                    break;
                }
            }

            const finalCountBuzzwords = (await page.getByTestId('buzzword-card').all()).length
            let finalCountAuthors = 0;
            let finalCountTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    finalCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    finalCountTags++;
                }
            }

            expect(finalCountBuzzwords).toEqual(initialBuzzwords);
            expect(finalCountAuthors).toEqual(initialCountAuthors);
            expect(finalCountTags).toEqual(initialCountTags);
        });

        test('Clicking on the reset all button should return everything to its initial state', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            let initialCountAuthors = 0;
            let initialCountTags = 0;
            const initialBuzzwords = (await page.getByTestId('buzzword-card').all()).length;

            let authorChips = await page.getByTestId('authors-chip').all();
            let tagsChips = await page.getByTestId('tags-chip').all();

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    initialCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    initialCountTags++;
                }
            }

            // first click
            await page.getByRole('button', {name: 'tiago'}).click();
            const firstCountBuzzwords = (await page.getByTestId('buzzword-card').all()).length

            let firstClickAuthors = 0;
            let firstClickTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    firstClickAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    firstClickTags++;
                }
            }

            expect(firstCountBuzzwords).toBeLessThan(initialBuzzwords);
            expect(firstClickAuthors).toEqual(initialCountAuthors);
            expect(firstClickTags).toBeLessThan(initialCountTags);

            // reset
            await page.getByRole('button', {name: 'Reset all'}).click();

            const finalCountBuzzwords = (await page.getByTestId('buzzword-card').all()).length
            let finalCountAuthors = 0;
            let finalCountTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    finalCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    finalCountTags++;
                }
            }

            expect(finalCountBuzzwords).toEqual(initialBuzzwords);
            expect(finalCountAuthors).toEqual(initialCountAuthors);
            expect(finalCountTags).toEqual(initialCountTags);
        });
    });

    test.describe('Test interaction with search bar', () => {
        
        test('Searching for something in the author bar should reduce the number of available buzzwords', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');
            
            const initialBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length;

            await page.getByRole('searchbox').fill('office');
            await page.getByTestId('search-bar-container').getByRole('button', { name: 'Go' }).click();

            const finalBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length;

            expect(finalBuzzwordCount).toBeLessThan(initialBuzzwordCount);
        });

        test('Searching for something in the author bar should reduce the number of available filter tags but keep the same number of filter authors', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            const initialBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length

            const authorChips = await page.getByTestId('authors-chip').all();
            const tagsChips = await page.getByTestId('tags-chip').all();

            let initialCountAuthors = 0;
            let initialCountTags = 0;
            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    initialCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    initialCountTags++;
                }
            }

            await page.getByRole('searchbox').fill('office');
            await page.getByTestId('search-bar-container').getByRole('button', { name: 'Go' }).click();

            const finalBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length

            let finalCountAuthors = 0;
            let finalCountTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    finalCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    finalCountTags++;
                }
            }

            expect(finalBuzzwordCount).toBeLessThan(initialBuzzwordCount);
            expect(finalCountAuthors).toEqual(initialCountAuthors);
            expect(finalCountTags).toBeLessThan(initialCountTags);

        });

        test('Searching for nothing should reset the buzzwords to their initial state', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            const initialBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length;

            const searchBox = page.getByRole('searchbox')
            const goButton = page.getByTestId('search-bar-container').getByRole('button', { name: 'Go' });

            await searchBox.fill('office');
            await goButton.click();

            const firstSearchBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length;

            expect(firstSearchBuzzwordCount).toBeLessThan(initialBuzzwordCount);

            await searchBox.fill('');
            await goButton.click();

            const finalSearchBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length;

            expect(finalSearchBuzzwordCount).toBeGreaterThan(firstSearchBuzzwordCount);
            expect(finalSearchBuzzwordCount).toEqual(initialBuzzwordCount);

        });

        test('Searching for nothing should reset all buttons to their initial state', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            const initialBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length

            const authorChips = await page.getByTestId('authors-chip').all();
            const tagsChips = await page.getByTestId('tags-chip').all();

            let initialCountAuthors = 0;
            let initialCountTags = 0;
            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    initialCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    initialCountTags++;
                }
            }


            // first search
            const searchBox = page.getByRole('searchbox')
            const goButton = page.getByTestId('search-bar-container').getByRole('button', { name: 'Go' });

            await searchBox.fill('office');
            await goButton.click();

            const firstSearchBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length

            let firstSearchCountAuthors = 0;
            let firstSearchCountTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    firstSearchCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    firstSearchCountTags++;
                }
            }

            expect(firstSearchBuzzwordCount).toBeLessThan(initialBuzzwordCount);
            expect(firstSearchCountAuthors).toEqual(initialCountAuthors);
            expect(firstSearchCountTags).toBeLessThan(initialCountTags);

            // final search
            await searchBox.fill('');
            await goButton.click();

            const finalBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length

            let finalCountAuthors = 0;
            let finalCountTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    finalCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    finalCountTags++;
                }
            }

            expect(finalBuzzwordCount).toBeGreaterThan(firstSearchBuzzwordCount);
            expect(finalCountAuthors).toEqual(firstSearchCountAuthors);
            expect(finalCountTags).toBeGreaterThan(firstSearchCountTags);
            expect(finalBuzzwordCount).toEqual(initialBuzzwordCount);
            expect(finalCountAuthors).toEqual(initialCountAuthors);
            expect(finalCountTags).toEqual(initialCountTags);
        });

        test('Clicking the Reset all button should reset all buttons to their initial state and clear the searchBox', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            const initialBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length

            const authorChips = await page.getByTestId('authors-chip').all();
            const tagsChips = await page.getByTestId('tags-chip').all();

            let initialCountAuthors = 0;
            let initialCountTags = 0;
            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    initialCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    initialCountTags++;
                }
            }


            // first search
            const searchBox = page.getByRole('searchbox')
            const goButton = page.getByTestId('search-bar-container').getByRole('button', { name: 'Go' });

            await searchBox.fill('office');
            await goButton.click();

            const firstSearchBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length

            let firstSearchCountAuthors = 0;
            let firstSearchCountTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    firstSearchCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    firstSearchCountTags++;
                }
            }

            expect(firstSearchBuzzwordCount).toBeLessThan(initialBuzzwordCount);
            expect(firstSearchCountAuthors).toEqual(initialCountAuthors);
            expect(firstSearchCountTags).toBeLessThan(initialCountTags);

            // reset all
            await page.getByRole('button', {name: 'Reset all'}).click();

            const finalBuzzwordCount = (await page.getByTestId('buzzword-card').all()).length

            let finalCountAuthors = 0;
            let finalCountTags = 0;

            for (let chip of authorChips) {
                if (await chip.isEnabled()) {
                    finalCountAuthors++;
                }
            }
            for (let chip of tagsChips) {
                if (await chip.isEnabled()) {
                    finalCountTags++;
                }
            }

            expect(finalBuzzwordCount).toBeGreaterThan(firstSearchBuzzwordCount);
            expect(finalCountAuthors).toEqual(firstSearchCountAuthors);
            expect(finalCountTags).toBeGreaterThan(firstSearchCountTags);
            expect(finalBuzzwordCount).toEqual(initialBuzzwordCount);
            expect(finalCountAuthors).toEqual(initialCountAuthors);
            expect(finalCountTags).toEqual(initialCountTags);
            await expect(searchBox).toHaveValue('');
        });

        test('Searching for something that does not exist should display the correct error message', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            await page.getByRole('searchbox').fill('a;lskdjf;oawijef;olanw');
            await page.getByTestId('search-bar-container').getByRole('button', { name: 'Go' }).click();

            await expect(page.getByText('No buzzwords match your criteria', {exact: false})).toBeVisible();
        });

        test('Searching for a specific search term should return the expected results', async ({page}) => {
            await expect(page).toHaveURL('/content/connections');

            const searchTerm = 'office';
            let expectedBuzzwords = buzzwords.filter((e) => {
                if (e.content.toLowerCase().includes(searchTerm)) {
                    return e;
                };
            });

            expectedBuzzwords = expectedBuzzwords.map((e) => (e.id));

            await page.getByRole('searchbox').fill(searchTerm);
            await page.getByTestId('search-bar-container').getByRole('button', { name: 'Go' }).click();

            const resultBuzzwords = await page.getByTestId('buzzword-card').all();

            expect(expectedBuzzwords.length).toEqual(resultBuzzwords.length);

            let resultBuzzwordsIds = [];
            for (let buzz of resultBuzzwords) {
                resultBuzzwordsIds.push(await buzz.getAttribute('id'));
            }

            expect(resultBuzzwordsIds.sort()).toEqual(expectedBuzzwords.sort());
        });
        // TESTS WITH CHIPS IN SEARCH BAR
    });
});
