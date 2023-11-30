import { afterEach, describe, expect, it } from "vitest";

import { cleanup } from "@testing-library/svelte";

import { shuffle, checkSearchTagsAuthors, fullTextSearch } from "../../src/utils/BuzzwordsHelper";

import { buzzwords } from "../mocks/mockVarsBuzzwords";

function formatDate(buzzwords) {
    buzzwords = buzzwords.map((buzz) => {
        return {...buzz, date: new Date(buzz.date)}
    })
    return buzzwords
}

describe('test buzzwords aux functions', () => {
    afterEach(() => cleanup());

    it('should be able to shuffle the order of an array', () => {
        let testArray = shuffle(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' , 'j'])
        expect(testArray).to.not.equal(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' , 'j']);
    });

    it('should be able to identify whether tags are part of the search terms', async () => {
        let availableAuthors = ['tiago', 'jenny', 'olivia', 'balu'];
        let availableTags = ['bees', 'literature', 'music', 'science'];
        
        // search for authors that exist
        let authorsExist = ['tiago', 'jenny'];
        let expectedAuthorsExist = {authors: ['tiago', 'jenny']}

        expect(checkSearchTagsAuthors(authorsExist, availableAuthors, availableTags)).toEqual(expectedAuthorsExist);

        // search for tags that exist
        let tagsExist = ['literature'];
        let expectedTagsExist = {tags: ['literature']};
        expect(checkSearchTagsAuthors(tagsExist, availableAuthors, availableTags)).toEqual(expectedTagsExist);

        // search for terms that don't exist
        let termMissing = ['nothing'];
        let expectedTermMissing = {};
        expect(checkSearchTagsAuthors(termMissing, availableAuthors, availableTags)).toEqual(expectedTermMissing);

        // search for a mix of authors and tags
        let mixExist = ['jenny', 'literature']
        let expectedMixExist = {authors: ['jenny'], tags: ['literature']}
        expect(checkSearchTagsAuthors(mixExist, availableAuthors, availableTags)).toEqual(expectedMixExist);

        // search for a mix of authors, tags, and non-existent
        let mixExistMissing = ['jenny', 'literature', 'nothing']
        let expectedMixExistMissing = {authors: ['jenny'], tags: ['literature']}
        expect(checkSearchTagsAuthors(mixExistMissing, availableAuthors, availableTags)).toEqual(expectedMixExistMissing);
    });

    it('should be able to perform a full-text search', () => {
        let filteredBuzzwords = formatDate(buzzwords)
        
        // string not found
        let searchStringMissing = 'this should not be found';
        expect(fullTextSearch(filteredBuzzwords, searchStringMissing, []).length).toEqual(0);

        // exact string found
        let searchStringExact = 'On then sake home is am leaf.'
        expect(fullTextSearch(filteredBuzzwords, searchStringExact, []).length).toEqual(1)

        // partial string found
        let searchStringPartial = 'office'
        expect(fullTextSearch(filteredBuzzwords, searchStringPartial, []).length).toEqual(3);

        // partial string with search terms
        let searchTags = ['technology']
        expect(fullTextSearch(filteredBuzzwords, searchStringPartial, searchTags).length).toEqual(3)

        // partial string with authors
        let searchAuthors = ['jenny']
        expect(fullTextSearch(filteredBuzzwords, searchStringPartial, searchAuthors).length).toEqual(3);

    })
})