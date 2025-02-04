import people from './../(sections)/people.json'

export async function load() {
    return {people: people};
}