<script>
  import InternalLink from "../lib/InternalLink.svelte";
  import ViewSelect from "../lib/ViewSelect.svelte";

  import { view } from "../stores/viewChoice";

  import { invalidateAll } from "$app/navigation";

  function handleClick() {
    invalidateAll();
  }

</script>

<h1>Bee-ing Human</h1>
<p>
  The web portal is in active development and in its initial stages. It is being
  developed in <a href="https://svelte.dev/">Svelte</a> and is hosted on <InternalLink
    link="">Github Pages</InternalLink
  >. It uses the <a href="https://www.skeleton.dev">Skeleton</a> component
  library and
  <a href="https://www.npmjs.com/package/svelte-markdown?activeTab=readme"
    >Svelte-Markdown</a
  > to render .md files into HTML.
</p>

<h2>New update</h2>
<ul>
  <li>
    Page loading is now automatically done by simply creating a new md file in
    the correct location
  </li>
  <li>
    Page loading based on view transformed to follow sveltekit best practices
    (preload)
  </li>
  <li>Extract injecting markdown into a separate component</li>
  <li>Render markdown according to each view</li>
  <li>Making sure the .nojekyll file becomes persistent.</li>
</ul>
<h3>Todos at this stage</h3>
<ul>
  <li>Change theme based on selected view</li>
  <li>Error catching:</li>
  <ul>
    <li><del>markdown file does not exist</del></li>
    <li><del>view does not exist/could not be selected</del></li>
    <li>basic layout for dev</li>
  </ul>
</ul>
<InternalLink link="about">About</InternalLink>

<ViewSelect on:click={handleClick} />
<InternalLink link="{$view}/" class="btn variant-filled"
  >Go</InternalLink
>