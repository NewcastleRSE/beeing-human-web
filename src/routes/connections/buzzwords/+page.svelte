<script>
    export let data;
    import InjectMD from '$lib/InjectMD.svelte'
    console.log(data.links)
</script>

{#each data.links as buzzword}
    <InjectMD content={buzzword}/>
{/each}