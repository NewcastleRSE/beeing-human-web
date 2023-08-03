<script>
    import {createEventDispatcher} from 'svelte';
    import { capitaliseFirstLetter, removeSpaces } from '../utils/stringOperations';

    const dispatch = createEventDispatcher();

    export let listTags;
    export let filter;
    let selectedTags = [];

    // Need to fire an event when the array changes, and use that to filter the buzzwords being shown in the parent component
    // $: console.log(`${filter}: ${selectedTags}`);
    $: {
        // dispatch('filter-changed', {
        //     filter: filter,
        //     selected: selectedTags
        // });
    }

    function handleClick(tag) {
        dispatch('filter-changed', {
            filter: tag
        });

        if (selectedTags.includes(tag)) {
            selectedTags = selectedTags.filter(entry => entry != tag);
        } else {
            selectedTags = [...selectedTags, tag];
        }
        
        updateResetButton();

    }

    function updateResetButton() {
        // enable or disable reset button
        const resetButton = document.getElementById(`${filter}-reset`);
        if (selectedTags.length > 0) {
            resetButton.disabled = false;
        } else {
            resetButton.disabled = true;
        }
    }

    function resetFilter () {
        selectedTags = [];
        dispatch('reset-filters', {filter: filter});
        updateResetButton();
    }
</script>

<div class="tag-selector-container">
    <h4>{filter}</h4>
    {#each listTags as tag}
        <button id={removeSpaces(tag.name)}-filter class="chip {tag.active ? 'variant-filled' : 'variant-soft'}" on:click={handleClick(tag)} on:keypress>{filter === 'authors' ? capitaliseFirstLetter(tag.name) : tag.name}</button>
    {/each}
    <button id="{filter}-reset" class="chip variant-filled-surface" on:click={resetFilter} on:keypress disabled>Reset</button>
</div>

<style>
    .tag-selector-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        width: 70%;
    }

    .tag-selector-container h4 {
        width: 100%;
    }
</style>