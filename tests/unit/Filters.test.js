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
    beforeEach(() => {
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
            'seventeenth-century', 'collaboration',
            'methodology',         'buzzwords',
            'emotion-like states', 'results',
            'edition',             'text',
            'interdisciplinarity', 'play',
            'pleasure',
            'bennett', 'olivia',
            'jenny', 'vivek',
            'magnus', 'tiago',
            'balu'
        ]
        expect(filters.getFilterNameList()).toEqual(expected);
    });

    it('should be able to get a list of all filter types', () => {
        let expected = ['tags', 'authors']
        expect(filters.getFilterTypeList()).toEqual(expected);
    })

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
            { name: 'buzzwords', type: 'tags', available: true, active: false },
            {
              name: 'collaboration',
              type: 'tags',
              available: true,
              active: false
            },
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
            {
              name: 'interdisciplinarity',
              type: 'tags',
              available: true,
              active: false
            },
            { name: 'literature', type: 'tags', available: true, active: false },
            { name: 'methodology', type: 'tags', available: true, active: false },
            { name: 'music', type: 'tags', available: true, active: false },
            { name: 'original', type: 'tags', available: true, active: false },
            { name: 'play', type: 'tags', available: true, active: false },
            { name: 'pleasure', type: 'tags', available: true, active: false },
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
            { name: 'technology', type: 'tags', available: true, active: false },
            { name: 'text', type: 'tags', available: true, active: false }
          ]
        expect(filters.getFiltersByType('tags', true).sort()).toEqual(expected.sort());
    });

    it('should return an empty list if the type of filter requested does not exist', () => {
        expect(filters.getFiltersByType('foo')).toEqual([]);
    });

    it('should return a filter object if searching by filter name', () => {
        let expected = { name: 'politics', type: 'tags', available: true, active: false }
        expect(filters.getFiltersByName('politics')).toEqual(expected);
    });

    it('should throw an error if searching for a filter name that does not exist', () => {
        expect(() => filters.getFiltersByName('foo')).toThrowError();
    });

    it('should return an index when searching for filter index by name', () => {
        expect(filters.getFilterIndexByName('tiago')).toBeTypeOf('number');
    });

    it('should throw an error when searching for a filter index that does not exist by name', () => {
        expect(() => filters.getFilterIndexByName('bar')).toThrowError();
    });

    it('should return true if all filters are inactive when calling allInacive()', () => {
        expect(filters.allInactive()).toBeTruthy();
    });

    it('should return false if at least one filter is active when calling allInactive()', () => {
        // turn one filter active
        filters.toggleFilterActive(filters.getFiltersByName('tiago'));
        expect(filters.allInactive()).toBeFalsy();

        // turn two more filters active
        filters.toggleFilterActive(filters.getFiltersByName('balu'));
        filters.toggleFilterActive(filters.getFiltersByName('jenny'));
        expect(filters.allInactive()).toBeFalsy();
    });

    it('should return false if all filters are inactive when calling anyActive()', () => {
        expect(filters.anyActive()).toBeFalsy();
    });

    it('should return true if at least one filter is active when calling anyActive()', () => {
        // turn one filter active
        filters.toggleFilterActive(filters.getFiltersByName('tiago'));
        expect(filters.anyActive()).toBeTruthy();

        // turn two more filters active
        filters.toggleFilterActive(filters.getFiltersByName('balu'));
        filters.toggleFilterActive(filters.getFiltersByName('jenny'));
        expect(filters.anyActive()).toBeTruthy();
    });

    it('should return a list of all active filter names of a certain type', () => {
        let expected1 = ['tiago'];
        // might fail if filters appear in a different order -- correct if it starts failing this test
        let expected2 = ['jenny', 'tiago', 'balu'];

        // toggle one filter
        filters.toggleFilterActive(filters.getFiltersByName('tiago'));
        expect(filters.getActiveFiltersByType('authors')).toEqual(expected1);

        // toggle two more filters
        filters.toggleFilterActive(filters.getFiltersByName('balu'));
        filters.toggleFilterActive(filters.getFiltersByName('jenny'));
        expect(filters.getActiveFiltersByType('authors')).toEqual(expected2);
    });

    it('should throw an error if asking for a non-existent filter with getActiveFiltersByType()', () => {
        expect(() => filters.getActiveFiltersByType('foo')).toThrowError();
    });

    it('should return a list of names of all available filters of a certain type', () => {
        let expected1 = [
            'bennett', 'olivia',
            'jenny', 'vivek',
            'magnus', 'tiago',
            'balu'
        ]
        let expected2 = ['bennett', 'olivia', 'jenny', 'vivek', 'magnus', 'balu'];

        expect(filters.getAvailableFiltersByType('authors')).toEqual(expected1)

        filters.changeFilterAvailability('tiago', false);
        expect(filters.getAvailableFiltersByType('authors')).toEqual(expected2);
    });

    it('should throw an error if trying to get a list of available filters from a type that does not exist', () => {
        expect(() => filters.getAvailableFiltersByType('foo')).toThrowError();
    });

});

