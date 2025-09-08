<script>
    import { onMount } from "svelte";
    import {
        getListOfUniqueElements,
    } from "../utils/stringOperations";

    import {
        checkSearchTagsAuthors,
        fullTextSearch,
        shuffle,
    } from "../utils/BuzzwordsHelper";

    import { elementReady } from "../utils/generalHelpers";

    import { Filters } from "../classes/Filters.svelte";

    import TagSelector from "./TagSelector.svelte";
    import SearchBar from "./SearchBar.svelte";
    import BuzzwordCard from "./BuzzwordCard.svelte";
    import TextDivider from "$lib/TextDivider.svelte";
    
    import { slide } from "svelte/transition";
    import { expoInOut } from 'svelte/easing';

    let {buzzwords, listTags, listAuthors, people} = $props();

    // Does not create the template until it is loaded
    let loaded = $state(false);
    let errorFlag = $state(false);

    // array of filter objects
    let filters = $state(new Filters());

    // this is the array of buzzwords to be displayed -- it will be equal to the received buzzwords at init
    let filteredBuzzwords = $state([]);


    // Event handling changes

    function handleFilterChange(tag) {
        // Triggers when a filter button is clicked
        filters = filters.toggleFilterActive(tag);
        // buzzword filtering is handled by this first level function
        filteredBuzzwords = filterBuzzWords(tag);
    }

    function handleResetFilters(event) {
        // triggers when a filter reset button is clicked
        // resets all filter buttons of the same type and refilters the dataset
        filters = filters.resetFilterActiveByType(event.detail.filter);
        filteredBuzzwords = filterBuzzWords(filteredBuzzwords);
    }

    function handleReset() {
        // triggered by submitting an empty search
        // resets to show the entire dataset to whatever filter selection existed before the search
        filteredBuzzwords = filterBuzzWords(buzzwords);
    }

    function handleSearch(searchObject) {

        // triggered when receiving a 'search' event from 'SearchBar.svelte'
        // set terms to lower case
        const searchTerms = searchObject.searchTerms.map((e) =>
            e.toLowerCase()
        );

        // if there are no active filters, it will always search in the entire corpus
        if (filters.allInactive()) {
            filteredBuzzwords = buzzwords;
        }

        // establish whether the search terms are filters
        const filtersToCheck = checkSearchTagsAuthors(
            searchTerms,
            filters.getAvailableFiltersByType("authors"),
            filters.getAvailableFiltersByType("tags")
        );

        // if the search terms are filters in either the authors or tags
        if (Object.keys(filtersToCheck).length > 0) {
            let listAuthors = [];
            let listTags = [];
            if (Object.keys(filtersToCheck).includes("authors")) {
                listAuthors = filtersToCheck["authors"];
            }
            if (Object.keys(filtersToCheck).includes("tags")) {
                listTags = filtersToCheck["tags"];
            }

            // filter the displayed buzzwords
            filteredBuzzwords = reduceBuzzwordsByFilter(
                filteredBuzzwords,
                listAuthors,
                listTags
            );
        }

        // Full text search
        let fullTextResults = fullTextSearch(
            filteredBuzzwords,
            searchObject.searchString,
            searchTerms
        );
        if (fullTextResults.length > 0) {
            filteredBuzzwords = fullTextResults;
        } else if (
            fullTextResults.length == 0 &&
            Object.keys(filtersToCheck).length == 0
        ) {
            filteredBuzzwords = [];
        }

        // Gets a list of all the authors in the filtered dataset
        let availableAuthors = getListOfUniqueElements(
            filteredBuzzwords.map((buzz) => buzz.author)
        );
        // Gets a list of all the tags available in the filtered dataset
        let availableTags = getListOfUniqueElements(
            filteredBuzzwords.map((buzz) => [...buzz.tags]).flat()
        );
        // updates filter availability based on filtered dataset
        filters = filters.updateFilterAvailableStatus(
            availableAuthors,
            availableTags
        );
    }

    // First level filtering functions

    function filterBuzzWords(filteredBuzzwords) {
        // First level function to filter buzzwords dataset
        // This is triggered when an user clicks on one of the filter buttons
        // The actual data filtering happens in the second level function 'reduceBuyzzwordsByFilter'
        let listActiveFilterAuthors = [];
        let listActiveFilterTags = [];

        if (filters.allInactive()) {
            // if both filters are empty:
            // -- reset filter availability (all available)
            filters.resetFiltersAvailableStatus();
            // -- return the initial dataset
            return buzzwords;
        } else {
            // otherwise, reset the filteredBuzzwords for the entire dataset
            listActiveFilterAuthors = filters.getActiveFiltersByType("authors");
            listActiveFilterTags = filters.getActiveFiltersByType("tags");
            filteredBuzzwords = buzzwords;
        }

        // Reduce the dataset based on selected filters
        let bothFilters = reduceBuzzwordsByFilter(
            filteredBuzzwords,
            listActiveFilterAuthors,
            listActiveFilterTags
        );

        // Gets a list of all the authors in the filtered dataset
        let listAuthors = getListOfUniqueElements(
            bothFilters.map((buzz) => buzz.author)
        );
        // Gets a list of all the tags available in the filtered dataset
        let listTags = getListOfUniqueElements(
            bothFilters.map((buzz) => [...buzz.tags]).flat()
        );

        // updates UI to show available filters on the reduced dataset
        filters = filters.updateFilterAvailableStatus(listAuthors, listTags);

        return bothFilters;
    }

    // second level filtering functions

    function reduceBuzzwordsByFilter(
        filteredBuzzwords,
        listActiveFilterAuthors,
        listActiveFilterTags
    ) {
        // Second level function that takes in two lists of active filters, reduces the dataset based on those filters, and returns the result

        // Filtering authors is additive -- i.e., the more filters you select, the more results you will get (i.e., all posts of author x plus all posts of author y)
        let filteredAuthors = filteredBuzzwords.filter(function (entry) {
            if (entry.author) {
                if (
                    listActiveFilterAuthors.length > 0 &&
                    listActiveFilterAuthors.includes(entry.author)
                ) {
                    return entry.author;
                } else if (listActiveFilterAuthors.length === 0) {
                    return entry.author;
                }
            }
        });

        // Filtering tags is subtractive -- i.e., the more filters you select, the less results you have (i.e., i.e., all posts with tag x and tag y) -- still not sure if this is the more intuitive solution
        let filteredTags = [];
        for (let buzzword of filteredBuzzwords) {
            if (
                buzzword.tags &&
                listActiveFilterTags.every((tag) => buzzword.tags.includes(tag))
            ) {
                filteredTags.push(buzzword);
            }
        }

        // Collates the results for both filters
        let bothFilters = [];
        if (
            filteredAuthors.length < filteredBuzzwords.length &&
            filteredTags.length < filteredBuzzwords.length
        ) {
            bothFilters = filteredAuthors.filter((entry) =>
                filteredTags.includes(entry)
            );
        } else if (filteredAuthors.length < filteredBuzzwords.length) {
            bothFilters = filteredAuthors;
        } else if (filteredTags.length < filteredBuzzwords.length) {
            bothFilters = filteredTags;
        } else if (
            filteredAuthors.length === filteredBuzzwords.length &&
            filteredTags.length === filteredBuzzwords.length
        ) {
            bothFilters = filteredBuzzwords;
        }

        return bothFilters;
    }


    // initialisation functions

    function init(shuffled = true) {
        // Called onMount and whenever there is a reset all
        // Resets the dataset to the original, resets filters to their initial state, and creates a new UI for filtering and search
        if (shuffled) {
            buzzwords = shuffle(buzzwords);
        }
        filteredBuzzwords = buzzwords;

        // resets filter to initial state;
        filters.resetFilters();

        // necessary to restart the filter components
    }


    function toggleFilterMenu() {
        if (windowWidth <= 756) {
            filterMenuShow = !filterMenuShow;
        }
    }

    onMount(() => {
        // Fills the filters object
        try {
            if (
                listAuthors.length == 0 ||
                listTags.length == 0 ||
                buzzwords.length == 0
            ) {
                throw new Error("No data received");
            }

            for (let tag of listTags) {
                filters.addFilter(tag, "tags");
            }

            for (let author of listAuthors) {
                filters.addFilter(author, "authors");
            }
            init();
            loaded = true;
        } catch (error) {
            console.debug(`There has been an error: ${error}`);
            errorFlag = true;
        }

        if (window.location.hash) {
            elementReady(window.location.hash).then(() => {
                document
                    .getElementById(window.location.hash.substring(1))
                    .scrollIntoView();
            });
        }
    });

    let windowWidth = $state(0);
    let filterMenuShow = $derived(() => {
        if (windowWidth > 756) {
            return true;
        } else {
            return false;
        }
    })

