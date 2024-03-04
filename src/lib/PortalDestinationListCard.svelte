<script>
    import {base} from '$app/paths'
    import { onMount } from 'svelte';

    export let section;
    export let content;
    export let link;

    let linkString = `${base}/content/${section}#${link}`

    onMount(async () => {
        console.log('writing on mount');
        const response = await fetch(linkString);
        console.log(response);
    })
</script>

<div class="card">
    <header class="card-header">{section}</header>
    <section class="p-4">{content}</section>
    <footer class="card-footer">
        <a href={linkString}>&#11157</a>
    </footer>
</div>