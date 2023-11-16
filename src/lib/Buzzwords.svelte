<script>
    import { onMount } from 'svelte';
    import InjectMd from './InjectMD.svelte';
    import {daysOfTheWeek, monthsOfTheYear} from '../utils/generalConstants';
    import {capitaliseFirstLetter, getListOfUniqueElements, removeSpaces} from '../utils/stringOperations';

    import { checkSearchTagsAuthors, fullTextSearch, shuffle } from '../utils/BuzzwordsHelper';

    import { Filters } from '../classes/Filters'

    import TagSelector from './TagSelector.svelte';
    import SearchBar from './SearchBar.svelte';

    export let buzzwords;
    export let listTags;
    export let listAuthors;

    // Does not create the template until it is loaded
    let loaded = false;
    let errorFlag = false;

    // array of filter objects
    let filters = new Filters();

    // this is the array of buzzwords to be displayed -- it will be equal to the received buzzwords at init
    let filteredBuzzwords = [];
    
    // necessary to restart the filter components
    let unique = {}

    // Event handling changes

    function handleFilterChange(event) {
        // Triggers when a filter button is clicked
        filters = filters.toggleFilterActive(event.detail.filter);
        // buzzword filtering is handled by this first level function
        filteredBuzzwords = filterBuzzWords(filteredBuzzwords);
    }


    function handleResetFilters(event) {
        // triggers when a filter reset button is clicked
        // resets all filter buttons of the same type and refilters the dataset
        filters = filters.resetFilterActiveByType(event.detail.filter)
        filteredBuzzwords = filterBuzzWords(filteredBuzzwords);
    }

    function handleReset() {
        // triggered by submitting an empty search
        // resets to show the entire dataset to whatever filter selection existed before the search
        filteredBuzzwords = filterBuzzWords(buzzwords);
    }

    function handleFilterClickBuzzword(tag) {
        // creates a fake Filter object and sends it to handleFilterChange as if it came from the 'TagSelector' component

        // finds the corresponding object in the Filters object
        const filter = filters.getFiltersByName(tag)

        // constructs the fake event object
        const fakeEvent = {
            detail: {
                filter: filter
            }
        }

        // calls the handleFilterChange function with the fake event
        handleFilterChange(fakeEvent);
    }

    function handleSearch(event) {
        // triggered when receiving a 'search' event from 'SearchBar.svelte'
        // set terms to lower case
        const searchTerms = event.detail.searchTerms.map(e => e.toLowerCase());

        // if there are no active filters, it will always search in the entire corpus
        if (filters.allInactive()) {
            filteredBuzzwords = buzzwords;
        }

        // establish whether the search terms are filters
        const filtersToCheck = checkSearchTagsAuthors(searchTerms, filters.getAvailableFiltersByType('authors'), filters.getAvailableFiltersByType('tags'));


        // if the search terms are filters in either the authors or tags
        if (Object.keys(filtersToCheck).length > 0) {
            let listAuthors = [];
            let listTags = [];
            if (Object.keys(filtersToCheck).includes('authors')) {
                listAuthors = filtersToCheck['authors'];
            }
            if (Object.keys(filtersToCheck).includes('tags')) {
                listTags = filtersToCheck['tags'];
            }

            // filter the displayed buzzwords
            filteredBuzzwords = reduceBuzzwordsByFilter(filteredBuzzwords, listAuthors, listTags);
        }

        // Full text search
        let fullTextResults = fullTextSearch(filteredBuzzwords, event.detail.searchString, searchTerms);
        if (fullTextResults.length > 0) {
            filteredBuzzwords = fullTextResults
        } else if (fullTextResults.length == 0 && Object.keys(filtersToCheck).length == 0){
            filteredBuzzwords = [];
        }

        // Gets a list of all the authors in the filtered dataset
        let availableAuthors = getListOfUniqueElements(filteredBuzzwords.map(buzz => buzz.author));
        // Gets a list of all the tags available in the filtered dataset
        let availableTags = getListOfUniqueElements(filteredBuzzwords.map(buzz => [...buzz.tags]).flat());
        // updates filter availability based on filtered dataset
        filters = filters.updateFilterAvailableStatus(availableAuthors, availableTags);
        updateFilterButtons(filteredBuzzwords.length);
    }

    function resetAll() {
        // resets all filters and search terms
        init(false);
    }

    // First level filtering functions

    function filterBuzzWords(filteredBuzzwords) {
        // First level function to filter buzzwords dataset
        // This is triggered when an user clicks on one of the filter buttons
        // The actual data filtering happens in the second level function 'reduceBuyzzwordsByFilter'
        let listActiveFilterAuthors = []
        let listActiveFilterTags = []

        if (filters.allInactive()) {
            // if both filters are empty:
            // -- reset filter availability (all available)
            filters.resetFiltersAvailableStatus();
            // -- update the UI to reflect availability
            updateFilterButtons(buzzwords.length);
            // -- return the initial dataset
            return buzzwords
        } else {
            // otherwise, reset the filteredBuzzwords for the entire dataset
            listActiveFilterAuthors = filters.getActiveFiltersByType('authors');
            listActiveFilterTags = filters.getActiveFiltersByType('tags')
            filteredBuzzwords = buzzwords;
        }

        // Reduce the dataset based on selected filters
        let bothFilters = reduceBuzzwordsByFilter(filteredBuzzwords, listActiveFilterAuthors, listActiveFilterTags);

        // Gets a list of all the authors in the filtered dataset
        let listAuthors = getListOfUniqueElements(bothFilters.map(buzz => buzz.author));
        // Gets a list of all the tags available in the filtered dataset
        let listTags = getListOfUniqueElements(bothFilters.map(buzz => [...buzz.tags]).flat());
        
        // updates UI to show available filters on the reduced dataset
        filters = filters.updateFilterAvailableStatus(listAuthors, listTags);
        updateFilterButtons(bothFilters.length);

        return bothFilters;
    }

    // second level filtering functions

    function reduceBuzzwordsByFilter(filteredBuzzwords, listActiveFilterAuthors, listActiveFilterTags) {
        // Second level function that takes in two lists of active filters, reduces the dataset based on those filters, and returns the result

        // Filtering authors is additive -- i.e., the more filters you select, the more results you will get (i.e., all posts of author x plus all posts of author y)
        let filteredAuthors = filteredBuzzwords.filter(function(entry) {
            if (entry.author) {
                if (listActiveFilterAuthors.length > 0 && listActiveFilterAuthors.includes(entry.author)) {
                    return entry.author;
                } else if (listActiveFilterAuthors.length === 0) {
                    return entry.author;
                }
            }
        });
        
        // Filtering tags is subtractive -- i.e., the more filters you select, the less results you have (i.e., i.e., all posts with tag x and tag y) -- still not sure if this is the more intuitive solution
        let filteredTags = []
        for (let buzzword of filteredBuzzwords) {
            if (buzzword.tags && listActiveFilterTags.every(tag => buzzword.tags.includes(tag))) {
                filteredTags.push(buzzword);
            }
        }

        // Collates the results for both filters
        let bothFilters = []
        if (filteredAuthors.length < filteredBuzzwords.length && filteredTags.length < filteredBuzzwords.length) {
            bothFilters = filteredAuthors.filter(entry => filteredTags.includes(entry));
        } else if (filteredAuthors.length < filteredBuzzwords.length) {
            bothFilters = filteredAuthors;
        } else if (filteredTags.length < filteredBuzzwords.length) {
            bothFilters = filteredTags;
        } else if (filteredAuthors.length === filteredBuzzwords.length && filteredTags.length === filteredBuzzwords.length) {
            bothFilters = filteredBuzzwords;
        }

        return bothFilters;
    }

    function updateFilterButtons(lenNewDataset) {
        // Updates the UI to show current filter availability
        // takes the length of the new dataset to compare it to the entire dataset and enable or disable the Reset All button
        for (let filter of filters) {
            try {
                const filterChip = document.getElementById(`${removeSpaces(filter.name)}-filter`)
                if (filter.available) {
                    filterChip.disabled = false;
                } else {
                    filterChip.disabled = true;
                }
            } catch (error) {
                console.debug(`Component is still mounting, element with id ${removeSpaces(filter.name)}-filter does not exist yet. ${error}`);
            }
        }

        // Updates the UI to enable or disable the `Reset All` button
        try {
            const resetAllButton = document.getElementById('resetAll');

            if (filters.allInactive() && buzzwords.length === lenNewDataset) {
                resetAllButton.disabled = true;
            } else {
                resetAllButton.disabled = false;
            }
        } catch (error) {
            console.debug(`Component is still mounting, element with id resetAll does not exist yet. ${error}`);
        }

        // Updates the UI to enable or disable the `Reset` button for each filter group
        try {
            const resetAuthor = document.getElementById('authors-reset');
            const resetTags = document.getElementById('tags-reset');

            if (filters.getActiveFiltersByType('authors').length === 0) {
                resetAuthor.disabled = true;
            } else {
                resetAuthor.disabled = false;
            }

            if (filters.getActiveFiltersByType('tags').length === 0) {
                resetTags.disabled = true;
            } else {
                resetTags.disabled = false;
            }

        } catch (error) {
            console.debug(error);
        }
    }

    // initialisation functions

    function init(shuffled = true) {
        // Called onMount and whenever there is a reset all
        // Resets the dataset to the original, resets filters to their initial state, and creates a new UI for filtering and search
        if (shuffled) {
            buzzwords = shuffle(buzzwords)
        }
        filteredBuzzwords = buzzwords;

        // resets filter to initial state;
        filters.resetFilters();

        // necessary to restart the filter components
        unique = {}

    }

    onMount( () => {
        // Fills the filters object
        try {
            if(listAuthors.length == 0 || listTags.length == 0 || buzzwords.length == 0) {
                throw new Error('No data received')
            }
            
            for (let tag of listTags) {
                filters.addFilter(tag, 'tags');
            }
            
            for (let author of listAuthors) {
                filters.addFilter(author, 'authors');
            }
            init();
            loaded = true;
        }
        catch (error) {
            console.debug(`There has been an error: ${error}`);
            errorFlag = true
        }
    })

