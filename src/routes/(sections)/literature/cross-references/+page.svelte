<script>
    import Article from './cross-references.md';
    let { data } = $props();
</script>

<Article inputData = {data.datasets} classicalData = {data.classicalDatasets}/>
