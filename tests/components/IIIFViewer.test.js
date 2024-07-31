import {cleanup, render, screen} from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

import IIIFViewer from '../../src/lib/IIIFViewer.svelte'

describe('IIIF Viewer mounting tests', () => {
    afterEach(() => cleanup());

    it('should be able to mount the component', async () => {
        const container = render(IIIFViewer);
        expect(container).toBeTruthy();
    });

})