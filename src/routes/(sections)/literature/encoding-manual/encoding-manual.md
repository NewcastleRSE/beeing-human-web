---
title: "Encoding Manual"
id: encoding-manual
parent: literature
link: literature/encoding-manual
lead: "Read our encoding manual to understand how we approached the task of encoding and editing Charles Butler's *The Feminine Monarchie*"
img: 'assets/articles/encoding-manual/brett-jordan-rhCZIm9pp54-unsplash.jpg'
imgAlt: "A close-up of an old computer manual"
type: [article, data]
layout: article
author: tiago
date: 2025/12/24
order: 2
---

<script>
    import {base} from '$app/paths'
    import ByLine from '$lib/ByLine.svelte'
    import CETEIceanSimple from '$lib/CETEIceanSimple.svelte' 
</script>

<ByLine author={author} date={date} type={type} title={title} {readingTime}/>

From the start of the project, as we began transcribing and encoding Charles Butler's *The Feminine Monarchie*, we've created a [TEI customisation](https://tei-c.org/guidelines/customization/) which allowed us to define and consistently encode the same textual phenomena in the same way.

The process of customising the TEI produces a number of outputs, the most significant being:

1. A set of machine-readable instructions that allows our XML editing software to validate our encoding automatically (a *schema*);
2. Documentation (that can be exported in several formats) that can be used as a human-readable manual at the point of encoding.

Below we reproduce the latest version of our encoding manual, generated from the TEI customisation that validates our encoding of *The Feminine Monarchie* (1623).

You can find our TEI customisation (as well as our encoding files and scripts) [in the github repository for the transcription](https://github.com/NewcastleRSE/beeing-human-tei-data). 

<span class="my-4"></span>
<hr/>

# Encoding Manual

<CETEIceanSimple/>


