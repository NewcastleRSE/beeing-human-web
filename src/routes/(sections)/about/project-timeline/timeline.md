---
title: Project timeline
id: project-timeline
parent: about
link: about/project-timeline
lead: "Learn about the *Bee-ing Human* project, its goals, ambitions, ways of working and how we created a 21st century digital bee book."
img: 'assets/articles/introduction/zulian-firmansyah-sEUAJeFn5mE-unsplash.jpg'
imgAlt: 'An open door to a dreamlike world on an orange wall'
type: article
layout: article
author: [jenny, tiago, olivia]
date: 2025/07/25
order: 3
timelineArray: [{
            date: "2021-08",
            dateString: "Aug 2021",
            title: "Founded company",
            description: "Nihil aut nam. *Dignissimos* a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae."
        },
        {
            date: "2022-08",
            dateString: "Aug 2022",
            title: "Founded company",
            description: "Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae."
        },
        {
            date: "2021-08",
            dateString: "Aug 2023",
            title: "Founded ***company***",
            description: "Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae."
        }]
---

<script>
    import ByLine from '$lib/ByLine.svelte'
    import Timeline from '$lib/Timeline.svelte'

</script>

<ByLine author={author} date={date} type={type} title={title}/>

<Timeline {timelineArray}/>