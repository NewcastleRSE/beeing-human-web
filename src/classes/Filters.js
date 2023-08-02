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

    getFilterList() {
        let filters = [];
        for (let filter of this.filterList) {
            filters.push(filter.name)
        }
        return filters;
    }

    getFiltersByType(type) {
        return this.filterList.filter(el => el.type === type);
    }
}