<script>
    import { base } from "$app/paths";
    import { capitaliseFirstLetter, makeHtmlId } from "./../../../utils/stringOperations";

    import InjectMD from "$lib/InjectMD.svelte";
    import BuzzwordCard from "$lib/BuzzwordCard.svelte";

    let { data } = $props();

    let personData = $derived(data.person);

    const iconSize = "w-6 h-6";

    function replaceWthLogo(key) {
        const socials = ["X", "github", "orcid"];

        if (socials.includes(key)) {
            let svg = undefined;
            if (key === "X") {
                svg = `<svg class="${iconSize} fill-black hover:fill-gray-500" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/>
</svg>`;
            } else if (key === "github") {
                svg = `<svg class="${iconSize} fill-black hover:fill-gray-500" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/></svg>`;
            } else if ((key = "orcid")) {
                svg = `<svg class="${iconSize} fill-black hover:fill-gray-500" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M32 16c0 8.837-7.163 16-16 16-8.838 0-16-7.163-16-16C0 7.162 7.162 0 16 0c8.837 0 16 7.162 16 16Z" />
  <path d="M18.813 9.637h-5.45v13.9h5.474c4.555 0 7.35-3.378 7.35-6.95 0-1.635-.562-3.372-1.77-4.704-1.215-1.336-3.065-2.246-5.605-2.246ZM18.6 21.3h-2.813v-9.425H18.5c1.823 0 3.12.552 3.96 1.4.842.849 1.252 2.021 1.252 3.312 0 .784-.239 1.967-.993 2.948-.745.969-2.01 1.765-4.119 1.765Zm5.311-4.026c-.251 1.74-1.494 4.276-5.311 4.276h-3.063H18.6c3.817 0 5.06-2.536 5.311-4.276Zm1.812-2.405c-.657-2.601-2.85-4.982-6.91-4.982h-5.2 5.2c4.06 0 6.253 2.38 6.91 4.982Zm.215 1.718ZM8.363 9.675v13.887h2.425V9.675H8.363Zm2.175 13.637H8.612h1.925ZM9.575 8.65c.84 0 1.513-.689 1.513-1.513 0-.823-.673-1.512-1.513-1.512-.838 0-1.512.674-1.512 1.513 0 .823.672 1.512 1.512 1.512Z" fill="#fff"/>
</svg>`;
            }

            return svg;
        } else {
            return personData.socials[key];
        }
    }
</script>

