<script>
    import InputFieldBind from "./InputFieldBind.svelte";

    let field;
</script>

<InputFieldBind bind:this={field}/>

<button on:click="{() => field.focus()}">Focus Field</button>