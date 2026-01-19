---
title: Project timeline
id: project-timeline
parent: about
link: about/project-timeline
lead: "Here we detail the journey of the *Bee-ing Human* project, from the first discussions over a coffee, to the finished digital book you are reading today."
img: 'assets/articles/project-timeline/sigmund-ZLst8z_M6_8-unsplash.jpg'
imgAlt: 'A series of calendar pages spread about'
type: article
layout: article
author: [jenny, tiago]
date: 2025/08/18
order: 3
---

<script>
    import ByLine from '$lib/ByLine.svelte'
    import Timeline from '$lib/Timeline.svelte'
    import {base} from '$app/paths'

    let timelineArray =  [{
            date: "2020-01",
            dateString: "Jan 2020",
            title: "First conversations",
            description: `[Jennifer Richards](${base}/about/people/jenny) sets up the first conversations between several interested researchers on Butler's *The Feminine Monarchie*`
        },
        {
            date: "2020-07",
            dateString: "Jul 2020",
            title: "First project submission",
            description: "The first project to develop a more integrated way of working across and between science and arts and humanities was submitted to the Wellcome Trust"
        },
        {
            date: "2020-12",
            dateString: "Dec 2020",
            title: "Wellcome application is unsuccessful",
            description: "We learn the result of the application to the Wellcome Trust; the core team regroups and starts new conversations about a new project centered around Butler's *The Feminine Monarchie*"
        },
        {
            date: "2021-07",
            dateString: "Jul 2021",
            title: "Second project, *Bee-ing Human* is submitted to the Leverhulme Trust",
            description: `After months of conversations and preparation, the team submits its new project, *Bee-ing Human*, to the Leverhulme foundation. [Read the submitted application here](${base}/assets/articles/project-timeline/Original-Project-Proposal.pdf).`
        },
        {
            date: "2021-11",
            dateString: "Nov 2021",
            title: "*Bee-ing Human* is funded by the Leverhulme Trust",
            description: "Nearly two years after the first conversations about Butler and his book, the second project is funded by the Leverhulme Trust, with a provisional starting date of September 2022, running until the end of August of 2025"
        },
        {
            date: "2022-06",
            dateString: "Jun 2022",
            title: "New team members",
            description: `In anticipation of the start of the project, the team interviews and hires the two Research Associates that will start working in September, [Balamurali G. S.](${base}/about/people/balu) and [Olivia](${base}/about/people/olivia)`
        },
        {
            date: "2022-09",
            dateString: "Sep 2022",
            title: "Project start",
            description: `Project kicks-off with a first workshop in Newcastle. The core team (now with [Balu](${base}/about/people/balu) and [Olivia](${base}/about/people/olivia)) meets for the first time.`
        },
        {
            date: "2023-05",
            dateString: "May 2023",
            title: "MVP Digital Bee Book",
            description: `The Minimum Viable Product (MVP) of the digital bee book is published, ensuring that most of what the team has planned for the project can be done digitally.`
        },
        {
            date: "2023-08",
            dateString: "Aug 2023",
            title: "First annual report",
            description: `We submit our [first annual report](${base}/assets/articles/project-timeline/Bee-ing-Human-2023-report.pdf) to the Leverhulme. The first year was all about learning to work together and figuring out limits of what was possible.`
        },
        {
            date: "2023-09",
            dateString: "Sep 2023",
            title: "Jennifer Richards joins Cambridge University",
            description: `[Jennifer Richards](${base}/about/people/jenny) leaves Necastle for Cambridge University. She remains part of the project, but the administrative Principal Investigator responsibilities are now taken by [Magnus Williamson](${base}/about/people/magnus)`
        },
        {
            date: "2023-10",
            dateString: "Oct 2023",
            title: "*The Feminine Monarchie* is fully encoded",
            description: `Both the 1609 and the 1623 editions of *The Feminine Monarchie* have been fully encoded (to a basic standard) and are available to read at by the team and the public at large. The work of enriching the edition begins.`
        },
        {
            date: "2024-02",
            dateString: "Feb 2024",
            title: "Ensemble Pro Victoria perform 'Melissomelos'",
            description: `As part of the "Early Music @ Newcastle" event series, Ensemble Pro Victoria perform Melissomelos. The performance is recorded and can be seen [here](${base}/music/EPV-performance).`
        },
        {
            date: "2024-07",
            dateString: "Jul 2024",
            title: "Digital bee book design is implemented",
            description: `The final design of the digital bee book is introduced to the team, approved, implemented and made available to visitors.`
        },
        {
            date: "2023-08",
            dateString: "Aug 2023",
            title: "Second annual report",
            description: `We submit our [second annual report](${base}/assets/articles/project-timeline/Bee-ing-Human-2024-report.pdf) to the Leverhulme. The focus of our second year was in experimenting with the limits of our research.`
        },
        {
            date: "2024-12",
            dateString: "Dec 2024",
            title: "Welcome Luigi",
            description: `[Balu](${base}/about/people/balu) leaves the project for a faculty position at Atria University and is replaced by [Luigi Baciadonna](${base}/about/people/luigi).`
        },
        {
            date: "2025-06",
            dateString: "Jun 2025",
            title: "Digital Bee Book — beta release",
            description: `The development version of the Digital Bee Book is cleaned from temporary content, and the beta version is released to the advisory board and the general public.`
        },
        {
            date: "2025-09",
            dateString: "Sep 2025",
            title: "Digital Bee Book — full release",
            description: `Development on the technical aspects of the Digital Bee Book is concluded; content is still being added.`
        },]

