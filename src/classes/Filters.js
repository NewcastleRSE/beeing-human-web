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

    getFilterNameList() {
        let filters = [];
        for (let filter of this) {
            filters.push(filter.name)
        }
        return filters;
    }

    getFiltersByType(type) {
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
}