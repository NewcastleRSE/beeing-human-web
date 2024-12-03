<script>
    let { url, pageNum, objectTitle } = $props();

    let width = $state();
    let height = $state();

</script>


<div bind:clientWidth={width} bind:clientHeight={height} class="h-full">
    <object data={url+'#page='+pageNum} type="application/pdf" width={width} height={height} title={objectTitle}>
        Could not display facsimile
    </object>
</div>