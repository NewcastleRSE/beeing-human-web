<script>
    let { id, provider = "youtube", credit = undefined } = $props();
</script>

<div class="mt-2 my-4">
    <div class="aspect-w-16 aspect-h-9">
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
    {#if credit}
        <p class="text-center text-xs text-secondary-700 mt-2">
            © {credit}
        </p>
    {/if}
</div>
