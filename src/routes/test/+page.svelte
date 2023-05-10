<script>
    import {view} from '../../stores/viewChoice';
    import { compile } from 'mdsvex';
    import { onMount } from 'svelte';
    import { ProgressBar } from '@skeletonlabs/skeleton';

    let introText = '';

    onMount(async() => {
        let modulePath = './content/' + $view + '/intro.md';
        introText = await fetch(modulePath).then(response => response.text());
    });


</script>

<h1>{$view}</h1>
<!-- <Intro/> -->
{#if introText===""}
    <ProgressBar value={undefined}/>
{:else}
    <p>{introText}</p>
{/if}