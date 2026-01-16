---
title: "Rhetorica TEI"
id: rhetorica-tei
parent: literature
link: literature/rhetorica-tei
lead: "flkjdsl;fkjslkdj"
img: 'assets/articles/encoding-manual/brett-jordan-rhCZIm9pp54-unsplash.jpg'
imgAlt: "A close-up of an old computer manual"
type: [article, data]
layout: article
author: [jenny, henry]
date: 2026/01/16
order: 2
---

<script>
    import {base} from '$app/paths'
    import ByLine from '$lib/ByLine.svelte'
    import CETEIceanSimple from '$lib/CETEIceanSimple.svelte' 
</script>

<ByLine author={author} date={date} type={type} title={title} {readingTime}/>


<CETEIceanSimple teiFile="/assets/articles/rhetorica-tei/Rhetorica 5th edition 1621_for publication.xml"/>


