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