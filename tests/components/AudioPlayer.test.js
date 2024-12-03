import { vi, describe, expect, it, afterEach } from "vitest";
import { render, cleanup } from '@testing-library/svelte';

// Component to be tested
import AudioPlayer from '../../src/lib/AudioPlayer.svelte';

// hoists the window.matchMedia method needed by one of the components inside AudioPlayer -> necessary for the test to pass.

vi.hoisted(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        enumerable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // deprecated
            removeListener: vi.fn(), // deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

    describe("AudioPlayer component", () => {

        afterEach(() => cleanup())

        it('Should be able to mount the audio player', () => {
            const container = render(AudioPlayer, { audioPath: "{base}/content/music/media/virtualbarbershop.mp3" });
            expect(container).toBeTruthy();
        })
    })