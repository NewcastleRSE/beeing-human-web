<script>
    export let section;
    export let content;
    export let link;
</script>

<div class="card">
    <header class="card-header">{section}</header>
    <section class="p-4">{content}</section>
    <footer class="card-footer">
        <a href={link}>&#11157</a>
    </footer>
</div>