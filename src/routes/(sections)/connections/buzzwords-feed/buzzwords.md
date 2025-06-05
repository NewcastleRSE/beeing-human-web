---
title: Buzzwords feed
id: connections-buzzwords
parent: connections
link: connections/buzzwords-feed
lead: "Buzzwords are the little thoughts and diversions we came across during our discussions and research. They might be tangential to our main topic, or an aside that seems pertinent enough to be recorded. Some of these buzzwords might turn into longer articles, others will remain here as a fleeting reflection."
img: 'assets/pexels-setu-r8-9224488.jpg'
imgAlt: 'a view of a minaret from a ruined stone doorway or window'
type: experience
layout: false
---

<script>

    import Buzzwords from '$lib/Buzzwords.svelte'
    import Portal from '$lib/Portal.svelte'

    export let data;

</script>
<Buzzwords buzzwords={data.buzzwords} listTags={data.buzzwordTags} listAuthors={data.buzzwordAuthors}/>
