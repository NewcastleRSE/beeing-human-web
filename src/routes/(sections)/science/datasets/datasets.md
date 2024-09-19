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
            default: "Dataset 1",
            values: {
                "Dataset 1": "link to dataset1",
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
    export let data

    import DataViewPanel from '$lib/DataViewPanel.svelte'
    import Portal from '$lib/Portal.svelte'
    import TypographyLead from '$lib/TypographyLead.svelte'
    import { onMount } from 'svelte'
    import {elementReady} from '../../../../utils/generalHelpers.js'
    import { activeDataset, activeView } from '../../../../stores/dataViewer.js'

    onMount( () => {
        elementReady('#data-source-select').then((e) => {
            while (e.firstChild) {
                e.removeChild(e.firstChild);
            }
            for (let i = 0; i < data.datasets.length; i++) {
                let option = document.createElement('option');
                option.text = data.datasets[i].desc.metadata.title
                option.value = i
                e.add(option)
            }

        })
    })

</script>

<TypographyLead>
    Some short copy about the experiment. Not the experimental details. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus ipsum, faucibus ut metus sed, iaculis posuere mi. Vestibulum rutrum in nisl id elementum.
</TypographyLead>

{#await data.datasets then datasets}
    <DataViewPanel datasets = {[datasets[$activeDataset]]}/>
{/await}

