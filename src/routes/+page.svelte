<script>
    import InternalLink from "../lib/InternalLink.svelte";
    import ViewSelect from "../lib/ViewSelect.svelte";

    import {view} from "../stores/viewChoice";
</script>

<h1>Bee-ing Human</h1>
<p>The web portal is in active development and in its initial stages. It is being developed in <a href="https://svelte.dev/">Svelte</a> and is hosted on <InternalLink link="">Github Pages</InternalLink>. It uses the <a href="https://www.skeleton.dev">Skeleton</a> component library.</p>

<h2>New update</h2>
<p>Making sure the .nojekyll file becomes persistent.</p>
<InternalLink link="about">About</InternalLink>

<ViewSelect/>
<InternalLink link="test" class="btn variant-filled">Go</InternalLink>

<p>{$view}</p>
