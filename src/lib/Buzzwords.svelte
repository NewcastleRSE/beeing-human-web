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

    // array of filter objects
    let filters = new Filters();

    let reactiveListAuthors = [];
    let reactiveListTags = [];

    let filterAuthors = [];
    let filterTags = [];

    let totalNrAuthors;
    let totalNrTags;

    // necessary to restart the filter components
    let filteredBuzzwords = [];

    let unique = {}

    function handleFilterChange(event) {
        filters = filters.toggleFilterActive(event.detail.filter);
        filteredBuzzwords = filterBuzzWords(filteredBuzzwords);
    }


    function handleResetFilters(event) {
        filters = filters.resetFilterActiveByType(event.detail.filter)
        filteredBuzzwords = filterBuzzWords(filteredBuzzwords);
    }

    function filterBuzzWords(filteredBuzzwords) {
        
        let listActiveFilterAuthors = []
        let listActiveFilterTags = []

        if (filters.allInactive()) {
            // if both filters are empty, simply return the entire buzzword set
            return buzzwords
        } else {
            // otherwise, reset the filteredBuzzwords for the entire dataset
            listActiveFilterAuthors = filters.getActiveFiltersByType('authors');
            listActiveFilterTags = filters.getActiveFiltersByType('tags')
            filteredBuzzwords = buzzwords;
        }

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

        // Gets a list of all the authors in the filtered dataset
        let listAuthors = getListOfUniqueElements(bothFilters.map(buzz => buzz.author));
        // Gets a list of all the tags available in the filtered dataset
        let listTags = getListOfUniqueElements(bothFilters.map(buzz => [...buzz.tags]).flat());
        filters = filters.updateFilterActiveStatus(listAuthors, listTags);
        
        updateFilterButtons();

        return bothFilters;
    }

    function updateFilterButtons() {
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

        try {
            const resetAllButton = document.getElementById('resetAll');

            if (filters.allInactive()) {
                resetAllButton.disabled = true;
            } else {
                resetAllButton.disabled = false;
            }
        } catch (error) {
            console.debug(`Component is still mounting, element with id resetAll does not exist yet. ${error}`);
        }
    }

    function init(shuffled) {
        if (shuffled) {
            buzzwords = shuffle(buzzwords)
        }
        filteredBuzzwords = buzzwords;
        reactiveListAuthors = listAuthors;
        reactiveListTags = listTags;
        totalNrAuthors = listAuthors.length;
        totalNrTags = listTags.length;

        for (let tag of listTags) {
            filters.addFilter(tag, 'tags');
        }

        for (let author of listAuthors) {
            filters.addFilter(author, 'authors');
        }


        // necessary to restart the filter components
        unique = {}

    }

    onMount( () => {
        init(true);
    })

    // function updateFilterButtons(rlistAuthors, rlistTags) {
    //     // Checks whether a filter button should be available or not
    //     for (let filter of filters) {
    //         try {
    //             const filterChip = document.getElementById(`${removeSpaces(filter.name)}-filter`)
    //             if (filter.available) {
    //                 filterChip.disabled = false;
    //             } else {
    //                 filterChip.disabled = true;
    //             }
    //         } catch (error) {
    //             console.debug(`Component is still mounting, element with id ${removeSpaces(filter.name)}-filter does not exist yet. ${error}`);
    //         }
    //     }

    //     // Activates or deactivates the reset all button
    //     try{
    //         const resetAllButton = document.getElementById('resetAll');

    //         if (rlistAuthors.length === totalNrAuthors && rlistTags.length === totalNrTags) {
    //             resetAllButton.disabled = true;
    //         } else {
    //             resetAllButton.disabled = false;
    //         }
    //     } catch (error) {
    //         console.debug(`Component is still mounting, element with id resetAll does not exist yet. ${error}`);
    //     }
    // }

    function handleSearch(event) {
        // set terms to lower case
        const searchTerms = event.detail.searchTerms.map(e => e.toLowerCase());

        // if there are no active filters, it will always search in the entire corpus
        if (filterTags.length === 0 && filterAuthors.length === 0) {
            filteredBuzzwords = buzzwords;
            reactiveListAuthors = listAuthors;
            reactiveListTags = listTags;
        }

        // establish whether the search terms are filters
        const filtersToCheck = checkSearchTagsAuthors(searchTerms, reactiveListAuthors, reactiveListTags);

        // if the search terms are in either the authors or tags
        if (Object.keys(filtersToCheck).length > 0) {
            let listAuthors = [...filterAuthors];
            let listTerms = [...filterTags];
            if (Object.keys(filtersToCheck).includes('authors')) {
                listAuthors = filtersToCheck['authors'];
            }
            if (Object.keys(filtersToCheck).includes('terms')) {
                listTerms = filtersToCheck['terms'];
            }

            // filter the displayed buzzwords
            filteredBuzzwords = filterBuzzWords(filteredBuzzwords, listAuthors, listTerms);
        }

        // Full text search
        let fullTextResults = fullTextSearch(filteredBuzzwords, event.detail.searchString, searchTerms);
        if (fullTextResults.length > 0) {
            filteredBuzzwords = fullTextResults
        } else if (fullTextResults.length == 0 && Object.keys(filtersToCheck).length == 0){
            filteredBuzzwords = [];
        }
    }

    function handleReset() {
        // resets to show the entire dataset
        filteredBuzzwords = buzzwords;
    }

    function resetAll() {
        init(false);
    }

    // $: {
    //     if (filterTags.length === 0 && filterAuthors.length >= 1) {
    //         reactiveListTags = getListOfUniqueElements(filteredBuzzwords.map(entry=>entry.tags).flat());
    //     } else if (filterAuthors.length === 0 && filterTags.length >= 1) {
    //         // because filtering by tags is subtractive, everytime one tag is selected, the available filters should be reduced
    //         reactiveListAuthors = getListOfUniqueElements(filteredBuzzwords.map(entry => entry.author));
    //         reactiveListTags = getListOfUniqueElements(filteredBuzzwords.map(entry=>entry.tags).flat());
    //     } else if (filterAuthors.length >= 1) {
    //         reactiveListTags = getListOfUniqueElements(filteredBuzzwords.map(entry=>entry.tags).flat());
    //     } else if (filterTags.length >= 1 ) {
    //         reactiveListAuthors = getListOfUniqueElements(filteredBuzzwords.map(entry => entry.author));
    //     } else if (filteredBuzzwords.length < buzzwords.length) {
    //         // adjusts filter availability if a search has been made
    //         reactiveListAuthors = getListOfUniqueElements(filteredBuzzwords.map(entry => entry.author));
    //         reactiveListTags = getListOfUniqueElements(filteredBuzzwords.map(entry=>entry.tags).flat());
    //     } else {
    //         reactiveListAuthors = listAuthors;
    //         reactiveListTags = listTags;
    //     }
    //     // ensures active filters are always included, even if they are note present in the filtered buzzwords
    //     reactiveListAuthors = getListOfUniqueElements([...reactiveListAuthors, ...filterAuthors]);
    //     reactiveListTags = getListOfUniqueElements([...reactiveListTags, ...filterTags]);

    //     // activates or deactivates the filter buttons accordingly
    //     // updateFilterButtons(reactiveListAuthors, reactiveListTags);

    // }

</script>

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

<div class="card-collection">
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
                            {#each buzzword.tags as tag}
                                <span class="chip variant-ghost">{capitaliseFirstLetter(tag)}</span>
                            {/each}
                        </div>
                    {/if}
                </footer>
            </div>
        {/each}
    {/if}
</div>

<style>
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