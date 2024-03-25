<!-- 
    @component
    This component is used to fetch the contents of a buzzword markdown file and display it. It uses `mdsvex` to transform the `.md` into a svelte component, and dynamic imports to build the component depending on the file name supplied. It has one property, `buzzName`, that contains the name of the `.md` file to be converted. The remainder of the path needs to be fixed and defined in the component for the dynamic import to work. Buzzword files must be in `/src/routes/connections/buzzwords` for the import to work.

    Properties:

    `buzzName`: `string`, the name of the '.md' file to convert *without* the file extension.
  
    Usage:
    ```
    <InjectBuzzword buzzName = 'buzz1'/>
    ```
  -->

<script>
  import { onMount } from "svelte";

  export let buzzName = undefined;
  let buzzword = undefined;
  let errorCode = 0
  // 1 -> no buzzword passed
  // 2 -> couldn't find buzzword

  onMount(async () => {
    if (buzzName == undefined) {
      errorCode = 1
    } else {
      try {
        buzzword = await import(
          `../routes/connections/buzzwords/${buzzName}.md`
        );
      } catch (e) {
        console.log(e);
        errorCode = 2
      }
    }
  });
</script>

{#if buzzword != undefined && errorCode == 0 }
  <svelte:component this={buzzword.default} />
{:else if errorCode == 1}
  <p class="error-code" data-testid="error-message">You need to pass a buzzword file name</p>
{:else if errorCode == 2}
  <p class="error-code" data-testid="error-message">Could not load buzzword '{buzzName}'</p>
{/if}

<!-- 
  {#if content === undefined}
    <ProgressRadial value={undefined} />
  {:else}
    <SvelteMarkdown source={content} />
  {/if} -->
