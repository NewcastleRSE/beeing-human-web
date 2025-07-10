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

    let { data } = $props()
</script>

<ByLine author={author} date={date} type={type} title={title}/>

<NetworkGraph inputData = {data.xreferences}/>
<ChordGraph inputData = {data.flowMatrix}/>
<DataTable inputData = {data.nodesLinksCount}/>