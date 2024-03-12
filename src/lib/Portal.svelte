<!--
    @component
         
    Wrapper element that identifies a span of text as being either an origin portal, a destination, or both. If the Portal is a destination or both, the wrapped content is rendered for preview wherever this portal is linked from. The component contains three properties:

    `type`: `origin | destination | both` -- defines whether the type of portal. Default is `both`.

    `destination`: an array of ids of the portals that will be linked to. Required if type == `origin` or `both`. Links should be in the format `section#id`.

    `id`: a unique identifier for the portal. Required if type == `destination` or `both`. Testing should ensure that portal ids are unique.
-->

<script>
    import PortalPanel from "./PortalPanel.svelte";
    import { onMount } from "svelte";
    import {v4 as uuidv4} from 'uuid'

    let showSidePanel = false;
    export let destination;
    // origin, destination, both -> default both
    export let type = 'both';
    export let id = undefined;

    function showPopup() {
        console.log('Hovering!');
    }

    function hidePopup() {
        console.log('Not hovering!')
    }

    function toggleSidePanel() {
        showSidePanel = !showSidePanel
    }

    onMount(async () => {
        const legalTypes = ['origin', 'destination', 'both']
        type = type.toLowerCase();
        // Formation checks
        
        // Portal is correctly typed
        if (!legalTypes.includes(type)) {
            throw new Error(`Trying to create a portal with an invalid type: '${type}' Available types are: '${legalTypes}'`)
        }

        // If it needs one, it must have an id
        if (id === undefined && (type === 'destination' || type === 'both')) {
            throw new Error('Portals must have a unique id.');
        }

        // TODO: test if the id is unique?

        // if it doesn't have one, generate random id
        if (id === undefined) {
            id = uuidv4();
        }
    })
</script>

{#if type == 'origin' || type == 'both'}
    <span class="text-amber-600 bg-slate-300 rounded-md border-[1px] border-slate-600 px-1 hover:bg-slate-200 hover:text-amber-800 hover:font-semibold hover:cursor-pointer" on:mouseenter={showPopup} on:mouseleave={hidePopup} on:click={toggleSidePanel} on:keydown={toggleSidePanel} id={id}><slot/></span>

    {#if showSidePanel}
        <PortalPanel on:close={toggleSidePanel} destination={destination}/>
    {/if}
{:else if type == 'destination'}
    <span id={id}><slot/></span>
{/if}

