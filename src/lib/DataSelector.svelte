<!--
    @component
    - Creates the options bar that goes above any direct exploration of data;
    - generates the controls from a JSON object called `controlsArray`, see default object for the structure;
    -forwards an event called `valueChange` everytime one of those controls changes
    
    @param controlsArray {array} - An array of objects containig options for each control to be added
  -->

<script>
    import DataSourceControl from "$lib/DataSelectorControls/DataSourceControl.svelte";
    import DataRadioGroupControl from "$lib/DataSelectorControls/DataRadioGroupControl.svelte";
    import DataSlideToggle from "$lib/DataSelectorControls/DataSlideToggle.svelte";

    import { dataViewerState } from "../stores/dataViewer.svelte";
    import { onMount } from "svelte";

    let { controlsArray } = $props();

    function updateDataSource(changeObject) {
        let returnValue = changeObject.newValue;

        if (!isNaN(changeObject.newValue)) {
            returnValue = parseInt(changeObject.newValue);
        }

        dataViewerState.activeDataset = returnValue;
    }

    function updateOtherFilters(changeObject) {
        if (changeObject.origin === "view") {
            dataViewerState.activeView = changeObject.newValue;
        }

        if (changeObject.origin === "variation") {
            dataViewerState.variationDetail = changeObject.newValue;
        }

        if (changeObject.origin === "editorial notes") {
            dataViewerState.editorialNotes = changeObject.newValue;
        }
    }

    onMount(() => {
        // reset state to defaults:
        dataViewerState.activeDataset = 0;
        dataViewerState.activeView = "details";
        dataViewerState.variationDetail = "no variation";
        dataViewerState.editorialNotes = false;
    });
</script>

{#key dataViewerState}
<form
    class="flex flex-col md:flex-row w-full bg-primary-400 items-center md:justify-between md:content-center md:px-12 py-10 gap-2"
>
{console.log(controlsArray)}
    <!-- Data source selector goes here -->
    {#each controlsArray as controlOptions}
        {#if controlOptions.dataSource}
            <DataSourceControl
                options={controlOptions}
                valueChange={(changeObject) => updateDataSource(changeObject)}
            />
        {/if}
    {/each}
    <div
        class="flex flex-col md:flex-row items-center md:content-center gap-4 md:gap-32"
    >
        <!-- Other controls go here -->
        {#each controlsArray as controlOptions}
            {#if !controlOptions.dataSource}
                {#if controlOptions.type === "radioGroup"}
                    <DataRadioGroupControl
                        options={controlOptions}
                        valueChange={(changeObject) =>
                            updateOtherFilters(changeObject)}
                    />
                {:else if controlOptions.type === "toggle"}
                    <DataSlideToggle
                        options={controlOptions}
                        valueChange={(changeObject) =>
                            updateOtherFilters(changeObject)}
                    />
                {/if}
            {/if}
        {/each}
    </div>
</form>
{/key}
