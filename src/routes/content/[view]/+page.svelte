<script>
  export let data;
  import InjectMd from "../../../lib/InjectMD.svelte";
  import TEISimple from "../../../lib/TEISimple.svelte";
  import { base } from "$app/paths";
  import AudioPlayer from "../../../lib/AudioPlayer.svelte";
  import MeiSimple from "../../../lib/MEISimple.svelte";
  import Buzzwords from "../../../lib/Buzzwords.svelte";

  console.log(data.view.buzzwords);

</script>

<h1>View page</h1>
<h1>{data.view.title}</h1>
{#each Object.entries(data.view.sections) as [title, sec]}
  {#if sec.type === "md"}
    <h2>{title}</h2>
    <InjectMd content={sec.content} />
  {/if}
{/each}

{#if data.view.slug === "literature"}
  <h3>Test</h3>
  <!-- <TeiDocument doc = {data.tei.content} elements = {data.tei.elements}></TeiDocument> -->
  <TEISimple path = "{base}/content/literature/data/Coopers_hill_1655.xml"/>
{:else if data.view.slug === 'music'}
  <h3>Binaural recording test</h3>
  <AudioPlayer audioPath = "{base}/content/music/media/virtualbarbershop.mp3"/>
  <h3>MEI engraving and playback test</h3>
  {#if 'mei' in data.view}
    <MeiSimple meiSvg = {data.view.mei.svg} meiMidi = {data.view.mei.midi} timeMap = {data.view.mei.timeMap}></MeiSimple>
  {/if}
{:else if data.view.slug === 'connections'}
  <h3>Buzzwords</h3>
  <Buzzwords buzzwords={data.view.buzzwords}/>
{/if}