</script>
{#if loaded}
    <!-- #key necessary to restart components -->
    {#key unique}
        <div class="corpus-filtering">
            <div class="search">
                <SearchBar on:search={handleSearch} on:reset={handleReset} listChips={[...listAuthors, ...listTags]}/>
            </div>
            <div class="filters">
                <TagSelector listTags = {filters.getFiltersByType('authors', true)} filter = 'authors' on:filter-changed={handleFilterChange} on:reset-filters={handleResetFilters}/>
                <TagSelector listTags = {filters.getFiltersByType('tags', true)} filter = 'tags' on:filter-changed={handleFilterChange} on:reset-filters={handleResetFilters}/>
            </div>
            <button id="resetAll" class="btn variant-filled" on:click={resetAll} disabled>Reset all</button>
        </div>
    {/key}

    <div class="card-collection" data-testid="card-collection">
        {#if filteredBuzzwords.length === 0}
            <div class="empty-collection">
                <p>No buzzwords match your criteria</p>
            </div>
        {:else}
            {#each filteredBuzzwords as buzzword}
                <div class="card">
                    <header class="card-header">
                        {#if buzzword.date}
                            <p class="date">{daysOfTheWeek[buzzword.date.getDay()]}, {buzzword.date.getDate()} of {monthsOfTheYear[buzzword.date.getMonth()]} {buzzword.date.getFullYear()}</p>
                        {/if}
                    </header>
                    <section class="p-4"><InjectMd content = {buzzword.content}/></section>
                    <footer class="card-footer">
                        {#if buzzword.author}
                            <p class="byline">by {capitaliseFirstLetter(buzzword.author)}</p>
                        {/if}
                        {#if buzzword.tags}
                            <div class="tags">
                                {#each buzzword.tags.sort() as tag}
                                    <span class="chip variant-ghost" on:click={handleFilterClickBuzzword(tag)} on:keypress>{capitaliseFirstLetter(tag)}</span>
                                {/each}
                            </div>
                        {/if}
                    </footer>
                </div>
            {/each}
        {/if}
    </div>
{:else if errorFlag}
    <div>
        <p>Error: Something went wrong.</p>
    </div>
{:else}
    <div>
        <p>Loading...</p>
    </div>
{/if}

<style>
    /* this should be converted to Tailwind when working on the UI*/
    .card-collection {
        width: 90vw;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .card {
        max-width: 22%;
        height: fit-content;
    }

    .date {
        font-size: smaller;
    }

    .byline {
        font-size: small;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .chip {
        font-size: x-small;
    }

    .filters {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>