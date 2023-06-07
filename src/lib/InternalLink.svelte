<script>
  import { base } from "$app/paths";
  export let link;
</script>

<!-- 
  @component
  This is a utility component that adds the {base} url to internal links. Needed (at least during dev) while test domain is not the root domain (i.e., https://newcastlerse.github.io/beeing-human-web/ rather than beeing-human.co.uk)


  Usage:
      ```
      <InternalLink link="seven">Link to Seven</InternalLink>
      ```
      will result in
      ```
      <a href="{basePath}/seven">Link to Seven</a>
      ```
      You can also pass any class by adding a class prop to InternalLink, eg:
      ```
      <InternalLink link="go" class='btn'>GO</InternalLink>
      ```
      Will be the same as any other element with class 'btn'
-->

<a href="{base}/{link}" class={$$restProps.class || ""}><slot /></a>
