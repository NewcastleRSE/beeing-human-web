<script>
    import ArticleCard from "./ArticleCard.svelte";
    export let data;
</script>

{#each Object.entries(data) as card}
    <ArticleCard cardObject = {card}/>
{/each}

