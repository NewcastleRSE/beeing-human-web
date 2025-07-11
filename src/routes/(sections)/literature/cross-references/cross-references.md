---
title: Cross-references
id: cross-references
parent: literature
link: literature/cross-references
lead: "something something something"
img: 'assets/articles/book-hive/hive-fp.jpg'
imgAlt: 'detail of the Feminine Monarchie frontespiece (1623) showing an illustration of a hive: a stylised series of hexagons with a few oversized bees over it. Around the hive the words: Solertia et Labore; below: Socordiam Lvimvs'
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

    let { inputData } = $props()

</script>

<ByLine author={author} date={date} type={type} title={title}/>

# Cross-reference analysis for 1623

<NetworkGraph inputData = {inputData[0].xreferences}/>
<ChordGraph inputData = {inputData[0].flowMatrix}/>
<DataTable inputData = {inputData[0].nodesLinksCount}/>


<TextDivider/>


# Cross-reference analysis for 1609

<NetworkGraph inputData = {inputData[1].xreferences}/>
<ChordGraph inputData = {inputData[1].flowMatrix}/>
<DataTable inputData = {inputData[1].nodesLinksCount}/>