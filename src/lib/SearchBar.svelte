<script>
    import { splitStringIntoArray } from '../utils/stringOperations';
    import SearchIcon from '$lib/icons/SearchIcon.svelte';


    let {listChips, search, reset} = $props();

    let chipList = $state(new Array());

    function searchGo(search, reset) {
        
        // event.preventDefault();
        // analyses the input and fires a search event to be picked up by the parent component
        const searchString = document.getElementById('search-bar').value
        let searchTerms = splitStringIntoArray(searchString);
        searchTerms = [...searchTerms, ...Array.from(chipList)]
        // removes empty spaces
        searchTerms = searchTerms.filter(Boolean);
        // if there isn't anything in the search, it fires a reset event to be picked up by the parent component
        if (searchString.length === 0 && searchTerms.length === 0) {
            // dispatch('reset');
            reset()
        } else {
            search({searchString: searchString,
                searchTerms: searchTerms})
            
        }
    }

    function checkForTagAuthor(inputValue) {
        // Checks whether input is part of the filter values and turns that into chips if it is

        // only turns terms into chips if the last input char was a space (i.e., it will not work if a chip is the last (or only) input value)

        let tagArray = JSON.parse(JSON.stringify(chipList));

        const lastChar = inputValue.substr(inputValue.length - 1);
        if (lastChar == ' ') {
            const terms = splitStringIntoArray(inputValue);
            for (let term of terms) {
                if (listChips.includes(term.toLowerCase())) {
                    tagArray.push(term.toLowerCase());
                    inputValue = inputValue.replace(`${term} `, '');
                }
            }
            // updates chipList
            chipList = [...new Set(tagArray)]
            // updates search terms
            document.getElementById('search-bar').value = inputValue;
        }        
    }


    function removeChip(chip) {
        // triggered when the user clicks the chip in the UI
        chipList = chipList.filter((name) => {return name !== chip});
    }

</script>

<div class='search-group max-w-full max-h-fit relative' data-testid="search-bar-container">
    <form onsubmit={() => searchGo(search, reset)} id="submit-form">
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] bg-tertiary-200 border-tertiary-800 focus-within:outline-2 focus-within:outline focus-within:outline-primary-500">
            <input class="input p-2 placeholder:text-tertiary-700" type="search" name="searchBar" placeholder="Search..." id='search-bar' oninput={(e) => checkForTagAuthor(e.target.value)} onsubmit={() => searchGo(search, reset)} autocomplete="off"/>
            <button type="submit" class="text-secondary-500 focus:bg-secondary-500 focus:text-white" data-testid="search-button"><SearchIcon/></button>
        </div>
    </form>
    {#if chipList.length > 0}
        {#key chipList}
        <div class="absolute w-full mt-1 flex flex-wrap gap-x-1 gap-y-2 min-h-2 p-4 bg-surface-50/[.90] rounded-lg" id="chip-list">
        {#each chipList as chip}
            <button class='chip variant-ringed' onclick={() => removeChip(chip)} data-testid='chip-{chip}'>{chip} &#x2715</button>
        {/each}
        </div>
        {/key}
    {/if}
</div>