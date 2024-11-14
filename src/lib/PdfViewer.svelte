<script>
    export let url;
    export let pageNum;
    export let objectTitle

    let width;
    let height;

</script>


<div bind:clientWidth={width} bind:clientHeight={height} class="h-full">
    <object data={url+'#page='+pageNum} type="application/pdf" width={width} height={height} title={objectTitle}>
        Could not display facsimile
    </object>
</div>