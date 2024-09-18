<script>
    import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let options;
    let radioValue = options.defaultValue;
    

    function handleClick() {
        dispatch('valueChange', {
            origin: options.label,
            newValue: radioValue
        })
    }
</script>


<div class="flex flex-col gap-2 font-light text-sm">
    <label for="radio-group" class="font-light text-sm pl-4"
        >{options.label}</label
    >
    <RadioGroup
        class="h-fit self-center text-white"
        background="bg-secondary-500"
        active="bg-secondary-100 text-black"
        hover="hover:bg-secondary-400 transition-all ease-in-out duration-300 motion-reduce:transition-none"
        name="radio-group"
    >
        {#each Object.entries(options.values) as [label, value]}
            <RadioItem bind:group={radioValue} name={label} value={value} on:change={handleClick}
                            >{label.toLowerCase()}</RadioItem
                        >
        {/each}
    </RadioGroup>
</div>