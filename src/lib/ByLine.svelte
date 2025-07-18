<script>
    import people from "./../routes/(sections)/about/people/people.json";
    import { typeColours } from "../utils/typeColours";
    import { base } from "$app/paths";

    import CitationModal from "./CitationModal.svelte";
    import { derived } from "svelte/store";

    let { author, date, type, title } = $props();

    let dateType = new Date(date)

    let show = $state(false);

    let authorArray = $derived.by(() => {
        if (typeof author === 'string') {
            return [author]
        } else {
            return author
        }
    })

    function toggleModal() {
        show = !show;
    }
</script>


<div class="flex md:gap-6 w-full justify-evenly md:justify-start items-center align-center mb-4">
    {#each authorArray as authorName}
    <img
        class="inline-block h-12 w-12 md:h-16 md:w-16 rounded-full border-solid border-2 border-primary-500"
        src="{base}/thumbnails/{people[authorName].img}"
        alt="A picture of {people[authorName].name}"
    />
    <div class="text-sm flex flex-col">
        <span
            ><em>by</em> <a rel="author" class="anchor" href="{base}/about/{people[authorName].url}"
                >{people[authorName].name}</a
            ></span
        > <time datetime="{dateType}" class="text-xs">{dateType.toLocaleDateString("en-UK", {weekday: 'long', month: 'long', day:'numeric', year:'numeric'})}</time>
    </div>
    {/each}
    <button class="text-xs md:ml-auto relative z-10 rounded-full {typeColours[type].background} px-3 py-1.5 font-normal {typeColours[type].text} hover:{typeColours[type].hover}" onclick={toggleModal}>Citation &#128366;</button>
</div>
<CitationModal bind:show={show} citationInfo={{authorArray, date, title}}/>
