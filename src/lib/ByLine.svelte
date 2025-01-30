<script>
    import people from "./../routes/(sections)/people.json";
    import { typeColours } from "../utils/typeColours";
    import { base } from "$app/paths";

    let { author, date, type } = $props();
</script>

<div class="flex md:gap-6 w-full justify-evenly md:justify-start items-center align-center mb-4">
    <img
        class="inline-block h-12 w-12 md:h-16 md:w-16 rounded-full border-solid border-2 border-primary-500"
        src="{base}/{people[author].img}"
        alt="A picture of {people[author].name}"
    />
    <div class="text-sm flex flex-col">
        <span
            >by <a rel="author" class="anchor" href={people[author].url}
                >{people[author].name}</a
            ></span
        > <time datetime="{date}" class="text-xs">{date}</time>
    </div>
    <button class="text-xs md:ml-auto relative z-10 rounded-full {typeColours[type].background} px-3 py-1.5 font-normal {typeColours[type].text} hover:{typeColours[type].hover}">Citation &#128366;</button>
</div>
