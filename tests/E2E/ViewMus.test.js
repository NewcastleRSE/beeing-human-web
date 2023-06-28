import { expect, test } from "@playwright/test";

test('Page loads and has expected option', async({page}) => {
    await page.goto("/");
    await expect(page.getByText('Music')).toBeVisible();
});

test('Selecting Music and pressing go sends the user to the correct page', async({page}) => {
    await page.goto("/");
    await page.getByText('Music').click();
    await expect(page.getByText('Music')).toBeChecked();
    await page.getByRole('link', { name: 'Go' }).click();
    await page.waitForURL('**/music');
    await expect(page).toHaveURL('/content/music');
});

test('Music content page should have a header containing music', async({page}) => {
    await page.goto("/content/music");
    await expect(page.getByRole("heading", {name: 'Music Test'})).toBeVisible();
});

test('Expect content page to have several sections', async({page}) => {
    await page.goto("/content/music");
    const headings = await page.getByRole('heading').allInnerTexts();
    expect(headings.length).toBeGreaterThan(1);
});

test('Expect music view to have a media player element', async({page}) => {
    await page.goto('/content/music');
    await Promise.all([
        page.locator('audio').waitFor('visible'),
        expect(page.locator('audio')).toBeVisible()
    ]);
});

test('Expect music view to have an SVG element', async({page}) => {
    await page.goto('/content/music');
    const svg = page.getByText('Engraved by Verovio 3.15.0-5abc7c0 g.page-margin{font-family:Times;} g.ending, g');
    expect(svg).toBeVisible;
});

test('Expect Paginator to have been created', async({page}) => {
    await page.goto('/content/music');
    const paginator = page.getByTestId('paginator');
    expect(paginator).toBeVisible();
});

test('Next button should exist', async({page}) => {
    await page.goto('/content/music');
    const nxtButton = page.getByTestId('btn-nxt');
    expect(nxtButton).toBeVisible();
});

test('The previous button should not exist on the first page', async({page}) => {
    await page.goto('/content/music');
    const prevButton = page.getByTestId('btn-prev');
    expect(prevButton).not.toBeVisible();
});

test('Pressing the next button should change the page and make the previous button visible', async({page}) => {
    await page.goto('/content/music');
    const nxtButton = page.getByTestId('btn-nxt');
    await nxtButton.click();
    const prevButton = page.getByTestId('btn-prev');
    expect(prevButton).toBeVisible();
});

test('Pressing the prev button should send you back to the first page', async({page}) => {
    await page.goto('/content/music');
    const nxtButton = page.getByTestId('btn-nxt');
    await nxtButton.click();
    const prevButton = page.getByTestId('btn-prev');
    prevButton.click();
    await expect(prevButton).not.toBeVisible();
});

test('Music page should have a midi player', async({page}) => {
    await page.goto('/content/music');
    const timeSlider = page.getByTestId('range-slider');
    await expect(timeSlider).toBeVisible({timeout: 15000});
});

test('Playing the midi player should change the color of notes', async({page}) => {
    await page.goto('/content/music');
    const timeSlider = page.getByTestId('range-slider');
    await expect(timeSlider).toBeVisible({timeout: 15000});
    const startButton = page.locator('#playMIDI');
    startButton.click();
    await expect(page.locator('.note-playing')).toBeVisible();
});

test('Stopping midi playback should clear note highlighting', async({page}) => {
    await page.goto('/content/music');
    const timeSlider = page.getByTestId('range-slider');
    await expect(timeSlider).toBeVisible({timeout: 15000});
    const startButton = page.locator('#playMIDI');
    startButton.click();
    await expect(page.locator('.note-playing')).toBeVisible();
    const stopButton = page.locator('#stopMIDI');
    stopButton.click();
    await expect(page.locator('.note-playing')).not.toBeVisible();
});

test('Selecting any point on the range slider, then starting MIDI playback should automatically change the svg page', async({page}) => {
    await page.goto('/content/music');
    const timeSlider = page.getByTestId('range-slider');
    await expect(timeSlider).toBeVisible({timeout: 15000});
    timeSlider.click({position: {x: 587, y: 9}, force: true});
    const startButton = page.locator('#playMIDI');
    startButton.click();
    await expect(page.getByTestId('btn-prev')).toBeVisible();
});

// Ideally, we would be able to test if audio is playing, but currently does not seem to be a way of doing it
