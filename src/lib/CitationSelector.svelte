<script>
    import DataRadioGroupControl from "./DataSelectorControls/DataRadioGroupControl.svelte";

    import people from './../routes/(sections)/people.json';

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

    let url = window.location.href;

    function formatAuthorName(author) {
        const nameParts = author.split(' ');
        if (nameParts.length < 2) {
        return author; // Return the original name if it doesn't have both first and last names
        }
        return `${nameParts[1]}, ${nameParts[0]}`;
  }
</script>

<div class="flex flex-col gap-16 md:text-lg md:w-[35vw] md:min-h-[15vh] md:max-h-[70vh]">
    <DataRadioGroupControl options={styleGuides} valueChange={(changeObject) => {style = changeObject.newValue}}/>
    <div>
        <p class="text-lg">
        {#if style === 'MLA'}
            {authorByLastName}. "{citationInfo.title}". <em>Bee-ing Human</em>, {url}. Accessed {accessDate}
        {:else if style === 'chicago'}
            {authorByLastName}, "{citationInfo.title}", Bee-ing Human, last modified DATE, {url}, Accessed {accessDate}
        {:else if style === 'mhra'}
            {author}, '{citationInfo.title}', <em>Bee-ing Human</em>, DATE, &lt;{url}&gt; [accessed {accessDate}]
        {/if}
        </p>
    </div>
</div>
