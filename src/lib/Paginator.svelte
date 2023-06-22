<!--
    @component
    This is an auxiliary component to turn long, generic content into pages. It receives an array of content, and adds buttons to move content back and forth.
    props:
        `data`: an array of content
        `raw`: a flag to display data as raw html (for MEI/SVG display)
    usage:
        ```
        <Paginator data=array raw=true|false/>
        ```
-->

<script>
    export let data = undefined;
    export let raw = undefined;

    let currentPage = 0;
    
    function nextPage() {
        currentPage++;
    }

    function prevPage() {
        currentPage--;
    }

    function goToPage(page) {
        currentPage = page;
    }
</script>

{#if currentPage > 0}
    <button type="button" class="btn variant-filled" on:click={prevPage}>Prev</button>
{/if}
{#if raw}
    {@html data[currentPage]}
{:else}
    data[currentPage];
{/if}
{#if currentPage < data.length - 1}
    <button type="button" class="btn variant-filled" on:click={nextPage}>Next</button>
{/if}