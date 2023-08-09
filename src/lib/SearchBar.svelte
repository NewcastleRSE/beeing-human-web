<script>
    import {createEventDispatcher} from 'svelte';
    import { splitStringIntoArray } from '../utils/stringOperations';

    const dispatch = createEventDispatcher();

    export let listChips = undefined;

    let inputValue = '';
    let chipList = new Set();

    function searchGo(event) {
        // analyses the input and fires a search event to be picked up by the parent component
        const searchString = event.target.firstElementChild.value;
        let searchTerms = splitStringIntoArray(searchString);
        searchTerms = [...searchTerms, ...Array.from(chipList)]
        // removes empty spaces
        searchTerms = searchTerms.filter(Boolean);
        // if there isn't anything in the search, it fires a reset event to be picked up by the parent component
        if (searchString.length === 0 && searchTerms.length === 0) {
            dispatch('reset');
        } else {
            dispatch('search', {
                searchString: searchString,
                searchTerms: searchTerms
            });
        }
    }

    function checkForTagAuthor(inputValue) {
        // Checks whether input is part of the filter values and turns that into chips if it is

        // only turns terms into chips if the last input char was a space (i.e., it will not work if a chip is the last (or only) input value)
        const lastChar = inputValue.substr(inputValue.length - 1);
        if (lastChar == ' ') {
            const terms = splitStringIntoArray(inputValue);
            for (let term of terms) {
                if (listChips.includes(term.toLowerCase())) {
                    chipList = chipList.add(term.toLowerCase());
                    inputValue = inputValue.replace(`${term} `, '');
                }
            }
        }
        return inputValue
    }

    function removeChip(chip) {
        // triggered when the user clicks the chip in the UI
        chipList.delete(chip);

        // attribution updates the chipList in the UI
        chipList = chipList;
    }

    function clearAll() {
        // Clears all identified filters and resets the search bar
        chipList = new Set();
        const inputText = document.getElementById('search-bar')
        inputText.value = '';
    }

    // Reactive statement: checks if the input contais any filter at every change
    $: inputValue = checkForTagAuthor(inputValue);
</script>

<div class='search-group max-w-md'>
    <h4>Search</h4>
    <form on:submit={searchGo} id="submit-form">
        <input class="input max-w-sm p-2" type="search" name="searchBar" placeholder="Search..." id='search-bar' bind:value={inputValue} on:submit={searchGo} autocomplete="off"/>
        <button type="submit" class="btn variant-filled">Go</button>
    </form>
    <div class="chip-list" id="chip-list">
    {#each Array.from(chipList) as chip}
        <span class='chip variant-ringed' on:click={removeChip(chip)} on:keypress>{chip} &#x2715</span>
    {/each}
    {#if chipList.size != 0}
        <button class="btn btn-sm variant-filled-surface" on:click={clearAll} on:keypress>clear all</button>
    {/if}
    </div>
</div>

<style>
    .chip-list {
        margin: 0.5rem 0 0.5rem 1rem;
        min-height: 2rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
</style>