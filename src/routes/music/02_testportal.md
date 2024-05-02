---
title: Testing portals
type: md
order: 02
---

<script>
    import Portal from '$lib/Portal.svelte';
</script>

This is another testing section. The point of this section is to test whether we are able to include the `Portal` component directly in the markdown. The following is should become a `Portal`:

<Portal type="origin" destination={['music#p-music-test']}>This text should be a destination portal</Portal>.

If it works, you should be able to click the above link.