</script>

{@debug people}

<svelte:window bind:innerWidth={windowWidth} />

{#if loaded}
    <!-- #key necessary to restart components -->
    <div class="flex flex-col md:flex-row gap-10">
        {#key filters}
            <div
                class="flex flex-col md:basis-1/4 justify-between gap-4 md:gap-8 md:justify-start items-center"
            >
                <div class="search full">
                    <SearchBar
                        search={(searchObject) => handleSearch(searchObject)}
                        reset={() => handleReset()}
                        listChips={[...listAuthors, ...listTags]}
                    />
                </div>
                <TextDivider class="hidden md:block md:max-w-md" />
                <div class="filters flex flex-col gap-4 items-center">
                    {#if windowWidth <= 756}
                        <button
                            class="h3 font-medium cursor-pointer md:cursor-auto"
                            onclick={toggleFilterMenu}
                        >
                            Filters <span class="md:hidden"
                                >{#if !filterMenuShow}+{:else}-{/if}</span
                            >
                        </button>
                    {:else}
                        <h3
                        class="h3 font-medium cursor-pointer md:cursor-auto"
                    >
                        Filters <span class="md:hidden"
                            >{#if !filterMenuShow}+{:else}-{/if}</span
                        >
                    </h3>
                    {/if}
                    {#if filterMenuShow}
                        <div class="flex flex-col gap-4" transition:slide={{ duration: 800, easing:expoInOut}}>
                            <TagSelector
                                listTags={filters.getFiltersByType("authors", true)}
                                filter="authors"
                                handleClick={(tag) => {handleFilterChange(tag)}}
                                on:reset-filters={handleResetFilters}
                            />
                            <TagSelector
                                listTags={filters.getFiltersByType("tags", true)}
                                filter="tags"
                                handleClick={(tag) => handleFilterChange(tag)}
                                on:reset-filters={handleResetFilters}
                            />
                        </div>
                    {/if}
                </div>
                <!-- <button id="resetAll" class="btn variant-filled" on:click={resetAll} disabled>Reset all</button> -->
            </div>
        {/key}

        <div class="w-full">
            <div
                class="card-collection flex flex-col max-w-4xl gap-8 m-auto"
                data-testid="card-collection"
            >
                {#if filteredBuzzwords.length === 0}
                    <div class="empty-collection">
                        <p>No buzzwords match your criteria</p>
                    </div>
                {:else}
                    {#each filteredBuzzwords as buzzword (buzzword.id)}
                        <BuzzwordCard
                            {buzzword}
                            handleFilterClickBuzzword={(tag) => handleFilterChange(filters.getFiltersByName(tag))}
                        />
                    {/each}
                {/if}
            </div>
        </div>
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
    /* deactivates svelte's animations for users that have prefers reduced motion active */
    @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      animation-delay: 0.01ms !important;
    }
  }
</style>