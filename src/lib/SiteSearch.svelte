<script>
    import { createArticleIndex, searchArticlesIndex } from "../utils/search.js";
    import { onMount } from "svelte";

    onMount(async () => {
        const articles = await fetch("/api/search.json").then((response) =>
            response.json(),
        );
        createArticleIndex(articles);
        console.log(searchArticlesIndex('bees'))
    });
</script>
