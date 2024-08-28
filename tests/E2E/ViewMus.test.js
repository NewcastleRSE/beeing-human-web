import { expect, test } from "@playwright/test";

test.describe('Page navigation tests', () => {
    test('Page loads and has expected option', async ({ page }) => {
        await page.goto("/");
        const hive = page.getByTestId('hive-desktop');
        await expect(hive).toBeVisible();
        const link = page.getByTestId('music-desktop');
        await expect(link).toBeVisible();
    });

    test('Clicking on music should send the user to the correct page', async ({ page }) => {
        await page.goto("/");
        const hive = page.getByTestId('hive-desktop');
        await expect(hive).toBeVisible();
        const link = page.getByTestId('music-desktop');
        await expect(link).toBeVisible();
        await link.click();
        await page.waitForURL('**/music');
        await expect(page).toHaveURL('/music');
    });
})

test.describe('Page content tests', () => {
    test.beforeEach('Open start URL', async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        await page.goto('/music');
    });

    test('Music content page should have a header containing music', async ({ page }) => {
        await expect(page).toHaveURL('/music');
        await expect(page.getByRole("heading", { name: 'Music', exact:true })).toBeVisible();
    });

    test('Expect content page to have several articles', async ({ page }) => {
        await expect(page).toHaveURL('/music');
        const articles = await page.getByRole('article').all();
        expect(articles.length).toBeGreaterThan(0);
    });  
})

test.describe('Page content tests - binaural playback', () => {
    test.beforeEach('Open start URL', async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        await page.goto('/music/binaural-recording');
    });

    test('Expect music view to have a media player element', async ({ page }) => {
        await expect(page).toHaveURL('/music/binaural-recording');
        await Promise.all([
            page.locator('audio').waitFor('visible'),
            expect(page.locator('audio')).toBeVisible()
        ]);
    });
});

test.describe('Page content tests - transcription', () => {
    test.beforeEach('Open start URL', async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        await page.goto('/music/music-transcription');
    });

    test('Expect music view to have an SVG element', async ({ page }) => {
        await expect(page).toHaveURL('/music/music-transcription');
        const svg = page.getByText('Engraved by Verovio 3.15.0-5abc7c0 g.page-margin{font-family:Times;} g.ending, g');
        expect(svg).toBeVisible;
    });
})

test.describe('Paginator tests', () => {
    test.beforeEach('Open start URL', async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        await page.goto('/music/music-transcription');
    });

    test('Expect Paginator to have been created', async ({ page }) => {
        await expect(page).toHaveURL('/music/music-transcription');
        const paginator = page.getByTestId('paginator');
        await expect(paginator).toBeVisible();
    });

    test('Next button should exist', async ({ page }) => {
        await expect(page).toHaveURL('/music/music-transcription');
        const nxtButton = page.getByTestId('btn-nxt');
        await expect(nxtButton).toBeVisible();
    });

    test('The previous button should not exist on the first page', async ({ page }) => {
        await expect(page).toHaveURL('/music/music-transcription');
        const prevButton = page.getByTestId('btn-prev');
        await expect(prevButton).not.toBeVisible();
    });

    test('Pressing the next button should change the page and make the previous button visible', async ({ page }) => {
        await expect(page).toHaveURL('/music/music-transcription');
        const nxtButton = page.getByTestId('btn-nxt');
        await nxtButton.click();
        const prevButton = page.getByTestId('btn-prev');
        await expect(prevButton).toBeVisible();
    });

    test('Pressing the prev button should send you back to the first page', async ({ page }) => {
        await expect(page).toHaveURL('/music/music-transcription');
        const nxtButton = page.getByTestId('btn-nxt');
        await nxtButton.click();
        const prevButton = page.getByTestId('btn-prev');
        prevButton.click();
        await expect(prevButton).not.toBeVisible();
    });
});

// MIDI player is currently not deployed
// test.describe('MIDI player tests', () => {
//     test('Music page should have a midi player', async ({ page }) => {
//         await page.goto('/music');
//         const timeSlider = page.getByTestId('range-slider');
//         await expect(timeSlider).toBeVisible({ timeout: 15000 });
//     });

//     test('Playing the midi player should change the color of notes', async ({ page }) => {
//         await page.goto('/music');
//         const timeSlider = page.getByTestId('range-slider');
//         await expect(timeSlider).toBeVisible({ timeout: 15000 });
//         const startButton = page.locator('#playMIDI');
//         startButton.click();
//         await expect(page.locator('.note-playing')).toBeVisible();
//     });

//     test('Stopping midi playback should clear note highlighting', async ({ page }) => {
//         await page.goto('/music');
//         const timeSlider = page.getByTestId('range-slider');
//         await expect(timeSlider).toBeVisible({ timeout: 15000 });
//         const startButton = page.locator('#playMIDI');
//         startButton.click();
//         await expect(page.locator('.note-playing')).toBeVisible();
//         const stopButton = page.locator('#stopMIDI');
//         stopButton.click();
//         await expect(page.locator('.note-playing')).not.toBeVisible();
//     });

//     test('Selecting any point on the range slider, then starting MIDI playback should automatically change the svg page', async ({ page }) => {
//         await page.goto('/music');
//         const timeSlider = page.getByTestId('range-slider');
//         await expect(timeSlider).toBeVisible({ timeout: 15000 });
//         timeSlider.click({ position: { x: 587, y: 9 }, force: true });
//         const startButton = page.locator('#playMIDI');
//         startButton.click();
//         await expect(page.getByTestId('btn-prev')).toBeVisible();
//     });

//     // Ideally, we would be able to test if audio is playing, but currently does not seem to be a way of doing it
// })
