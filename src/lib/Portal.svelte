<!-- Wrapper element that identifies a span of text as being an entry portal -->

<script>
    import PortalPanel from "./PortalPanel.svelte";

    let showSidePanel = false;
    export let content;
    // origin, destination, both -> default both
    export let type = 'both';

    function showPopup() {
        console.log('Hovering!');
    }

    function hidePopup() {
        console.log('Not hovering!')
    }

    function toggleSidePanel() {
        showSidePanel = !showSidePanel
    }
</script>

{#if type == 'origin' || type == 'both'}
    <span class="text-amber-600 bg-slate-300 rounded-md border-[1px] border-slate-600 px-1 hover:bg-slate-200 hover:text-amber-800 hover:font-semibold hover:cursor-pointer" on:mouseenter={showPopup} on:mouseleave={hidePopup} on:click={toggleSidePanel} on:keydown={toggleSidePanel}><slot/></span>

    {#if showSidePanel}
        <PortalPanel on:close={toggleSidePanel} content={content}/>
    {/if}
{:else if type == 'destination'}
    <span><slot/></span>
{/if}

