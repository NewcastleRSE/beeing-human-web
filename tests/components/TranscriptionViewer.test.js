import {cleanup, render, screen} from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

import TranscriptionViewer from '../../src/lib/TranscriptionViewer.svelte'



describe('Transcription Viewer mounting tests', () => {
    afterEach(() => cleanup());

    it('should be able to mount the component', async () => {
        const container = render(TranscriptionViewer);
        expect(container).toBeTruthy();
    });

    it('should contain both a transcription and image viewer', async () => {
        render(TranscriptionViewer);
        
        const iiifViewer = screen.getByTestId('iiif-viewer');
        expect(iiifViewer).toBeTruthy();
        
        const transcription = screen.getByTestId('transcription');
        expect(transcription).toBeTruthy();
    })

})