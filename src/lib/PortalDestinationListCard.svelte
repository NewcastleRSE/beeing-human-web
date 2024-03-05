<script>
    import {base} from '$app/paths'
    import { onMount } from 'svelte';
    import DOMPurify from 'dompurify'

    export let link;

    let portalDestinationElement = undefined;
    let section = undefined;
    let linkString = undefined;

    onMount(async () => {
        section = link.split('#')[0];
        link = link.split('#')[1];
        linkString = `${base}/content/${section}#${link}`

        console.log(`fetching from: ${linkString}`);
        const response = await fetch(linkString);
        const htmlString = await response.text();

        let domParser = new DOMParser();
        const fetchedHtml = domParser.parseFromString(htmlString, "text/html");

        portalDestinationElement = DOMPurify.sanitize(fetchedHtml.getElementById(link).innerHTML)
    })
</script>

<div class="card">
    <header class="card-header">
        {#await section}
            Loading...
        {:then section}
            {section}
        {/await}
    </header>
    <section class="p-4" id="{link}-loaded-content">
        {#if portalDestinationElement != undefined}
            {@html portalDestinationElement}
        {:else}
            <p>Loading...</p>
        {/if}
    </section>
    <footer class="card-footer">
        {#await linkString}
            <p>Loading...</p>
        {:then linkString} 
            <a href={linkString}>&#11157</a>
        {/await}
    </footer>
</div>