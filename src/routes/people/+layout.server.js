import people from './../people/people.json'

export async function load() {
    return {people: people};
}