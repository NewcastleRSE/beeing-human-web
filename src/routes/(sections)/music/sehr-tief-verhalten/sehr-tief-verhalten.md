---
title: "Sehr tief verhalten"
id: sehr-tief-verhalten
parent: music
link: music/sehr-tief-verhalten
lead: "A new composition from Bennett Hogg, setting the poem from Hildegard Jone"
img: 'assets/articles/sehr-tief-verhalten/martin-adams-lxujDxNigL4-unsplash.jpg'
imgAlt: 'A photograph of a white canopy of stars'
type: data
# layout: article
author: bennett
date: 2026/04/10
---

<script>
    import ByLine from '$lib/ByLine.svelte';
    import { base } from "$app/paths";
    import PdfViewer from '$lib/PdfViewer.svelte'
</script>

<!-- Remove this div for layout: article -->
<div class="max-w-4xl mx-auto flex flex-col gap-3 leading-relaxed">
    <ByLine author={author} date={date} type={type} title={title} {readingTime}/>
</div>

<div class="h-dvh">
    <PdfViewer url='{base}/music/Bennett-Hogg-Sehr-tief-verhalten.pdf' pageNum=0 objectTitle='sehr-tief-verhalten'/>
</div>