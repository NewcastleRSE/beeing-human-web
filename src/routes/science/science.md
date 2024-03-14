<script>
    export let data
    import DataViewPanel from '$lib/DataViewPanel.svelte'

</script>

# Science

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse magna sem, tincidunt nec facilisis vitae, semper sed lorem. Sed scelerisque erat leo, vitae bibendum purus laoreet eget. Donec luctus lectus quis odio iaculis, sit amet elementum augue scelerisque. Sed a pretium ex, et imperdiet metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus volutpat cursus lacus, eu pretium dui suscipit non. Vestibulum eget purus quis nibh lacinia blandit quis eget neque. Donec in ligula maximus, pellentesque lacus non, commodo lorem.

## First dataset

In hac habitasse platea dictumst. Duis ligula nulla, rhoncus sed enim et, gravida consectetur mi. Pellentesque consequat orci in dui consectetur ultrices. Sed commodo arcu ac erat viverra bibendum sit amet sed nunc. Quisque cursus neque id sem semper, a tempor turpis tempor. Nam condimentum magna a libero laoreet, eget cursus eros tristique. Etiam rutrum, odio eu volutpat auctor, erat enim imperdiet tellus, in ultrices sapien elit in eros. Maecenas nibh nulla, vestibulum non lorem eu, egestas lobortis dui. Vivamus a nisi nec erat egestas vulputate pellentesque a ex. Curabitur sagittis turpis in dui elementum tempor.

{#await data.datasets then datasets}
    <DataViewPanel datasets = {[datasets[0]]}/>
{/await}


## Second dataset

Donec faucibus iaculis nunc, dapibus egestas quam. Proin eget ultricies augue. Integer est libero, egestas at felis eu, commodo pellentesque risus. Integer mauris neque, suscipit in aliquet a, egestas vel nisi. Quisque porttitor vestibulum felis vel varius. Sed pharetra sodales felis non mollis. Integer lorem nisi, commodo consectetur condimentum vitae, efficitur nec lacus. Vivamus nec vulputate felis. Fusce accumsan sapien sed nisl bibendum, sed efficitur nibh vehicula. Integer ultrices eros et erat aliquet auctor non quis quam. Etiam vitae posuere elit. Maecenas sit amet eros vitae ipsum gravida commodo id et tortor. Praesent suscipit neque ac sodales lobortis. Duis iaculis fermentum elementum. Ut pharetra velit nec fermentum tempor. In congue interdum bibendum.

{#await data.datasets then datasets}
    <DataViewPanel datasets = {[datasets[1]]}/>
{/await}

