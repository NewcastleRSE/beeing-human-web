---
title: Datasets
id: science-datasets
parent: science
link: science/datasets
lead: "Here you will find the raw data for some of the experiments we ran in the bee lab, for you to explore in various forms, validate our interpretations, and draw your own conclusions."
img: 'assets/pexels-murillohm-10854279.jpg'
imgAlt: 'a neatly arranged pile of wood'
type: data
dataSelector: true
dataSelectorControls: [{
            dataSource: true,
            type: "select",
            label: 'dataSource',
            default: 0,
            values: {
                "Dataset 1": 0,
            },
        },
        {
            dataSource: false,
            type: "radioGroup",
            label: "view",
            defaultValue: 'details',
            values: {
                details: 'details',
                visualisation: 'visualisation',
                summary: 'summary',
                data: 'data'
            },
        }]
layout: false
---
<script>
    import DataViewPanel from '$lib/DataViewPanel.svelte'
    import Portal from '$lib/Portal.svelte'
    import TypographyLead from '$lib/TypographyLead.svelte'
    import { onMount } from 'svelte'
    import {elementReady} from '../../../../utils/generalHelpers.js'
    import {dataViewerState} from '../../../../stores/dataViewer.svelte'

    let { data } = $props()

</script>

<!-- <TypographyLead>
    Some short copy about the experiment. Not the experimental details. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus ipsum, faucibus ut metus sed, iaculis posuere mi. Vestibulum rutrum in nisl id elementum.
</TypographyLead> -->

{#await data.datasets then datasets}
    <DataViewPanel datasetArray = {datasets}/>
{/await}

