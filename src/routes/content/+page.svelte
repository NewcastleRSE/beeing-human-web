<script>
    import InternalLink from '../../lib/InternalLink.svelte';
    export let data;
</script>

<h1>Page load test</h1>

<ul>
    {#each data.summaries as {slug, title} }
        <li><InternalLink link="content/{slug}">{title}</InternalLink></li>
    {/each}
</ul>