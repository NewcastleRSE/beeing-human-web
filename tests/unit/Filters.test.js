import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { cleanup } from "@testing-library/svelte";

import { listAuthors, listTags } from "../mocks/mockVarsBuzzwords";
import { Filters } from "../../src/classes/Filters";

describe('test filter class creation', () => {
    afterEach(() => cleanup())
    it('should be able to create a new filter object and add to it', () => {
        let filters = new Filters();
        let expected = [{ name: 'test', type: 'tags', available: true, active: false }];
        filters.addFilter('test', 'tags');
        expect(filters).toEqual(expected);
    });

    it('should be able to create a new array of filters from the variables', () => {
        let filters = new Filters();
        for (let tag of listTags) {
            filters.addFilter(tag, 'tags');
        }
        
        for (let author of listAuthors) {
            filters.addFilter(author, 'authors');
        }
        expect(filters.length).toEqual(listTags.length + listAuthors.length);
    });
});

describe('test filter getter operations', () => {
    let filters;
    beforeAll(() => {
        filters = new Filters();
        for (let tag of listTags) {
            filters.addFilter(tag, 'tags');
        }
        
        for (let author of listAuthors) {
            filters.addFilter(author, 'authors');
        }
    });

    afterEach(() => cleanup());

    it('should be able to get a list of all filter names', () => {
        let expected = [
            'music',               'original',
            'contemporary',        'bees',
            'bee-keeping',         'society',
            'connections',         'literature',
            'science',             'technology',
            'fieldwork',           'community',
            'editing',             'politics',
            'experiment',          'butler',
            'seventeenth-century', 'emotion-like states',
            'results',             'edition',
            'bennett',             'olivia',
            'jenny',               'vivek',
            'magnus',              'tiago',
            'balu'
          ]
        expect(filters.getFilterNameList()).toEqual(expected);
    });

    it('should be able to get a list of filters of a certain type', () => {
        let expected = [
            { name: 'bennett', type: 'authors', available: true, active: false },
            { name: 'olivia', type: 'authors', available: true, active: false },
            { name: 'jenny', type: 'authors', available: true, active: false },
            { name: 'vivek', type: 'authors', available: true, active: false },
            { name: 'magnus', type: 'authors', available: true, active: false },
            { name: 'tiago', type: 'authors', available: true, active: false },
            { name: 'balu', type: 'authors', available: true, active: false }
          ]
        expect(filters.getFiltersByType('authors')).toEqual(expected);
    });

    it('should be able to return an ordered list of filters of a certain type if requested', () => {
        let expected = [
            { name: 'bee-keeping', type: 'tags', available: true, active: false },
            { name: 'bees', type: 'tags', available: true, active: false },
            { name: 'butler', type: 'tags', available: true, active: false },
            { name: 'community', type: 'tags', available: true, active: false },
            { name: 'connections', type: 'tags', available: true, active: false },
            {
              name: 'contemporary',
              type: 'tags',
              available: true,
              active: false
            },
            { name: 'editing', type: 'tags', available: true, active: false },
            { name: 'edition', type: 'tags', available: true, active: false },
            {
              name: 'emotion-like states',
              type: 'tags',
              available: true,
              active: false
            },
            { name: 'experiment', type: 'tags', available: true, active: false },
            { name: 'fieldwork', type: 'tags', available: true, active: false },
            { name: 'literature', type: 'tags', available: true, active: false },
            { name: 'music', type: 'tags', available: true, active: false },
            { name: 'original', type: 'tags', available: true, active: false },
            { name: 'politics', type: 'tags', available: true, active: false },
            { name: 'results', type: 'tags', available: true, active: false },
            { name: 'science', type: 'tags', available: true, active: false },
            {
              name: 'seventeenth-century',
              type: 'tags',
              available: true,
              active: false
            },
            { name: 'society', type: 'tags', available: true, active: false },
            { name: 'technology', type: 'tags', available: true, active: false }
          ]
        expect(filters.getFiltersByType('tags', true)).toEqual(expected);
    });

    it('should return an empty list if the type of filter requested does not exist', () => {
        expect(filters.getFiltersByType('foo')).toEqual([]);
    });

    it('should return a filter object if searching by filter name', () => {
        let expected = { name: 'politics', type: 'tags', available: true, active: false }
        expect(filters.getFiltersByName('politics')).toEqual(expected);
    });

    it('should return undefined if searching for a filter name that does not exist', () => {
        expect(filters.getFiltersByName('foo')).toBeUndefined();
    });

    it('should return an index when searching for filter index by name', () => {
        expect(filters.getFilterIndexByName('tiago')).toBeTypeOf('number');
    });

    it('should return undefined when searching for a filter index that does not exist by name', () => {
        expect(filters.getFilterIndexByName('bar')).toBeUndefined();
    });
})