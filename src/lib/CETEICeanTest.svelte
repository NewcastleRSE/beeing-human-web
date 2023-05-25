<script>
    import { onMount } from 'svelte';

    export let path = '';

    onMount(async () => {
        var cetei = new CETEI();
        cetei.getHTML5(path, function(data) {
            document.getElementById('TEI-container').appendChild(data);
        });
    })
</script>

<svelte:head>
    <script src="/js/CETEI.js"></script>
    <link rel="stylesheet" type="text/css" href="/additional-style/TEIstyle.css"/>
</svelte:head>

<div id='TEI-container'></div>