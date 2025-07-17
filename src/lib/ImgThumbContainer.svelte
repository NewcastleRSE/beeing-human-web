<script>
    import {base} from '$app/paths';
    let {imgUrl, altText} = $props();
</script>

<div class="w-full flex justify-center items-center">
    <img src='{base}/thumbnails/{imgUrl}' alt={altText} class="max-h-24 w-auto" />
</div>
