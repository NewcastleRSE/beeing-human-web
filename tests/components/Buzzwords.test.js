import {cleanup, render, screen} from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

import Buzzwords from '../../src/lib/Buzzwords.svelte';

describe('Load and display Buzzwords', () => {
    afterEach(()=> cleanup());

    it('should be able to mount the component without any data', ()=> {
        const container = render(Buzzwords, {buzzwords: '', listTags: '', listAuthors: ''});
        expect(container).toBeTruthy();
    });

    it('should display an error if no data is passed', async ()=> {
        render(Buzzwords, {buzzwords: '', listTags: '', listAuthors:''});
        const errorMessage = await screen.findByText('Error: Something went wrong.', {exact: false});
        expect(errorMessage).toBeTruthy();
    });

})