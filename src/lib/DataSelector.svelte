<script>
    import DataSourceControl from "$lib/DataSelectorControls/DataSourceControl.svelte";
    import DataRadioGroupControl from "$lib/DataSelectorControls/DataRadioGroupControl.svelte";
    import DataSlideToggle from "$lib/DataSelectorControls/DataSlideToggle.svelte";

    export let controlsArray = [
        {
            dataSource: true,
            type: "select",
            label: undefined,
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

    console.log(controlsArray);
</script>

<form
    class="flex flex-row w-full bg-primary-400 justify-between content-center px-12 py-10"
>
    <!-- Data source selector goes here -->
     {#each controlsArray as controlOptions}
        {#if (controlOptions.dataSource)}
            <DataSourceControl options = {controlOptions}/>
        {/if}
     {/each}
    <div class="flex gap-10 content-center gap-32">
        <!-- Other controls go here -->
         {#each controlsArray as controlOptions}
            {#if (!controlOptions.dataSource)}
                {#if (controlOptions.type === "radioGroup")}
                    <DataRadioGroupControl options={controlOptions}/>
                {:else if (controlOptions.type === "toggle")}
                    <DataSlideToggle options = {controlOptions}/>
                {/if}
            {/if}
            
         {/each}
    </div>
</form>
