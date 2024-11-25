<!--
    @component
    - Creates the dropdown that switches between data sources;
    - generates the options from an object called `options`;
    - sends an event called `valueChange` everytime one of those controls changes
    
    @param options {object} - An object containing at least an object of options and their values and the value of the default value;
  -->

<script>
    import { dataViewerState } from "../../stores/dataViewer.svelte";

    let {options, valueChange} = $props();

    let selected = $state(options.default);

    function handleClick(valueChange) {
        let newValue = document.getElementById('data-source-select').value
        valueChange({
            origin: options.label,
            newValue: newValue
        });
    }


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
