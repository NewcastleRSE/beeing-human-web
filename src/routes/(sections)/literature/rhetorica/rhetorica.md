---
title: "*Rhetorica*"
id: rhetorica
parent: literature
link: literature/rhetorica
lead: "Read Charles Butler's *Rhetorica* (1621), now translated for the first time into English by Henry Howard."
img: 'assets/articles/rhetorica/wan-san-yip-ID1yWa1Wpx0-unsplash.jpg'
imgAlt: "two people speaking to an audience"
type: [data]
# layout: article
author: [henry]
date: 2026/01/13
order: 2
---

<script>
    import {base} from '$app/paths'
    import ByLine from '$lib/ByLine.svelte'
    import PdfViewer from '$lib/PdfViewer.svelte'


</script>

<!-- Remove this div for layout: article -->
<div class="max-w-4xl mx-auto flex flex-col gap-3 leading-relaxed">
    <ByLine author={author} date={date} type={type} title={title} {readingTime}/>
</div>

<div class="h-dvh">
    <PdfViewer url='./rhetorica_1621.pdf' pageNum=0 objectTitle='Translation of Rhetorica'/>
</div>