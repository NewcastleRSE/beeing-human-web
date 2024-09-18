<!--
    @component
    - Creates the dropdown that switches between data sources;
    - generates the options from an object called `options`;
    - sends an event called `valueChange` everytime one of those controls changes
    
    @param options {object} - An object containing at least an object of options and their values and the value of the default value;
  -->

<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let options;

    function handleClick() {
        let newValue = document.getElementById('data-source-select').value
        dispatch('valueChange', {
            origin: options.label,
            newValue: newValue
        })
    }
</script>

<select
    name="data-source"
    id="data-source-select"
    class="select text-3xl bg-transparent border-none rounded-lg pr-16 max-w-fit font-pfdisplay hover:font-bold hover:cursor-pointer transition-all ease-in-out duration-200 motion-reduce:transition-none" on:change={handleClick}
>
    {#each Object.entries(options.values) as [label, value]}

        {#if (label === options.default)}
            <option value={value} selected>{label}</option>
        {:else}
            <option value={value}>{label}</option>
        {/if}
        
    {/each}
</select>
