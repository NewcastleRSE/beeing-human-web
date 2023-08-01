export class Filter {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.available = true,
        this.active = false
    }
}