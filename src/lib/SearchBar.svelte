<script>
    import {createEventDispatcher} from 'svelte';
    import { splitStringIntoArray } from '../utils/stringOperations';
    import SearchIcon from '$lib/icons/SearchIcon.svelte';

    const dispatch = createEventDispatcher();

    export let listChips = undefined;

    let inputValue = '';
    let chipList = new Set();

    function searchGo(event) {
        event.preventDefault();
        // analyses the input and fires a search event to be picked up by the parent component
        const searchString = document.getElementById('search-bar').value
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

<div class='search-group max-w-full max-h-fit relative' data-testid="search-bar-container">
    <form on:submit={searchGo} id="submit-form">
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] bg-tertiary-200 border-tertiary-800 focus-within:outline-2 focus-within:outline focus-within:outline-primary-500">
            <input class="input p-2 placeholder:text-tertiary-700" type="search" name="searchBar" placeholder="Search..." id='search-bar' bind:value={inputValue} on:submit={searchGo} autocomplete="off"/>
            <button type="submit" class="text-secondary-500 focus:bg-secondary-500 focus:text-white" data-testid="search-button"><SearchIcon/></button>
        </div>
    </form>
    {#if chipList.size > 0}
        <div class="absolute w-full mt-1 flex flex-wrap gap-x-1 gap-y-2 min-h-2 p-4 bg-surface-50/[.90] rounded-lg" id="chip-list">
        {#each Array.from(chipList) as chip}
            <span class='chip variant-ringed' on:click={removeChip(chip)} on:keypress data-testid='chip-{chip}'>{chip} &#x2715</span>
        {/each}
        </div>
    {/if}
    <!-- {#if chipList.size != 0}
        <button class="btn btn-sm variant-filled-surface" on:click={clearAll} on:keypress>clear all</button>
    {/if} -->
</div>