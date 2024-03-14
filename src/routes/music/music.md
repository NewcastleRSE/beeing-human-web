<script>
    export let data;
    import { base } from "$app/paths";
    import AudioPlayer from "$lib/AudioPlayer.svelte";
    import MeiSimple from "$lib/MEISimple.svelte";
    import Portal from "$lib/Portal.svelte";
    let audioPath = `${base}/content/music/media/virtualbarbershop.mp3`

</script>

# Music

## Introduction
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?

## Binaural recording test
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac nibh ut erat facilisis tincidunt et a neque. Donec ligula lectus, congue eget diam vestibulum, condimentum finibus ligula. Integer cursus diam vitae viverra vulputate. Maecenas vitae varius eros. Maecenas mattis magna magna, nec tristique magna tempus ac. Nam id nunc non urna elementum facilisis vitae ac ligula. Integer vehicula, ex sed tempus dapibus, ex augue placerat odio, in tincidunt sapien risus quis nisl. Praesent ut rhoncus tortor, sit amet aliquam est. Aliquam ac posuere felis. Nam ut varius risus. Nulla pulvinar arcu eget neque pretium blandit.

Aliquam lacus metus, suscipit quis lacinia quis, laoreet sed lorem. Ut placerat felis sem, et auctor tortor molestie sit amet. Vivamus mattis feugiat magna a vulputate. Ut maximus arcu sit amet dignissim eleifend. Phasellus vel scelerisque massa. Morbi nec magna et tellus tincidunt elementum. Suspendisse eu tincidunt est. Integer fermentum viverra metus quis ultricies. Proin eget est rutrum lacus vestibulum posuere. In hac habitasse platea dictumst. Fusce quis mollis purus, a efficitur sem. Proin ac nisi non leo aliquam euismod.

<AudioPlayer {audioPath}/>

## MEI engraving and playback test

Morbi nec magna et tellus tincidunt elementum. Suspendisse eu tincidunt est. Integer fermentum viverra metus quis ultricies. Proin eget est rutrum lacus vestibulum posuere. In hac habitasse platea dictumst. Fusce quis mollis purus, a efficitur sem.


{#if 'mei' in data}
    <MeiSimple meiSvg = {data.mei.svg} meiMidi = {data.mei.midi} timeMap = {data.mei.timeMap}></MeiSimple>
{:else}
    Could not load MEI.
{/if}
