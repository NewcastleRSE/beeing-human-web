<script>
  import { view } from "../../stores/viewChoice";
  import InjectMd from "../../lib/InjectMD.svelte";
</script>

<h1>{$view}</h1>

<InjectMd chosenView={$view} section="intro" />
