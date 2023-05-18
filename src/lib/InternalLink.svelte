<script>
  import { base } from "$app/paths";
  export let link;
</script>

<a href="{base}/{link}" class={$$restProps.class || ""}><slot /></a>
