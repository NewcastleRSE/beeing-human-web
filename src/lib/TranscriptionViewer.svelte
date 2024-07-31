<script>
    import TeiSimple from "./TEISimple.svelte";
    import IiifViewer from "./IIIFViewer.svelte";

    export let teiPath = "https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/dev/1623_consolidated.xml"

    export let iiifManifest = "https://iiif.archive.org/iiif/RAM2023-1081/manifest.json"
    export let startPage = 5
</script>


<div class="md:flex w-full mx-auto md:p-8 max-h-screen">
    <div class="md:flex-1 md:w-full md:w-1/2 md:max-h-full" data-testid="iiif-viewer">
        <IiifViewer manifest = {iiifManifest} {startPage}/>
    </div>
    <div class="md:flex w-full md:w-1/2 md:overflow-auto" data-testid="transcription">
        <TeiSimple
            path={teiPath}
        />
    </div>
</div>
