<script>
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";

  import { view } from "../stores/viewChoice";
</script>

<RadioGroup>
  <RadioItem bind:group={$view} name="viewGroup" value={"literature"} on:click
    >Literature</RadioItem
  >
  <RadioItem bind:group={$view} name="viewGroup" value={"science"} on:click
    >Science</RadioItem
  >
  <RadioItem bind:group={$view} name="viewGroup" value={"music"} on:click
    >Music</RadioItem
  >
  <RadioItem
    bind:group={$view}
    name="viewGroup"
    value={"connections"}
    on:click>Connections</RadioItem
  >
</RadioGroup>
