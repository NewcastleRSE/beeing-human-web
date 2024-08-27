---
title: Datasets
id: science-datasets
parent: science
link: science/datasets
lead: "A data set (or dataset) is a collection of data. In the case of tabular data, a data set corresponds to one or more database tables, where every column of a table represents a particular variable, and each row corresponds to a given record of the data set in question. The data set lists values for each of the variables, such as for example height and weight of an object, for each member of the data set. Data sets can also consist of a collection of documents or files."
img: '/assets/pexels-murillohm-10854279.jpg'
imgAlt: 'a neatly arranged pile of wood'
type: data
layout: false
---

<script>
    export let data
    import DataViewPanel from '$lib/DataViewPanel.svelte'
    import Portal from '$lib/Portal.svelte'

</script>


# First dataset

In hac habitasse platea dictumst. Duis ligula nulla, rhoncus sed enim et, gravida consectetur mi. Pellentesque consequat orci in dui consectetur ultrices. Sed commodo arcu ac erat viverra bibendum sit amet sed nunc. Quisque cursus neque id sem semper, a tempor turpis tempor. Nam condimentum magna a libero laoreet, eget cursus eros tristique. Etiam rutrum, odio eu volutpat auctor, erat enim imperdiet tellus, in ultrices sapien elit in eros. <Portal type="both" id="sci2" destination={['connections/buzzwords-feed#buzz17Portal1']}>Maecenas nibh nulla, vestibulum non lorem eu, egestas lobortis dui.</Portal> Vivamus a nisi nec erat egestas vulputate pellentesque a ex. Curabitur sagittis turpis in dui elementum tempor.

{#await data.datasets then datasets}
    <DataViewPanel datasets = {[datasets[0]]}/>
{/await}


## Second dataset

Donec faucibus iaculis nunc, dapibus egestas quam. Proin eget ultricies augue. Integer est libero, egestas at felis eu, commodo pellentesque risus. Integer mauris neque, suscipit in aliquet a, egestas vel nisi. Quisque porttitor vestibulum felis vel varius. Sed pharetra sodales felis non mollis. Integer lorem nisi, commodo consectetur condimentum vitae, efficitur nec lacus. Vivamus nec vulputate felis. Fusce accumsan sapien sed nisl bibendum, sed efficitur nibh vehicula. Integer ultrices eros et erat aliquet auctor non quis quam. Etiam vitae posuere elit. Maecenas sit amet eros vitae ipsum gravida commodo id et tortor. Praesent suscipit neque ac sodales lobortis. Duis iaculis fermentum elementum. Ut pharetra velit nec fermentum tempor. In congue interdum bibendum.

{#await data.datasets then datasets}
    <DataViewPanel datasets = {[datasets[1]]}/>
{/await}