<div class="flex flex-col md:flex-row md:items-start gap-4 md:w-4/5 mx-auto md:my-20">
    <div class="flex flex-col gap-4 items-center">
        <img
            class="rounded-full max-w-40 md:max-w-80"
            src="{base}/{personData.img}"
            alt="A picture of {personData.name}"
        />
        <div
            id="{makeHtmlId(personData.name)}-socials"
            class="flex flex-row gap-2"
        >
            {#if personData.socials}
                {#each Object.keys(personData.socials) as key}
                    <a
                        href={personData.socials[key]}
                        class="text-2xl text-primary-500 hover:text-primary-300"
                        target="_blank">{@html replaceWthLogo(key)}</a
                    >
                {/each}
            {/if}
            {#if personData.web}
                {#each Object.keys(personData.web) as key}
                    <a
                        href={personData.web[key]}
                        class="text-2xl text-primary-500 hover:text-primary-300"
                        target="_blank"
                    >
                        {#if key === "personal"}
                            <svg
                                class="{iconSize} fill-current text-black hover:text-gray-500"
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 162.656 162.656"
                                xml:space="preserve"
                                ><g id="SVGRepo_bgCarrier" stroke-width="0"
                                ></g><g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></g><g id="SVGRepo_iconCarrier">
                                    <g>
                                        <path
                                            d="M151.764,10.894c-14.522-14.522-38.152-14.525-52.676-0.008l0.003,0.003L76.112,33.872l10.607,10.605l22.983-22.988 l-0.002-0.002c8.678-8.663,22.785-8.658,31.457,0.014c8.673,8.672,8.672,22.786,0,31.461l-34.486,34.484 c-4.201,4.202-9.787,6.516-15.729,6.516c-5.942,0-11.529-2.314-15.73-6.516L64.605,98.052c7.035,7.035,16.389,10.91,26.338,10.91 c9.949,0,19.303-3.875,26.335-10.91l34.487-34.484C166.284,49.043,166.284,25.413,151.764,10.894z"
                                        ></path>
                                        <path
                                            d="M52.96,141.162L52.96,141.162c-8.675,8.67-22.788,8.668-31.461-0.005c-8.673-8.675-8.673-22.791-0.001-31.465L55.98,75.21 c8.675-8.674,22.789-8.674,31.462,0L98.05,64.604c-14.524-14.523-38.154-14.524-52.676,0L10.89,99.086 c-14.519,14.523-14.519,38.154,0.001,52.678c7.263,7.262,16.801,10.893,26.341,10.892c9.536,0,19.074-3.629,26.333-10.887 l0.002-0.001l22.984-22.99l-10.608-10.606L52.96,141.162z"
                                        ></path>
                                    </g>
                                </g></svg
                            >
                        {:else}
                            <svg
                                class="{iconSize} fill-current text-black hover:text-gray-500"
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 490 490"
                                xml:space="preserve"
                                ><g id="SVGRepo_bgCarrier" stroke-width="0"
                                ></g><g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></g><g id="SVGRepo_iconCarrier">
                                    <g>
                                        <path
                                            d="M422.049,291.385V55.576H68.459v234.77L0,434.424h490L422.049,291.385z M99.206,86.323h292.096v199.855H99.206V86.323z M89.866,316.925h310.28l41.211,86.751H48.643L89.866,316.925z"
                                        ></path>
                                        <ellipse
                                            cx="245.005"
                                            cy="149.439"
                                            rx="35.94"
                                            ry="36.539"
                                        ></ellipse>
                                        <path
                                            d="M245.005,195.026c-34.28,0-62.07,28.252-62.07,63.103h124.139C307.075,223.278,279.285,195.026,245.005,195.026z"
                                        ></path>
                                    </g>
                                </g></svg
                            >
                        {/if}
                    </a>
                {/each}
            {/if}
            {#if personData.email}
                <a
                    href={"mailto:" + personData.email}
                    class="text-black hover:text-gray-300 text-2xl"
                    target="_blank"
                    aria-label="Email {personData.name}"
                >
                    <svg
                        class="${iconSize} fill-black hover:fill-gray-500"
                        viewBox="0 0 20 20"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="layer1">
                            <path
                                d="M 0 4 L 0 17 L 20 17 L 20 4 L 0 4 z M 1.6621094 5 L 18.337891 5 L 10.376953 11 L 9.6230469 11 L 1.6621094 5 z M 1 5.9335938 L 9.0488281 12 L 10.951172 12 L 19 5.9335938 L 19 15.246094 L 13.533203 11.128906 L 13.53125 11.126953 L 12.701172 11.751953 L 12.703125 11.753906 L 18.337891 16 L 1.6621094 16 L 7.296875 11.753906 L 7.2988281 11.751953 L 6.46875 11.126953 L 6.4667969 11.128906 L 1 15.246094 L 1 5.9335938 z "
                            />
                        </g>
                    </svg>
                </a>
            {/if}
        </div>
    </div>
    <div class="flex flex-col gap-8 md:w-2/3 ml-auto">
        <div class="flex flex-col">
            <h3 class="h3 text-4xl">{personData.name}</h3>
            <span class="h4 text-gray-500 text-lg italic">{personData.title} · {personData.affiliation}</span>
        </div>
        <InjectMD content={personData.bio} layout= {false} />
        <div class="mt-6">
        {#if personData.articles}
            <div>
                <h4 class="h4 mt-6 mb-2 font-thin text-2xl">Articles</h4>
                <ul class="flex flex-col gap-2 list-disc">
                    {#each personData.articles as article}
                        <li class="ml-12 text-lg">
                            <a href="{base}/{article.url}" class="anchor"
                                >{article.title}</a
                            > · <a class="italic text-gray-500" href="/{article.parent}">{capitaliseFirstLetter(article.parent)}</a>
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
        {#if personData.buzzwords}
            <div class="flex flex-col gap-4 md:w-2/3">
                <h4 class="h4 mt-6 mb-2 font-thin text-2xl">Buzzwords</h4>
                    {#each personData.buzzwords as buzzword}
                    <div class="md:ml-6">
                    <BuzzwordCard
                    {buzzword}
                /></div>
                    {/each}
            </div>
        {/if}</div>
    </div>
</div>
