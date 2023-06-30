export function capitaliseFirstLetter(string) {
    let capital = string[0].toUpperCase();
    return capital + string.slice(1);
}