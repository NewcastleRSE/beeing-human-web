import { splitStringIntoArray } from "./stringOperations";

// Collection of helper functions for 'Buzzwords.svelte' component and its child components

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

export function checkSearchTagsAuthors(searchTerms, availableAuthors, availableTags) {
    // Check if it is in either authors or filters
    let filtersToCheck = {};
    let authorSearch = [];
    let termSearch = [];
    for (let term of searchTerms) {
        if (availableAuthors.includes(term)) {
            authorSearch.push(term);
        }
        if (availableTags.includes(term)) {
            termSearch.push(term);
        }
    }
    if (authorSearch.length > 0) {
        filtersToCheck['authors'] = authorSearch;
    }
    if (termSearch.length > 0) {
        filtersToCheck['tags'] = termSearch;
    }

    return filtersToCheck
}

export function fullTextSearch(filteredBuzzwords, searchString, searchTerms) {
    // searchs the body of each buzzwords and its metadata in case it hasn't been picked up before
    searchString = searchString.toLowerCase();
    let fullMatch = [];
    let partialMatch = [];
    for (let buzzword of filteredBuzzwords) {
        // full match search
        if (buzzword.content.toLowerCase().includes(searchString)) {
            fullMatch.push(buzzword);
        }
        // if there is no full match
        if (splitStringIntoArray(buzzword.content.toLowerCase()).some(word => searchTerms.includes(word))) {
            partialMatch.push(buzzword);
        }
    }

    // if there is a full match return that, otherwise return a partial match
    return fullMatch.length > 0 ? fullMatch : partialMatch
    
}