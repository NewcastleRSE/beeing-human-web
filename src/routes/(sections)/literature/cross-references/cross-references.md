---
title: Cross-references
id: cross-references
parent: literature
link: literature/cross-references
lead: "A series of draft visualisations of the internal cross-referencing systems in the 1623 and 1609 editions of *The Feminine Monarchie*"
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

    import Portal from '$lib/Portal.svelte'

    let { inputData, classicalData } = $props()

</script>

<div id="article-body"class="max-w-4xl mx-auto flex flex-col gap-3 leading-relaxed">
    

<ByLine author={author} date={date} type={type} title={title} {readingTime}/>

<AdditionalInfoBox title = 'This article is a draft'>
N.B.: As the visualisations are generated on demand, they might take a little time to load and be usable. The shape of the network visualisations will also be slightly different each time the page is loaded. This page is not optmised for mobile navigation and is best viewed on a desktop.
</AdditionalInfoBox>

In encoding Butler's *The Feminine Monarchie*, one of the most striking features is the presence of extensive marginalia, many of which <Portal id="cross-references-1" type="origin" destination={['literature/digital-thoughts#digital-thoughts-1', 'about/introduction#introduction-2', 'literature/born-digital-edition#born-digital-edition-1']}>cross-reference other sections of Butler's own text</Portal>

In many ways, Butler's deeply connected text is a perfect early modern analogue of the web, and its [modern digital edition]({base}/literature/transcription) simply turns the marginal cross-references into links that can easily be followed by the reader.

In addition to this, because we have encoded Butler's text with as much information as we could, there are a number of computerised visualisations that we can produce to illustrate this interconnectedness.

What follows are simple draft visualisations that are merely illustrative of the kind of analysis that can be performed -- further work is needed both in optimising the visualisations for readability and accessibility, and in their interpretation and analysis.

The first, and simplest visualisation that can be produced is a network graph of the connections between chapters. In this figure, each node (circle) is a chapter, and each line is a connection between chapters. Hovering over a node will highlight its connections:

## Network graph (1623)
<NetworkGraph inputData = {inputData[0].xreferences}/>

This gives the reader a quick visualisation of the degree of connectedness between chapters, and with a little investigation one can identify chapter 5 as being the most interconnected chapter (unsurprisingly). You can also compare the connections in the 1623 edition with those in the 1609 edition.

## Network graph (1609)
<NetworkGraph inputData = {inputData[1].xreferences}/>

While still impressively interconnected, the absolute number of connections is visibly less than in the 1623 edition, and there is a less obvious central chapter (although chapter 5 can still be identified as the most interconnected one).

While this type of visualisation is a useful starting point, we rapidly realised that there is more to be learned: for example, in which *direction* do the connections go? Which chapter has the most connections into it? And which chapter has the most connections out?

To quickly discover that information, we can create a Chord graph like the following:

## Chord Graph (1623)
<ChordGraph inputData = {inputData[0].flowMatrix}/>

A chord graph is a little harder to read at first sight, but it contains a lot more information. Chapters are arranged around the circumference of the circle. Each chapter is encoded with its own colour: i.e., chapter 1 is orange, chapter 2 is green, etc., and the length of its arc corresponds to the total number of connections to or from that chapter. Each chapter has two types of ribbon: ribbons in the chapter colour flow outwards and represent connections from that chapter to others (i.e., a link in chapter 1 to, for example, chapter 4); ribbons with other colours represent chapters linking back to that chapter: for example the thick yellow ribbon between chapter 5 and chapter 1 encodes the references linking back from chapter 5 to chapter 1. Finally, the thicker the ribbon, the more references between those chapters in the direction indicated by the colour. Hovering over the edge of the circle will highlight connections to that chapter (both from that chapter to others and from others to that chapter); hovering over a particular ribbon will highlight other connections in the same direction.

This chord graph shows that chapter 5 remains at the centre of the 1623 edition, literally connecting to all other chapters in the book (except the preface). It is also one of the most self-referential chapters (i.e., connecting to other points in itself), and has a good balance of outward and inward connections.  By contrast, chapter 10 connects almost exclusively outwards, which is to be expected of a concluding chapter.

There are many more readings to be made using these techniques, and there are many more conclusions (and points of interest to be identified) by a deeper exploration of the encoding. What we have here is only a very simple demonstration of the kind of analysis that can be made using a richly encoded text like *The Feminine Monarchie*.


<!-- # Cross-reference analysis for 1609

<NetworkGraph inputData = {inputData[1].xreferences}/>
<ChordGraph inputData = {inputData[1].flowMatrix}/>
<DataTable inputData = {inputData[1].nodesLinksCount}/>

# References for 1623
<NetworkGraph inputData = {classicalData[0].classicalXreferences}/>

# References for 1609
<NetworkGraph inputData = {classicalData[1].classicalXreferences}/> -->

</div>