describe('filter setter operations', () => {
    let filters;
    beforeEach(() => {
        filters = new Filters();
        for (let tag of listTags) {
            filters.addFilter(tag, 'tags');
        }

        for (let author of listAuthors) {
            filters.addFilter(author, 'authors');
        }
    });

    afterEach(() => cleanup());

    it('should be able to change the filter availability from a filter name', () => {
        let expected = { name: 'tiago', type: 'authors', available: false, active: false }
        filters.changeFilterAvailability('tiago', false);
        expect(filters.getFiltersByName('tiago')).toEqual(expected);
    });

    it('should throw an error if can\'t find a filter by name', () => {
        expect(() => filters.changeFilterAvailability('boo', false)).toThrowError();
    });

    it('should be able to toggle filter activity by filter', () => {
        let filter = filters.getFiltersByName('balu');
        let expected1 = { name: 'balu', type: 'authors', available: true, active: true }
        let expected2 = { name: 'balu', type: 'authors', available: true, active: false }

        // toggle on
        filters.toggleFilterActive(filter)
        expect(filters.getFiltersByName('balu')).toEqual(expected1);

        // toggle off
        filters.toggleFilterActive(filter)
        expect(filters.getFiltersByName('balu')).toEqual(expected2);
    });

    it('should throw an error if trying to toggle activity for a filter that does not exist', () => {
        expect(() => filters.toggleFilterActive('bar')).toThrowError();
    });

    it('should be able to reset the active status of all filters of a certain type', () => {
        let expectedChange = [
            { name: 'bennett', type: 'authors', available: true, active: true },
            { name: 'olivia', type: 'authors', available: true, active: true },
            { name: 'jenny', type: 'authors', available: true, active: true },
            { name: 'vivek', type: 'authors', available: true, active: true },
            { name: 'magnus', type: 'authors', available: true, active: true },
            { name: 'tiago', type: 'authors', available: true, active: true },
            { name: 'balu', type: 'authors', available: true, active: true }
        ];

        let expectedReset = [
            { name: 'bennett', type: 'authors', available: true, active: false },
            { name: 'olivia', type: 'authors', available: true, active: false },
            { name: 'jenny', type: 'authors', available: true, active: false },
            { name: 'vivek', type: 'authors', available: true, active: false },
            { name: 'magnus', type: 'authors', available: true, active: false },
            { name: 'tiago', type: 'authors', available: true, active: false },
            { name: 'balu', type: 'authors', available: true, active: false }
        ];

        for (let author of listAuthors) {
            filters.toggleFilterActive(filters.getFiltersByName(author));
        }

        // test it changed all author filters to active;
        expect(filters.getFiltersByType('authors')).toEqual(expectedChange);

        // reset filter active state
        filters.resetFilterActiveByType('authors');
        expect(filters.getFiltersByType('authors')).toEqual(expectedReset);
    });

    it('should throw an error if the filter type does not exist when resetting filters of a certain type', () => {
        expect(() => filters.resetFilterActiveByType('foo')).toThrowError();
    });

    it('should set the active status of a list of filter names', () => {
        // test turn active
        let listToChange = ['tiago', 'balu'];
        filters.setActiveFiltersFromList(listToChange);
        expect(filters.getActiveFiltersByType('authors')).toEqual(listToChange);

        // test turn inactive
        filters.setActiveFiltersFromList(listToChange, false);
        expect(filters.getActiveFiltersByType('authors')).toEqual([]);
    });

    it('should constrain the list of available tags if only author filters have been selected', () => {
        let initialAvailableAuthors = filters.getAvailableFiltersByType('authors');
        let initialAvailableTags = filters.getAvailableFiltersByType('tags');

        filters.setActiveFiltersFromList(['tiago']);

        filters.updateFilterAvailableStatus(filters.getActiveFiltersByType('authors'), filters.getActiveFiltersByType('tags'));

        expect(initialAvailableAuthors.length).toEqual(filters.getAvailableFiltersByType('authors').length);

        expect(initialAvailableTags.length).toBeGreaterThan(filters.getAvailableFiltersByType('tags').length);
    });

    it('should constrain the list of available authors and tags if only tag filters have been selected', () => {
        let initialAvailableAuthors = filters.getAvailableFiltersByType('authors');
        let initialAvailableTags = filters.getAvailableFiltersByType('tags');

        filters.setActiveFiltersFromList(['technology']);

        filters.updateFilterAvailableStatus(filters.getActiveFiltersByType('authors'), filters.getActiveFiltersByType('tags'));

        expect(initialAvailableAuthors.length).toBeGreaterThan(filters.getAvailableFiltersByType('authors').length);

        expect(initialAvailableTags.length).toBeGreaterThan(filters.getAvailableFiltersByType('tags').length);
    });

    it('should constrain the list of available tags only if both filters have been selected', () => {
        let initialAvailableAuthors = filters.getAvailableFiltersByType('authors');
        let initialAvailableTags = filters.getAvailableFiltersByType('tags');

        filters.setActiveFiltersFromList(['tiago', 'technology']);

        filters.updateFilterAvailableStatus(filters.getActiveFiltersByType('authors'), filters.getActiveFiltersByType('tags'));

        expect(initialAvailableAuthors.length).toEqual(filters.getAvailableFiltersByType('authors').length);

        expect(initialAvailableTags.length).toBeGreaterThan(filters.getAvailableFiltersByType('tags').length);
    });

    // STILL NEED TO TEST resetFilters, resetFiltersActiveStatus, resetFiltersAvailableStatus

    it('should reset all filters to their initial state', () => {
        let initialState = new Filters();
        for (let tag of listTags) {
            initialState.addFilter(tag, 'tags');
        }

        for (let author of listAuthors) {
            initialState.addFilter(author, 'authors');
        }

        // change something and expect them to be different
        filters.setActiveFiltersFromList(['tiago', 'balu']);
        filters.toggleFilterActive(filters.getFiltersByName('jenny'));
        expect(filters).not.toEqual(initialState);

        // reset filters and expect them to be the same
        filters.resetFilters()
        expect(filters).toEqual(initialState);
    });

    it('should reset the available status for all filters', () => {
        // initial state and change
        let initialState = filters.getFiltersByName('jenny').available;
        filters.changeFilterAvailability('jenny', false);
        let changedState = filters.getFiltersByName('jenny').available;
        expect(changedState).not.toEqual(initialState);
        expect(initialState).toBeTruthy();
        expect(changedState).toBeFalsy();

        // toggling active status to ensure only available status is changed
        filters.toggleFilterActive(filters.getFiltersByName('jenny'));
        expect(filters.getFiltersByName('jenny').active).toBeTruthy();

        // reseting filter available status
        filters.resetFiltersAvailableStatus();
        expect(filters.getFiltersByName('jenny').available).toBeTruthy();
        expect(filters.getFiltersByName('jenny').active).toBeTruthy();
    });

    it('should reset the active status for all filters', () => {
        // initial state and change
        let initialState = filters.getFiltersByName('jenny').active;
        filters.toggleFilterActive(filters.getFiltersByName('jenny'));
        let changedState = filters.getFiltersByName('jenny').active;
        expect(changedState).not.toEqual(initialState);
        expect(initialState).toBeFalsy();
        expect(changedState).toBeTruthy();

        // toggling available status to ensure only active status is changed
        filters.changeFilterAvailability('jenny', false);
        expect(filters.getFiltersByName('jenny').available).toBeFalsy();

        // reseting filter active status
        filters.resetFiltersActiveStatus();
        expect(filters.getFiltersByName('jenny').active).toBeFalsy();
        expect(filters.getFiltersByName('jenny').available).toBeFalsy();
    });
})