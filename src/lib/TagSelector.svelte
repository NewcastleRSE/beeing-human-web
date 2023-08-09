<script>
    import {createEventDispatcher} from 'svelte';
    import { capitaliseFirstLetter, removeSpaces } from '../utils/stringOperations';

    const dispatch = createEventDispatcher();

    export let listTags; // 'Filters' class
    export let filter; // The name of the filter (for UI)
    let selectedTags = [];

    function handleClick(tag) {
        // sends an event to the parent that a filter has been selected or deselected
        dispatch('filter-changed', {
            filter: tag
        });

        // Keeps a running tally of the currently selected filters -- only used for UI to enable or disable the reset button, but it may be useful later
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
        // fires a reset event to be picked up by parent component
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