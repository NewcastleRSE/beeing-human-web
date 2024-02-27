<!-- Wrapper element that identifies a span of text as being an entry portal -->

<script>
    import PortalPanel from "./PortalPanel.svelte";

    let showSidePanel = false;
    export let content;

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

<span on:mouseenter={showPopup} on:mouseleave={hidePopup} on:click={toggleSidePanel} on:keydown={toggleSidePanel}><slot/></span>

{#if showSidePanel}
    <PortalPanel on:close={toggleSidePanel} content={content}/>
{/if}

<style>
    span {
        color: chocolate;
    }
</style>

