<script>
  export let data;
  import InjectMd from "../../../lib/InjectMD.svelte";
  import TEISimple from "../../../lib/TEISimple.svelte";
  import { base } from "$app/paths";
  import AudioPlayer from "../../../lib/AudioPlayer.svelte";
  import MeiSimple from "../../../lib/MEISimple.svelte";
  import Buzzwords from "../../../lib/Buzzwords.svelte";
  import DataViewPanel from "../../../lib/DataViewPanel.svelte";
  import PortalOrigin from "../../../lib/PortalOrigin.svelte";

  let audioPath = `${base}/content/music/media/virtualbarbershop.mp3`
</script>

<h1>View page</h1>
<h1>{data.view.title}</h1>
{#each Object.entries(data.view.sections) as [title, sec]}
  {#if sec.type === "md"}
    <h2>{title}</h2>
    <InjectMd content={sec.content} />
  {/if}
{/each}

<PortalOrigin content='test 1'>This is a test portal</PortalOrigin>
<PortalOrigin content='test 2'>This is a second test portal</PortalOrigin>

{#if data.view.slug === "literature"}
  <h3>Test</h3>
  <TEISimple path = "https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/dev/1623_consolidated.xml"/>
{:else if data.view.slug === 'science'}
  {#await data.view.datasets then datasets}
    <DataViewPanel {datasets}/>
  {/await}
{:else if data.view.slug === 'music'}
  <h3>Binaural recording test</h3>
  <AudioPlayer {audioPath}/>
  <h3>MEI engraving and playback test</h3>
  {#if 'mei' in data.view}
    <MeiSimple meiSvg = {data.view.mei.svg} meiMidi = {data.view.mei.midi} timeMap = {data.view.mei.timeMap}></MeiSimple>
  {/if}
{:else if data.view.slug === 'connections'}
  <h3>Buzzwords</h3>
  <Buzzwords buzzwords={data.view.buzzwords} listTags={data.view.buzzwordTags} listAuthors={data.view.buzzwordAuthors}/>
{/if}
