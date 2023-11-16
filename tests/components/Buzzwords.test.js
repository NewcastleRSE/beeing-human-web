import {cleanup, render, screen} from '@testing-library/svelte';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import Buzzwords from '../../src/lib/Buzzwords.svelte';

import { buzzwords, listAuthors, listTags } from '../mocks/mockVarsBuzzwords';

describe('Load and display Buzzwords', () => {
    
    afterEach(()=> cleanup());

    beforeAll(() => {
        // MAKE THIS AVAILABLE FOR THE TEST SHOULD SOLVE IT
        formated_buzzwords = buzzwords.map((buzz) => {
            return {...buzz, date: new Date(buzz.date)}
        })
    })

    it('should be able to mount the component without any data', ()=> {
        const container = render(Buzzwords, {buzzwords: '', listTags: '', listAuthors: ''});
        expect(container).toBeTruthy();
    });

    it('should display an error if no data is passed', async ()=> {
        render(Buzzwords, {buzzwords: '', listTags: '', listAuthors:''});
        const errorMessage = await screen.findByText('Error: Something went wrong.', {exact: false});
        expect(errorMessage).toBeTruthy();
    });

    it('should display the collection of buzzwords when the required data is passed', async () => {
        render(Buzzwords, {buzzwords: formatted_buzzwords, listTags: listTags, listAuthors: listAuthors});
        const container = await screen.findByTestId('card-collection');
        expect(container).toBeTruthy();
    });

    // it('should be able to display at least one card for a buzzword')

})