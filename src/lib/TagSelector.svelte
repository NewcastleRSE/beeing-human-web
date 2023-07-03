<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let listTags;
    export let filter;
    let selectedTags = [];

    // Need to fire an event when the array changes, and use that to filter the buzzwords being shown in the parent component
    // $: console.log(`${filter}: ${selectedTags}`);
    $: {
        dispatch('filter-changed', {
            filter: filter,
            selected: selectedTags
        });
    }

    function handleClick(tag) {
        if (selectedTags.includes(tag)) {
            selectedTags = selectedTags.filter(entry => entry != tag);
        } else {
            selectedTags = [...selectedTags, tag];
        }
    }
</script>

<div class="tag-selector-container">
    {#each listTags as tag}
        <span class="chip {selectedTags.includes(tag) ? 'variant-filled' : 'variant-soft'}" on:click={handleClick(tag)} on:keypress>{tag}</span>
    {/each}
</div>

<style>
    .tag-selector-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        width: 70%;
    }
</style>