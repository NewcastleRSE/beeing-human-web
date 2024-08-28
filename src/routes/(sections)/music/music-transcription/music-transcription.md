---
title: Music transcription
id: music-transcription
parent: music
link: music/music-transcription
lead: "In music, transcription is the practice of notating a piece or a sound which was previously unnotated and/or unpopular as a written music, for example, a jazz improvisation or a video game soundtrack."
img: 'assets/marius-masalar-rPOmLGwai2w-unsplash.jpg'
imgAlt: 'musical notation with handwritten notes'
type: experience, data
layout: false
---

<script>
    export let data;
    import MeiSimple from "$lib/MEISimple.svelte";
    import Portal from "$lib/Portal.svelte";

</script>

{#if 'mei' in data}
    <MeiSimple meiSvg = {data.mei.svg} meiMidi = {data.mei.midi} timeMap = {data.mei.timeMap}></MeiSimple>
{:else}
    Could not load MEI.
{/if}