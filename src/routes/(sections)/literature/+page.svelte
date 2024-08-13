<script>
    import Literature from './literature.md'
    import ArticleCollection from '../../../lib/ArticleCollection.svelte';

    export let data;
</script>

<Literature/>
<ArticleCollection {data}/>
