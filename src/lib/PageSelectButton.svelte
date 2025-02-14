<script>
    let { currentPage, newPage } = $props();
</script>
<div id="custom-page-select-button">
<input
    min="0"
    onchange={(event) => {
        newPage(event.target.value);
    }}
    value={currentPage}
/>
<button
    onclick={() => {
        newPage(document.getElementById("custom-page-select-button").value);
    }}
>
    Go
</button>
</div>