<script>
    export let section;
    export let content;
    export let link;
    import {base} from '$app/paths'

    let linkString = `${base}/content/${section}#${link}`
</script>

<div class="card">
    <header class="card-header">{section}</header>
    <section class="p-4">{content}</section>
    <footer class="card-footer">
        <a href={linkString}>&#11157</a>
    </footer>
</div>