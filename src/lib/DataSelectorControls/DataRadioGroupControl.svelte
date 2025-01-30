<!--
    @component
    - Creates the radio group that switches between different possible but contradictory options;
    - generates the options from an object called `options`;
    - sends an event called `valueChange` everytime one of those controls changes
    
    @param options {object} - An object containing at least an object of options and their values and the value of the default value;
  -->
<script>
    import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';

    import {makeHtmlId} from '../../utils/stringOperations'


    let {options, valueChange} = $props();
    let radioValue = $state(options.defaultValue);


</script>

<div class="flex flex-col gap-2 font-light text-xs md:text-sm" data-testid="radio-group-{options.label}">
    <label for="radio-group-{options.label}" class="hidden md:block font-light text-sm pl-4"
        >{options.label}</label
    >
    <RadioGroup
        class="h-fit self-center text-white"
        background="bg-secondary-500"
        active="bg-secondary-100 text-black"
        hover="hover:bg-secondary-400 transition-all ease-in-out duration-300 motion-reduce:transition-none"
        name="radio-group-{options.label}"
    >
        {#key options}
        {#each Object.entries(options.values) as [label, value]}
            <RadioItem bind:group={radioValue} name={label} value={value} onchange={() => valueChange({origin: options.label, newValue: value})} id="{makeHtmlId(options.label)}-{makeHtmlId(value)}-button"
                            >
                            {#if options.keepLabelsCase}
                                {label}
                            {:else}
                                {label.toLowerCase()}
                            {/if}
                            </RadioItem
                        >
        {/each}
        {/key}
    </RadioGroup>
</div>