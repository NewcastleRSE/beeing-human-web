<script>
  export let data;
  import InjectMd from "../../../lib/InjectMD.svelte";
  import TeiDocument from "../../../lib/TEIDocument.svelte";
  import CeteiCeanTest from "../../../lib/CETEICeanTest.svelte";
  console.log(data);
  
</script>

<h1>View page</h1>
<h1>{data.view.title}</h1>
{#each Object.entries(data.view.sections) as [title, sec]}
  {#if sec.type === "md"}
    <h2>{title}</h2>
    <InjectMd section={sec} />
  {/if}
{/each}

{#if data.view.slug === "literature"}
  <h3>Test</h3>
  <!-- <TeiDocument doc = {data.tei.content} elements = {data.tei.elements}></TeiDocument> -->
  <CeteiCeanTest path = "/content/literature/data/Coopers_hill_1655.xml"></CeteiCeanTest>
{/if}
