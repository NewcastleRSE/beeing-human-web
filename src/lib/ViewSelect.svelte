<script>
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import { createEventDispatcher } from "svelte";

  import { view } from "../stores/viewChoice";

  const dispatch = createEventDispatcher();

  function handleChangeView(event) {
    dispatch('viewChanged', {
      newView: event.target.value
    })
  }
</script>

<RadioGroup>
  <RadioItem bind:group={$view} name="viewGroup" value={"literature"}
    on:click={handleChangeView}>Literature</RadioItem
  >
  <RadioItem bind:group={$view} name="viewGroup" value={"science"}
    >Science</RadioItem
  >
  <RadioItem bind:group={$view} name="viewGroup" value={"music"}
    >Music</RadioItem
  >
  <RadioItem bind:group={$view} name="viewGroup" value={"interdisciplinarity"}
    >Interdisciplinarity</RadioItem
  >
</RadioGroup>
