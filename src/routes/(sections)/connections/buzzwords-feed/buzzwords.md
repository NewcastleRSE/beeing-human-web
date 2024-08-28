---
title: Buzzwords feed
id: connections-buzzwords
parent: connections
link: connections/buzzwords-feed
lead: "Buzz Lightyear is a fictional character in the Disney–Pixar Toy Story franchise. He is a superhero action figure from an in-universe media franchise. Buzz is recognizable by his lime green, purple, and white space suit. Originating as a one-man band toy named Tinny, he evolved into a space ranger action figure during the development of Toy Story, a decision made by director John Lasseter. He is named after American astronaut Buzz Aldrin, the second person to walk on the Moon. Buzz Lightyear is a recurring character in all of the Toy Story franchise's animated feature films, including spin-offs. In the Toy Story films he is voiced by Tim Allen."
img: '/assets/pexels-setu-r8-9224488.jpg'
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
