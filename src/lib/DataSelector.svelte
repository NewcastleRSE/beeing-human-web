<script>
    import { SlideToggle } from "@skeletonlabs/skeleton";

    import DataSourceControl from "$lib/DataSourceControl.svelte";
    import DataRadioGroupControl from "$lib/DataRadioGroupControl.svelte";

    let radioValue = 0;
    let slideValue = false;

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
            values: {
                'facsimile': 0,
                'both': 1,
                'transcription': 2,
            },
        },
        {
            dataSource: false,
            type: "radioGroup",
            label: "variation",
            values: {
                'no variation': 0,
                'Major Changes': 1,
                'All Changes': 2,
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
    <DataSourceControl options={{
        "1623": "link to 1623",
        "1609": "link to 1609",
        "1634": "link to 1634",
    }} defaultValue="1623"/>
    <div class="flex gap-10 content-center gap-32">
        
        <DataRadioGroupControl options={{
            dataSource: false,
            type: "radioGroup",
            label: "view",
            defaultValue: 'both',
            values: {
                'facsimile': 'facsimile',
                'both': 'both',
                'transcription': 'transcription',
            },
        }}/>

        <div
            class="flex flex-col gap-2 font-light text-sm min-w-32 justify-center"
        >
            <label for="slide" class="font-light text-sm pl-2">Label</label>
            <SlideToggle
                name="slide"
                bind:checked={slideValue}
                size="lg"
                background="bg-secondary-500"
                active="bg-secondary-100"
                >{!slideValue ? "off" : "on"}</SlideToggle
            >
        </div>
    </div>
</form>
