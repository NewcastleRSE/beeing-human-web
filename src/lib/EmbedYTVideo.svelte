<script>
    let { id, provider = "youtube" } = $props();
</script>

<div class="aspect-w-16 aspect-h-9 my-4">
    {#if provider === "youtube"}
        <iframe
            class="rounded-lg"
            src="https://www.youtube-nocookie.com/embed/{id}"
            title="Video player"
            allowfullscreen
        >
            <p>Your browser does not support HTML5 video.</p>
        </iframe>
    {:else if provider === "vimeo"}
        <iframe
            class="rounded-lg"
            src="https://player.vimeo.com/video/{id}"
            title="Video player"
            allowfullscreen
        >
            <p>Your browser does not support HTML5 video.</p>
        </iframe>
    {/if}
</div>