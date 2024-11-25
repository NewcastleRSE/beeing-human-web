<!--
    @component
    
    Card to be displayed in the PortalPanel modal. Expects a single link from which it creates a clickable button, fetches and displays a snippet of the destination Portal. Requires a single property:

    `link`: a string in the format `section#id`;
    
-->

<script>
    import { base } from "$app/paths";
    import { onMount } from "svelte";
    import DOMPurify from "dompurify";

    import { capitaliseFirstLetter } from "../utils/stringOperations";

    let { link } = $props();

    let portalDestinationElement = $state(undefined);
    let section = $state(undefined);
    let article = undefined;
    let pageLink = undefined;
    let linkString = $state(undefined);

    onMount(async () => {
        try {
            pageLink = link.split("#")[0].toLowerCase();
            section = pageLink.split("/")[0].toLowerCase();
            article = pageLink.split("/")[1].toLowerCase();
            link = link.split("#")[1];
            linkString = `${base}/${pageLink}#${link}`;
        } catch (e) {
            console.error("Link is malformed, could not fetch API");
        }

        // Only used with DOMParser
        // let htmlString = undefined;

        let fetchedHtml = undefined;
        let portals = undefined;
        section = capitaliseFirstLetter(section);

        try {
            let apiEndpoint = section;
            if (article === "buzzwords-feed") {
                apiEndpoint = "buzzwords";
            }
            const response = await fetch(
                `${base}/api/portals/${apiEndpoint.toLowerCase()}`,
            );
            portals = await response.json();
        } catch (e) {
            console.error("Could not fetch API");
        }
        try {
            const portalContent = portals[link].content;
            fetchedHtml = new DocumentFragment();
            let paragraph = document.createElement("p");
            paragraph.innerHTML = portalContent;
            paragraph.id = link;
            fetchedHtml.appendChild(paragraph);

            // adjust the link and section title for buzzwords
            if (article.toLowerCase() === "buzzwords-feed") {
                // adjust section title
                section = `Buzzwords -- ${portals[link].id}`;
            }
        } catch (e) {
            console.error(`Could not find portal with ID ${link}, ${e}`);
        }

        // if it is to a regular page, fetch the page and render html
        // No longer in use -- previews are fetched through the APIs, but left here in case the entire page needs to be fetched and parsed in the browser
        // try {
        //     const response = await fetch(linkString);
        //     htmlString = await response.text();
        // } catch (e) {
        //     console.error(`Could not fetch the preview from ${linkString}: ${e}`)
        // }
        // if (htmlString != undefined) {
        //     try {
        //         let domParser = new DOMParser();
        //         fetchedHtml = domParser.parseFromString(htmlString, "text/html");
        //     } catch (e) {
        //         console.error(`Could not parse the preview for  ${linkString}: ${e}`)
        //     }
        // }

        if (fetchedHtml != undefined) {
            portalDestinationElement = DOMPurify.sanitize(
                fetchedHtml.getElementById(link).innerHTML,
            );
        } else {
            portalDestinationElement = "<p>Could not fetch preview</p>";
            linkString = undefined;
        }
    });
</script>

<div class="card" data-testid="portal-panel-card">
    <header class="card-header" data-testid="card-header">
        <!-- {#await section}
            Loading...
        {:then section}
            {section}
        {/await} -->
        {section}
    </header>
    <section class="p-4" id="{link}-loaded-content" data-testid="card-section">
        {#if portalDestinationElement != undefined}
            {@html portalDestinationElement}
        {:else}
            <p>Loading...</p>
        {/if}
    </section>
    <footer class="card-footer" data-testid="card-footer">
        {#await linkString}
            <p>...</p>
        {:then linkString}
            {#if linkString}
                <a href={linkString}>&#11157</a>
            {:else}
                <span data-testid="no-link">&#8655</span>
            {/if}
        {/await}
    </footer>
</div>
