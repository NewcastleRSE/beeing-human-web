<script>
    import { onMount } from 'svelte';
    import InjectMd from './InjectMD.svelte';
    import {daysOfTheWeek, monthsOfTheYear} from '../utils/generalConstants';
    import {capitaliseFirstLetter} from '../utils/stringOperations';

    import TagSelector from './TagSelector.svelte';

    export let buzzwords;
    export let listTags;
    export let listAuthors;

    let filterAuthors = [];
    let filterTags = [];

    let filteredBuzzwords = [];

    function shuffle(array) {
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

    function handleFilterChange(event) {
        if (event.detail.filter === 'authors') {
            filterAuthors = event.detail.selected;
        } else if (event.detail.filter === 'tags') {
            filterTags = event.detail.selected;
        }
        filteredBuzzwords = filterBuzzWords(filteredBuzzwords, filterAuthors, filterTags);
    }

    function filterBuzzWords(filteredBuzzwords, filterAuthors, filterTags) {
        
        if (filterAuthors.length === 0 && filterTags.length === 0) {
            // if both filters are empty, simply return the entire buzzword set
            return buzzwords
        } else if(filterAuthors.length === 0 || filterTags.length === 0) {
            // if either filter is empty, reset to the entire buzzword set
            filteredBuzzwords = buzzwords;
        }

        let filteredAuthors = filteredBuzzwords.filter(function(entry) {
            if (entry.author) {
                if (filterAuthors.length > 0 && filterAuthors.includes(entry.author)) {
                    return entry.author;
                } else if (filterAuthors.length === 0) {
                    return entry.author;
                }
            }
        });

        let filteredTags = filteredBuzzwords.filter(function(entry) {
            if (entry.tags){
                if (filterTags.length > 0 && entry.tags.some(tag => filterTags.includes(tag))) {
                    return entry.tags;
                } else if (filterTags.length === 0) {
                    return entry.tags;
                }
            }
        });

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

    onMount( () => {
        buzzwords = shuffle(buzzwords)
        filteredBuzzwords = buzzwords;
    })

</script>


<div class="filters">
    <TagSelector listTags = {listAuthors} filter = 'authors' on:filter-changed={handleFilterChange}/>
    <TagSelector listTags = {listTags} filter = 'tags' on:filter-changed={handleFilterChange}/>
</div>

<div class="card-collection">
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