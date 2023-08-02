class Filter {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.available = true,
        this.active = false
    }
}

export class Filters {
    constructor() {
        this.filterList = [];
    }

    // iterator
    [Symbol.iterator]() {
        let index = -1;
        let data = this.filterList;
        return {
            next: () => ({value: data[++index], done: !(index in data)})
        }
    }

    addFilter(name, type) {
        let newFilter = new Filter(name, type);
        this.filterList.push(newFilter);
    }

    getFilterNameList() {
        let filters = [];
        for (let filter of this.filterList) {
            filters.push(filter.name)
        }
        return filters;
    }

    getFiltersByType(type) {
        return this.filterList.filter(el => el.type === type);
    }

    getFiltersByName(name) {
        let foundFilter = undefined;
        for (let f of this.filterList) {
            if (f.name === name) {
                foundFilter = f
            }
        }
        return foundFilter
    }

    getFilterIndexByName(name) {
        let foundFilter = undefined;
        for (let i in this.filterList) {
            if (this.filterList[i].name === name) {
                foundFilter = i
            }
        }
        return foundFilter;
    }

    replaceFiltersByName(name, filter) {
        this.filterList[this.getFilterIndexByName(name)] = filter;
        return this.filterList
    }

    changeFilterAvailability(name, availability) {
        let filter = this.getFiltersByName(name);
        filter.available = availability;
        this.filterList = this.replaceFiltersByName(name, filter)
        return this.filterList
    }
}