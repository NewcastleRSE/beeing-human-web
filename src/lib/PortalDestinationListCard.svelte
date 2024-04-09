<!--
    @component
    
    Card to be displayed in the PortalPanel modal. Expects a single link from which it creates a clickable button, fetches and displays a snippet of the destination Portal. Requires a single property:

    `link`: a string in the format `section#id`;
    
-->

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
        linkString = `${base}/${section}#${link}`

        let htmlString = undefined;
        let fetchedHtml = undefined;

        if (section === 'buzzwords') {
            const response = await fetch('/api/portals/buzzwords')
            const portalsBuzzwords = await response.json();
            try {
                const portalContent = portalsBuzzwords[link].content;
                fetchedHtml = new DocumentFragment();
                let paragraph = document.createElement('p');
                paragraph.innerHTML = portalContent;
                paragraph.id = link;
                fetchedHtml.appendChild(paragraph);

                // adjust the link
                linkString = `${base}/connections#${link}`
                // adjust section title
                section = `Buzzwords -- ${portalsBuzzwords[link].buzzID}`
            } catch (e) {
                console.error(`Could not find portal with ID ${link}, ${e}`)
            }
        } else {
            console.log(`fetching from: ${linkString}`);
            try {
                const response = await fetch(linkString);
                htmlString = await response.text();
            } catch (e) {
                console.error(`Could not fetch the preview from ${linkString}: ${e}`)
            }
        }

        if (htmlString != undefined) {
            try {
                let domParser = new DOMParser();
                fetchedHtml = domParser.parseFromString(htmlString, "text/html");
                console.log(fetchedHtml);
            } catch (e) {
                console.error(`Could not parse the preview for  ${linkString}: ${e}`)
            }
        }

        if (fetchedHtml != undefined) {
            console.log(fetchedHtml.innerHTML)
            portalDestinationElement = DOMPurify.sanitize(fetchedHtml.getElementById(link).innerHTML)
        } else {
            portalDestinationElement = '<p>Could not fetch preview</p>';
        }
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