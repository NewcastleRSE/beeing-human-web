<script>
    import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';
    export let options;
    let radioValue = options.defaultValue;

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
            <RadioItem bind:group={radioValue} name={label} value={value}
                            >{label.toLowerCase()}</RadioItem
                        >
        {/each}
    </RadioGroup>
</div>