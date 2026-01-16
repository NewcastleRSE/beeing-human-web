<script>
    import CETEI from "CETEIcean";
    import { teiBehaviours } from "../utils/teiBehavioursODD";


    import { onMount } from "svelte";

    let {teiFile = "https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/refs/heads/dev/odd/tei_beeing_human.odd"} = $props();

    let loaded = false;

    async function loadTei(path) {
        loaded = false;
        const parent = document.getElementById("TEI-container");

        // cleans the parent container, in case it has any previous content
        while (parent.firstChild) {
            parent.removeChild(parent.lastChild);
        }

        // inserts TEI content
        var cetei = new CETEI({ ignoreFragmentId: true });
        cetei.addBehaviors(teiBehaviours);
        await cetei
            .getHTML5(path, function (data) {
                parent.appendChild(data);
            })
            .then(() => {
                loaded = true;
                // find all `<code>` elements and add overflow-x-scroll class to them
                const codeElements = parent.querySelectorAll("code");
                codeElements.forEach((el) => {
                    el.classList.add("overflow-x-scroll", "block");
                });
                return path;
            });
    }

    onMount(async () => {
        loaded = false;
        await loadTei(
            teiFile,
        );
    });
</script>
<div id="TEI-container" class="tei-container w-3/4 mx-auto"></div>
{#if !loaded}
    <p>Loading TEI content...</p>
{/if}