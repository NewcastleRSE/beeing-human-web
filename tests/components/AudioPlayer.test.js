import { beforeEach, describe, expect, it, afterEach } from "vitest";
import {render, cleanup} from '@testing-library/svelte';

// Component to be tested
import AudioPlayer from '../../src/lib/AudioPlayer.svelte';

describe("AudioPlayer component", ()=> {

    afterEach(() => cleanup())

    it('Should be able to mount the audio player', () => {
        const container = render(AudioPlayer, {audioPath: "{base}/content/music/media/virtualbarbershop.mp3"});
        expect(container).toBeTruthy();
    })
})