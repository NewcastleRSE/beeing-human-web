<!--@component
    Component to display datasets in various forms, including a complete data table, a table with summary data, visualisation(s), and a narrative description of the experimental details.

    properties:

    `datasets`: an **array** of datasets in json format.

 -->

<script>
    import { onMount } from "svelte";
    import RawDataTable from "./RawDataTable.svelte";
    import GroupSelector from "./GroupSelector.svelte";
    import DataViz from "./DataViz.svelte";
    import InjectMD from "./InjectMD.svelte";
    import { getGroups } from "../utils/sciDataHelper";

    import { activeView } from "../stores/dataViewer";
    import GraphControls from "./GraphControls.svelte";

    export let dataset;

    let selected = "All";
    let loaded = false;

    // Error codes
    // 0 = all good
    // 1 = No data received
    let error = 0;

</script>

<div class="md:w-2/3 m-auto">
    {#if error == 0}
        {#if $activeView === "data"}
            <GraphControls
            >
                <GroupSelector
                    groups={getGroups("Treatment group", dataset.data)}
                    name={"Treatment group"}
                    bind:selected
                />
            </GraphControls>

            <RawDataTable
                tableObject={{ data: dataset.data, columns: dataset.columns }}
                {selected}
            />
        {:else if $activeView === "summary"}
            <GraphControls>
                <GroupSelector
                groups={getGroups("Treatment group", dataset.data)}
                name={"Treatment group"}
                bind:selected
                />
            </GraphControls>
            <RawDataTable
                tableObject={{
                    data: dataset.summaryData,
                    columns: dataset.summaryColumns,
                }}
                {selected}
            />
        {:else if $activeView === "visualisation"}
            <DataViz
                dataObject={{
                    data: dataset.summaryData,
                    labels: dataset.summaryColumns,
                }}
                bind:selected
                name={dataset.desc.metadata.title}
                rawData={dataset.data}
                groups={getGroups("Treatment group", dataset.data)}
            />
        {:else if $activeView === "details"}
            <InjectMD content={dataset.desc.content} />
        {/if}
    {:else if error == 1}
        <p class="error-message">Error: no data available</p>
    {/if}
</div>
