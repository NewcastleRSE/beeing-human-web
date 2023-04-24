<!-- 'marked is a separate plugin: https://magidoc.js.org/svelte-plugins/marked' -->

<script>
    import {marked} from 'marked';
    let value = `Some words are *italic*, some are **bold**`
</script>

{@html marked(value)}

<textarea bind:value></textarea>