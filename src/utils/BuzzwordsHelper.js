export function shuffle(array) {
    // randomize order of the array
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

export function checkSearchTagsAuthors(searchTerms, reactiveListAuthors, reactiveListTags) {
    // Check if it is in either authors or filters
    let filtersToCheck = {};
    let authorSearch = [];
    let termSearch = [];
    for (let term of searchTerms) {
        if (reactiveListAuthors.includes(term)) {
            authorSearch.push(term);
        }
        if (reactiveListTags.includes(term)) {
            termSearch.push(term);
        }
    }
    if (authorSearch.length > 0) {
        filtersToCheck['authors'] = authorSearch;
    }
    if (termSearch.length > 0) {
        filtersToCheck['terms'] = termSearch;
    }

    return filtersToCheck
}