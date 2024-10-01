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

    import { activeDataset, activeView } from '../stores/dataViewer'
    import { parse } from "svelte/compiler";
    import { compute_rest_props } from "svelte/internal";

    export let controlsArray = [
        {
            dataSource: true,
            type: "select",
            label: 'dataSource',
            default: "1623",
            values: {
                "1623": "link to 1623",
                "1609": "link to 1609",
                "1634": "link to 1634",
            },
        },
        {
            dataSource: false,
            type: "radioGroup",
            label: "view",
            defaultValue: 'both',
            values: {
                facsimile: 'facsimile',
                both: 'both',
                transcription: 'transcription',
            },
        },
        {
            dataSource: false,
            type: "radioGroup",
            label: "variation",
            defaultValue: 'Major Changes',
            values: {
                "no variation": 'no variation',
                "Major Changes": 'Major Changes',
                "All Changes": 'All Changes',
            },
        },
        {
            dataSource: false,
            type: "toggle",
            label: "editorial notes",
            values: {
                default: false,
            },
        },
    ];

    function updateDataSource(e) {
        let returnValue = e.detail.newValue
        
        if (!isNaN(e.detail.newValue)){
            returnValue = parseInt(e.detail.newValue)
        }
        
        activeDataset.update(() => (returnValue))
    }

    function updateOtherFilters(e) {
        if (e.detail.origin === 'view') {
            activeView.update(() => (e.detail.newValue))
        }
    }

</script>

<form
    class="flex flex-col md:flex-row w-full bg-primary-400 items-center md:justify-between md:content-center md:px-12 py-10 gap-2"
>
    <!-- Data source selector goes here -->
     {#each controlsArray as controlOptions}
        {#if (controlOptions.dataSource)}
            <DataSourceControl options = {controlOptions} on:valueChange={updateDataSource}/>
        {/if}
     {/each}
    <div class="flex gap-10 content-center gap-32">
        <!-- Other controls go here -->
         {#each controlsArray as controlOptions}
            {#if (!controlOptions.dataSource)}
                {#if (controlOptions.type === "radioGroup")}
                    <DataRadioGroupControl options={controlOptions} on:valueChange={updateOtherFilters} />
                {:else if (controlOptions.type === "toggle")}
                    <DataSlideToggle options = {controlOptions} on:valueChange/>
                {/if}
            {/if}
            
         {/each}
    </div>
</form>
