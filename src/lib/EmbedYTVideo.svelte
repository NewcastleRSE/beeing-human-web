<script>
    let { id } = $props();
</script>

<div class="aspect-w-16 aspect-h-9">
<iframe
    class="rounded-lg"
    src="https://www.youtube-nocookie.com/embed/{id}"
    title="Video player"
    allowfullscreen
>
    <p>Your browser does not support HTML5 video.</p>
</iframe>
</div>