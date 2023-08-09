import { writable } from 'svelte/store';

// Class that stores an array of Filter objects and tracks their state

export class Filters extends Array {
    constructor() {
        super()
    }

    // iterator
    [Symbol.iterator]() {
        let index = -1;
        let data = this;
        return {
            next: () => ({value: data[++index], done: !(index in data)})
        }
    }

    // adds and sets default properties for a filter in the array
    addFilter(name, type) {
        let newFilter = {name: name, type: type, available: true, active: false};
        this.push(newFilter);
    }

    // resets each filter to its init state
    resetFilters() {
        for (let i = 0; i < this.length; i++) {
            this[i].active = false;
            this[i].available = true;
        }
    }

    // resets only the active property to its init state
    resetFiltersActiveStatus() {
        for (let i = 0; i < this.length; i++) {
            this[i].active = false;
        }
    }

    // resets only the available property to its init state
    resetFiltersAvailableStatus() {
        for (let i = 0; i < this.length; i++) {
            this[i].available = true;
        }
    }

    // gets a list of all filter names
    getFilterNameList() {
        let filters = [];
        for (let filter of this) {
            filters.push(filter.name)
        }
        return filters;
    }

    // returns an array of all filters of a certain type
    getFiltersByType(type, order = false) {
        if (order) {
            let filters = this.filter(el => el.type === type)
            // returns the filters but sorting it by name
            return filters.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
        return this.filter(el => el.type === type);
    }

    // returns a filter object searching it by name
    getFiltersByName(name) {
        let foundFilter = undefined;
        for (let f of this) {
            if (f.name === name) {
                foundFilter = f
            }
        }
        return foundFilter
    }

    // returns the filter index of any filter by its name
    getFilterIndexByName(name) {
        let foundFilter = undefined;
        for (let i in this) {
            if (this[i].name === name) {
                foundFilter = i
            }
        }
        return foundFilter;
    }

    // changes filter availability directly
    changeFilterAvailability(name, availability) {
        this[this.getFilterIndexByName(name)].available = availability;
        return this;
    }

    // toggles the active property of a given filter object
    toggleFilterActive(filter) {
        const i = this.getFilterIndexByName(filter.name);
        this[i].active = !this[i].active;
        return this;
    }

    // resets the active propery of all filters of a given type
    resetFilterActiveByType(type) {
        for (let i = 0; i < this.length; i++){
            if (this[i].type === type){
                this[i].active = false;
            }
        }
        return this
    }

    // checks whether all filters are active = false
    allInactive() {
        let activeFilters = this.filter(el => el.active === true);
        if (activeFilters.length > 0) {
            return false
        } else {
            return true
        }
    }

    // checks whether any filter has active = true
    anyActive() {
        let activeFilters = this.filter(el => el.active === true)

        if (activeFilters.length > 0) {
            return true
        } else {
            return false
        }
    }

    // get an array of the names of all active filters of a certain type
    getActiveFiltersByType(type) {
        let activeFilters = this.filter(el => el.active === true && el.type === type)
        return Array.from(activeFilters.map((el) => el.name))
    }

    // get an array of the names of all available filters of a certain type
    getAvailableFiltersByType(type) {
        let availableFilters = this.filter(el => el.available === true && el.type === type)
        return Array.from(availableFilters.map((el) => el.name))
    }

    // sets the active property of a list of filters (from an array of names) to a certain vaule
    setActiveFiltersFromList(list, newValue = true) {
        for (let i = 0; i < this.length; i++) {
            if (list.includes(this[i].name)) {
                this[i].active = newValue;
            }
        }
        return this
    }

    // based on two lists of tages, sets the availability of the filters depending on whether they are contained on that list or not
    updateFilterAvailableStatus(listAuthors, listTags) {
        // if only author filters have been selected, only tags should be constrained
        // if only tag filters have been selected, tags and authors should be constrained
        // if both filters are selected, only tags should be constrained

        let typeSelected;
        let activeAuthors = this.getActiveFiltersByType('authors');
        let activeTags = this.getActiveFiltersByType('tags');
        this.resetFiltersAvailableStatus();
        if (activeAuthors.length > 0 && activeTags.length > 0) {
            typeSelected = 'both';
        } else if (activeAuthors.length > 0 && activeTags.length === 0) {
            typeSelected = 'authors';
        } else if (activeAuthors.length === 0 && activeTags.length > 0) {
            typeSelected = 'tags';
        }

        for (let i = 0; i < this.length; i++) {
            // tags are always constrained
            if (this[i].type === 'tags') {
                if (listTags.includes(this[i].name)) {
                    this[i].available = true;
                } else {
                    this[i].available = false;
                }
            }
            // authors are only constrained if only tags are selected
            if (this[i].type === 'authors' && typeSelected === 'tags') {
                if (listAuthors.includes(this[i].name)) {
                    this[i].available = true;
                } else {
                    this[i].available = false;
                }
            }
        }
        return this
    }
}