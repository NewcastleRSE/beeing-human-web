<script>
    let { currentPage, newPage } = $props();
</script>
<div id="custom-page-select-button" class="flex self-center">
<input class="max-w-16 text-center rounded-l-md"
    min="0"
    onchange={(event) => {
        newPage(event.target.value);
    }}
    value={currentPage}
/>
<button class="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 focus:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
    onclick={() => {
        newPage(document.getElementById("custom-page-select-button").value);
    }}
>
    Go
</button>
</div>