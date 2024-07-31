<script>
    import TeiSimple from "./TEISimple.svelte";
    import IiifViewer from "./IIIFViewer.svelte";
</script>

<div class="md:flex w-full mx-auto md:p-8 max-h-screen">
    <div class="md:flex-1 md:w-full md:w-1/2 md:max-h-full">
        <IiifViewer />
    </div>
    <div class="md:flex w-full md:w-1/2 md:overflow-auto">
        <TeiSimple
            path="https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/dev/1623_consolidated.xml"
        />
    </div>
</div>
