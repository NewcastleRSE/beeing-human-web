<script>
    import {createEventDispatcher} from 'svelte';
    import { capitaliseFirstLetter, removeSpaces } from '../utils/stringOperations';

    const dispatch = createEventDispatcher();

    export let listTags; // 'Filters' class
    export let filter; // The name of the filter (for UI)
    // let selectedTags = [];

    function handleClick(tag) {
        // sends an event to the parent that a filter has been selected or deselected
        dispatch('filter-changed', {
            filter: tag
        });

        // Keeps a running tally of the currently selected filters -- leaving it here for future reference in case it's useful
        // if (selectedTags.includes(tag)) {
        //     selectedTags = selectedTags.filter(entry => entry != tag);
        // } else {
        //     selectedTags = [...selectedTags, tag];
        // }
        
        // This is now handled by the parent component
        // updateResetButton();

    }

    // this is now handled by the parent component, but will leave it here in case it becomes useful in the future
    // moving this to the parent component was the simplest solution to allow filters to be selected from the buzzword itself and keeping this functional
    // function updateResetButton() {
    //     // enable or disable reset button
    //     const resetButton = document.getElementById(`${filter}-reset`);
    //     if (selectedTags.length > 0) {
    //         resetButton.disabled = false;
    //     } else {
    //         resetButton.disabled = true;
    //     }
    // }

    function resetFilter () {
        // fires a reset event to be picked up by parent component
        // selectedTags = [];
        dispatch('reset-filters', {filter: filter});
        // this is now handled by the parent component
        // updateResetButton();
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