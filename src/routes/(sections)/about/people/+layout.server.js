import people from './people.json'

export async function load() {
    return {people: people};
}