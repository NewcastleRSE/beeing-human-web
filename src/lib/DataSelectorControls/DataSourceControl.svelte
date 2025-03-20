<!--
    @component
    - Creates the dropdown that switches between data sources;
    - generates the options from an object called `options`;
    - sends an event called `valueChange` everytime one of those controls changes
    
    @param options {object} - An object containing at least an object of options and their values and the value of the default value;
  -->

<script>
    import { onMount } from "svelte";

    let {options, valueChange, currentValue} = $props();

    let selected = $state(undefined);

    function handleClick(valueChange) {
        let newValue = document.getElementById('data-source-select').value
        valueChange({
            origin: options.label,
            newValue: newValue
        });
    }

    onMount(() => {
        // checks to see if the current value of is in options.values
        let validValues = []
        for (const val of Object.values(options.values)) {
            validValues.push(parseInt(val))
        }

        console.log(validValues, currentValue)

        if (currentValue && validValues.includes(currentValue)) {
            if (currentValue > 1000) {
                // i.e., if the value is a year
                selected = currentValue.toString()
            } else {
                // else, the value is an index
                selected = currentValue
            }
        } else {
            selected = options.default
        }
    })

</script>

<select
    name="data-source"
    id="data-source-select"
    class="select text-lg md:text-3xl bg-transparent border-none rounded-lg pr-10 md:pr-16 max-w-fit font-pfdisplay hover:font-bold hover:cursor-pointer transition-all ease-in-out duration-200 motion-reduce:transition-none" bind:value={selected} onchange={() => handleClick(valueChange)}
>
    {#key options.values}
    {#each Object.entries(options.values) as [label, value]}
        <option value={value}>{label}</option>
    {/each}
    {/key}
</select>
