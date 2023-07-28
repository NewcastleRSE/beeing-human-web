<script>
    import {createEventDispatcher} from 'svelte';
    import { splitStringIntoArray } from '../utils/stringOperations';

    const dispatch = createEventDispatcher();

    export let listChips = undefined;

    let inputValue = '';

    function searchGo(event) {
        const searchString = event.target.firstElementChild.value;
        const searchTerms = splitStringIntoArray(searchString);
        if (searchString.length === 0) {
            dispatch('reset');
        } else {
            dispatch('search', {
                searchString: searchString,
                searchTerms: searchTerms
            });
        }
    }

    function checkForTagAuthor(inputValue) {
        const terms = splitStringIntoArray(inputValue);
        for (let term of terms) {
            if (listChips.includes(term)) {
                console.log(`${term} is part of authors`);
            } else {
                console.log('nothing to see here');
            }
        }
    }

    function styleInputChip(term) {

    }

    $: checkForTagAuthor(inputValue);
</script>

<h4>Search</h4>
<form on:submit={searchGo} id="submit-form">
    <input class="input max-w-sm p-2" type="search" name="searchBar" placeholder="Search..." id='search-bar' bind:value={inputValue} on:submit={searchGo}/>
    <button type="submit" class="btn variant-filled">Go</button>
</form>