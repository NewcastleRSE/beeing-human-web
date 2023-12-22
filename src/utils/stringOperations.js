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

export function removeSpaces(string) {
    // removes any spaces from string and replaces it with hyphen to allow for dynamic IDs in the html
    if (string.includes(' ')) {
        string = string.replace(/ /g, '-');
    }
    
    return string
}

export function splitStringIntoArray(string) {
    return string.split(' ');
}

export function getFileNameFromPath(string) {
    // returns a filename from a string path
    return string.split('\\').pop().split('/').pop();
}