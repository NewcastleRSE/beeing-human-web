<script>
    import DataRadioGroupControl from "./DataSelectorControls/DataRadioGroupControl.svelte";

    import people from './../routes/(sections)/people.json';

    import { formatAuthorName } from "../utils/stringOperations";

    let {citationInfo} = $props();
    
    let styleGuides = {
        label: '',
        defaultValue: 'MLA',
            values: {
                MLA: 'MLA',
                Chicago: 'chicago',
                MHRA: 'mhra'
            },
        keepLabelsCase: true
    };

    let style = $state('MLA');

    let author = $derived.by(() => people[citationInfo.author].name);

    let authorByLastName = $derived.by(() => {
        if (people[citationInfo.author].byLastName) {
            return people[citationInfo.author].byLastName;
        } else {
            return formatAuthorName(people[citationInfo.author].name);
        }
    });

    let accessDate = new Date().toLocaleDateString();
    let publishedDate = new Date(citationInfo.date).toLocaleDateString();

    let url = window.location.href;

    let buttonClicked = $state(false);

    function copyCitation() {
        navigator.clipboard.writeText(document.querySelector('#citation').textContent);
        buttonClicked = true;
        setTimeout(() => {
            buttonClicked = false;
        }, 2000);
    }
</script>

<div class="flex flex-col gap-16 md:text-lg md:w-[35vw] md:min-h-[15vh] md:max-h-[70vh]">
    <DataRadioGroupControl options={styleGuides} valueChange={(changeObject) => {style = changeObject.newValue}}/>
    <div class="flex flex-col gap-4">
        <h2 class="text-2xl">How to cite: </h2>
        <div class="flex gap-2 w-full"><p class="pl-8 text-gray-700 text-base" id="citation">
        {#if style === 'MLA'}
            {authorByLastName}. "{citationInfo.title}". <em>Bee-ing Human</em>, {url}. Accessed {accessDate}
        {:else if style === 'chicago'}
            {authorByLastName}, "{citationInfo.title}", Bee-ing Human, last modified {publishedDate}, {url}, Accessed {accessDate}
        {:else if style === 'mhra'}
            {author}, '{citationInfo.title}', <em>Bee-ing Human</em>, {publishedDate}, &lt;{url}&gt; [accessed {accessDate}]
        {/if}
        </p>
        <button
            class="w-16 py-2 px-2 rounded-xl text-white transition-all duration-500 ease-in-out drop-shadow-md border-2 border-tertiary-500 {buttonClicked ? 'border-green-500 bg-green-400' : 'bg-transparent hover:bg-tertiary-400'}"
            onclick={copyCitation}
        >
            {#if buttonClicked}
                ✔
            {:else}
                &#128203;
            {/if}
        </button>
        </div>
    </div>
</div>