</script>

<ByLine author={author} date={date} type={type} title={title} {readingTime}/>

Most projects only publish the final results of their research. However, to aid researchers, especially those at an earlier stage of their careers, we are sharing the timeline of our three-year collaboration, from application to completion. We include the [original research proposal]({base}/assets/articles/project-timeline/Original-Project-Proposal.pdf) as well as the annual reports for [2023]({base}/assets/articles/project-timeline/Bee-ing-Human-2023-report.pdf) and [2024]({base}/assets/articles/project-timeline/Bee-ing-Human-2024-report.pdf). We think it is important to do this because deep, cross-disciplinary collaborations are rare, and a science project led from the humanities such as this one, even rarer.

Our detailed timeline is visualised [here](#the-bee-ing-human-timeline). Below is a narrative account of it.

Many funded projects begin with a rejection, and so too did this one.

In 2020 [Jenny Richards]({base}/about/people/jenny), and [Candy Rowe]({base}/about/people/candy), a Professor of Animal Behaviour and Cognition, and, at the time, the Director of Newcastle University's Academic Tract (NUAcT) Fellowship Scheme, submitted an application to a new, one-off scheme: a Wellcome Trust Research Development Award in Humanities, Social Science and Bioethics. The idea was to explore and develop a more integrated way of working across and between arts practice, the humanities, and bio-environmental science.

This application was not successful, but our discussions had already led us to formulate a more focussed project based on doing cross-disciplinary collaboration, *Bee-ing Human*: an exploration of historical and contemporary approaches to the study of honeybee 'sentience', inspired by Charles Butler's beekeeping manual, *The Feminine Monarchie* (1609, 1623, 1634). The ambition of the earlier proposal to establish more integrated cross-disciplinary ways of addressing challenges, small, grand, and 'wicked', was not lost, but it was no longer foregrounded; rather, this became embedded in the project collaboration itself. By working together, we realised we would need to develop an integrated approach to cross-disciplinary study. This meant experimenting with and modelling the behaviours that are required to facilitate the sharing of expertise across STEM and [SHAPE](https://www.thebritishacademy.ac.uk/this-is-shape/) boundaries.

The team changed slightly between the two project proposals. The core team remained the same, with [Jenny Richards]({base}/about/people/jenny) as the lead-applicant, and [Magnus Williamson]({base}/about/people/magnus) (music), [Bennett Hogg]({base}/about/people/bennett) (music) and [Vivek Nityananda]({base}/about/people/vivek) (biological sciences) as co-applicants; however, Candy, who was appointed Dean of Research Culture and Strategy at Newcastle University, decided to join our advisory board, while [Tiago Sousa Garcia]({base}/about/people/tiago), who had joined the Newcastle Research Software Engineering team in 2022, became the designer of our book. [Olivia Smith]({base}/about/people/olivia) (literary studies) and [Balamurali G. S.]({base}/about/people/balu) (biology) joined us as Research Associates (RAs). We were later joined by [Luigi Baciadonna]({base}/about/people/luigi) (psychology) in 2025. In 2023 Jenny moved to a new university, which presented a new set of challenges, but also opportunities, including the chance to work with [Simon Jackson]({base}/about/people/simon-jackson), who directed Butler's bee song in 2017, plus easy access to copies of the three print editions of *The Feminine Monarchie*, held by Cambridge University Library (CUL). 

There were two earlier collaborations that were important to this cross-disciplinary STEM and SHAPE project. You could say that because of them, collaboration was in our DNA. One was the [Voices and Books 1500-1800 AHRC Network](https://research.ncl.ac.uk/voicesandbooks/) in 2014-15, co-led by Jenny and [Richard Wistreich]({base}/about/people/richard), with Magnus and other colleagues from across the UK. This collaboration between musicology and literary studies, foregrounded ways of thinking with voice that would become crucial to making sense of Butler's own thinking about how the changes in pitch that he heard in the hive and notated are meaningful, as he applied his training in grammar, rhetoric, music.

A second was [Animating Text Newcastle University (ATNU)](https://research.ncl.ac.uk/atnu/), thanks to university investment in Digital Humanities (2016-2020). This project involved collaboration between humanities (English, History, and Music), and Data Science, and, crucially for this project, created a working relationship with the [Research Software Engineering (RSE) team](https://rse.ncldata.dev/). ATNU also brought text-encoding or TEI expertise to Newcastle University with [Dr James Cummings]({base}/about/people/james) (previously Oxford), while the experimental digital work we did with the RSE team built a culture of collaboration with software engineers. Both were essential aspects of the *Bee-ing Human* Project and our co-creation of a [born-digital edition]({base}/literature/born-digital-edition) and collaborative bee book.

Before the *Bee-ing Human* project started, then, key relationships had been established, and our ways of working were easily transferable to it. Perhaps most importantly, we understood from the outset that we needed to respect disciplinary differences, so each of us worked independently in our disciplinary group (literary studies, music, science) on different tasks or 'work packages'. Crucially, though, the project came together when we met to report on progress, and to learn about each other's work, often by reading and discussing chapters or essays. Visits to the science lab to see experiments were always a highlight for the humanities team. The impact of one of those visits, when we learned a queen had died, is described [here]({base}/connections/queen-bee).

Key ideas were explored in our meetings, e.g. methodological replication; evolution; the idea of an experiment; the ethical treatment of bees; language (monosemy versus polysemy); emotions. How we thought and felt in the moment was recorded in our collective diary, extracts from which are shared [here]({base}/assets/articles/project-timeline/Bee-ing-Human-Collective-Diary-extracts.pdf). We always sought to understand the points of connection as well as differences between us. Butler's training in [rhetoric]({base}/literature/rhetoric-and-emotion) had taught him that 'voice' is expressive of a whole range of emotions, from joy to Iament. Our science colleagues, in contrast, are exploring whether bees experience anything akin to 'emotion-like' states. Their language is necessarily more restrictive, and their experiments focussed on the detection of pessimistic biases. However, we agreed we needed to let those differences 'sit' within the project. There was value in doing so since we were also exploring our emotional relationship with bees, as well as supporting work to promote their ethical treatment. Also, regardless of whether one is a scientist or a humanist, living in the twenty-first century or the seventeenth, we share exactly the same challenge: how does one actually interpret inner experience from observed behaviour/sounds.

You can listen to the Bee-ing Human team talking about their collaboration as part of The English Association's [Thinking Forwards](https://englishassociation.ac.uk/thinking-forwards-collaboration/) series on collaboration [here](https://englishassociation.ac.uk/thinking-forwards-collaboration-bee-ing-human/).

You can find out more about The Leverhulme Trust Project Grant scheme [here](https://www.leverhulme.ac.uk/research-project-grants). When preparing our application we took special note of advice from the Trust, that, for this scheme, they favour 'applications that surmount traditional disciplinary academic boundaries and involve a willingness to take appropriate degrees of risk in setting research objectives'. It's not hard to see how a group of literary scholars, musicologists, biologists, psychologists, and software engineers who wanted to understand the inner experience of bees might have thought this the right scheme! 

<h2 class="h2 mt-6 mb-2 font-thin" id="the-bee-ing-human-timeline">The <em>Bee-ing Human</em> timeline</h2>
<Timeline {timelineArray}/>
