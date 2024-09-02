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

<div class={$$restProps.class || "flex flex-col gap-2"} data-testid="tag-selector-container">
    {#if listTags && filter}
        <h4 class="h4 font-light text-lg">{capitaliseFirstLetter(filter)}</h4>
        <div class="flex flex-row flex-wrap gap-x-1 gap-y-2">
            {#each listTags as tag}
                <button data-testid={filter}-chip id={removeSpaces(tag.name)}-filter class="chip {tag.active ? 'variant-filled' : 'variant-filled-surface'}" on:click={handleClick(tag)} on:keypress>{filter === 'authors' ? capitaliseFirstLetter(tag.name) : tag.name}</button>
            {/each}
        </div>
        <!-- <button data-testid='tag-reset-button' id="{filter}-reset" class="btn btn-sm max-w-fit variant-filled-tertiary self-end" on:click={resetFilter} on:keypress disabled>Reset</button> -->
    {:else}
        <p>Something went wrong...</p>
    {/if}
</div>