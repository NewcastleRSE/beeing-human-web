export function capitaliseFirstLetter(string) {
    // changes the first letter of a string to uppercase, returns the result
    let capital = string[0].toUpperCase();
    return capital + string.slice(1);
}

export function getListOfUniqueElements(array) {
    // remove undefined
    array = array.filter(entry => entry);
    return [... new Set(array)];
}