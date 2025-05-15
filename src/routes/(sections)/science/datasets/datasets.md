---
title: Datasets
id: science-datasets
parent: science
link: science/datasets
lead: "A data set (or dataset) is a collection of data. In the case of tabular data, a data set corresponds to one or more database tables, where every column of a table represents a particular variable, and each row corresponds to a given record of the data set in question. The data set lists values for each of the variables, such as for example height and weight of an object, for each member of the data set. Data sets can also consist of a collection of documents or files."
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
                "Dataset 2": 1
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

<TypographyLead>
    Some short copy about the experiment. Not the experimental details. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus ipsum, faucibus ut metus sed, iaculis posuere mi. Vestibulum rutrum in nisl id elementum.
</TypographyLead>

{#await data.datasets then datasets}
    <DataViewPanel datasetArray = {datasets}/>
{/await}

