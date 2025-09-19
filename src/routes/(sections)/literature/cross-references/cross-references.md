---
title: Cross-references
id: cross-references
parent: literature
link: literature/cross-references
lead: "A draft visualisation of the internal cross-referencing systems in the 1623 and 1609 editions of the Feminine Monarchie"
img: 'assets/articles/cross-references/simon-kadula-DIwC450lRGI-unsplash.jpg'
imgAlt: 'a group of bees on top of a hive-like background'
type: data
author: tiago
date: 2025/07/10
order: 4
---

<script>
    import {base} from '$app/paths'
    import ImgContainer from '$lib/ImgContainer.svelte'
    import ByLine from '$lib/ByLine.svelte'
    import NetworkGraph from '$lib/NetworkGraph.svelte'
    import DataTable from '$lib/DataTable.svelte'
    import ChordGraph from '$lib/ChordGraph.svelte'
    import TextDivider from '$lib/TextDivider.svelte'

    import AdditionalInfoBox from '$lib/AdditionalInfoBox.svelte'

    let { inputData, classicalData } = $props()

</script>

<ByLine author={author} date={date} type={type} title={title} {readingTime}/>

<AdditionalInfoBox title = 'This article is a draft'>
    
</AdditionalInfoBox>

# Cross-reference analysis for 1623

<NetworkGraph inputData = {inputData[0].xreferences}/>
<ChordGraph inputData = {inputData[0].flowMatrix}/>
<DataTable inputData = {inputData[0].nodesLinksCount}/>


<TextDivider/>


# Cross-reference analysis for 1609

<NetworkGraph inputData = {inputData[1].xreferences}/>
<ChordGraph inputData = {inputData[1].flowMatrix}/>
<DataTable inputData = {inputData[1].nodesLinksCount}/>

# References for 1623
<NetworkGraph inputData = {classicalData[0].classicalXreferences}/>

# References for 1609
<NetworkGraph inputData = {classicalData[1].classicalXreferences}/>