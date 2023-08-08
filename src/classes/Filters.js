import { writable } from 'svelte/store';

export class Filters extends Array {
    constructor() {
        writable(super());
        // initiates the class as a store, which makes it reactive in Sveltekit
        // this.filterList = writable([]);
    }

    subscribe(run) {
        // A subscribe method turns anything into a store, which makes it reactive
        return this.subscribe(run);
    }

    // iterator
    [Symbol.iterator]() {
        let index = -1;
        let data = this;
        return {
            next: () => ({value: data[++index], done: !(index in data)})
        }
    }

    addFilter(name, type) {
        let newFilter = {name: name, type: type, available: true, active: false};
        this.push(newFilter);
    }

    resetFilters() {
        for (let i = 0; i < this.length; i++) {
            this[i].active = false;
            this[i].available = true;
        }
    }

    getFilterNameList() {
        let filters = [];
        for (let filter of this) {
            filters.push(filter.name)
        }
        return filters;
    }

    getFiltersByType(type, order = false) {
        if (order) {
            let filters = this.filter(el => el.type === type)
            // returns the filters but sorting it by name
            return filters.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
        return this.filter(el => el.type === type);
    }

    getFiltersByName(name) {
        let foundFilter = undefined;
        for (let f of this) {
            if (f.name === name) {
                foundFilter = f
            }
        }
        return foundFilter
    }

    getFilterIndexByName(name) {
        let foundFilter = undefined;
        for (let i in this) {
            if (this[i].name === name) {
                foundFilter = i
            }
        }
        return foundFilter;
    }

    changeFilterAvailability(name, availability) {
        this[this.getFilterIndexByName(name)].available = availability;
        return this;
    }

    toggleFilterActive(filter) {
        const i = this.getFilterIndexByName(filter.name);
        this[i].active = !this[i].active;
        return this;
    }

    resetFilterActiveByType(type) {
        for (let i = 0; i < this.length; i++){
            if (this[i].type === type){
                this[i].active = false;
            }
        }
        return this
    }

    allInactive() {
        let activeFilters = this.filter(el => el.active === true);
        if (activeFilters.length > 0) {
            return false
        } else {
            return true
        }
    }

    anyActive() {
        let activeFilters = this.filter(el => el.active === true)

        if (activeFilters.length > 0) {
            return true
        } else {
            return false
        }
    }

    getActiveFiltersByType(type) {
        let activeFilters = this.filter(el => el.active === true && el.type === type)
        return Array.from(activeFilters.map((el) => el.name))
    }

    updateFilterActiveStatus(listAuthors, listTags) {
        for (let i = 0; i < this.length; i++) {
            if (this[i].type === 'tags') {
                if (listTags.includes(this[i].name)) {
                    this[i].available = true;
                } else {
                    this[i].available = false;
                }
            }
        }
        return this
    }
}