---
title: "*The Feminine Monarchie*"
id: transcription
parent: literature
link: literature/transcription
lead: "The scholarly digital edition of Charles Butler's *The Feminine Monarchie* (1623), by Jennifer Richards, Olivia Smith, and Tiago Sousa Garcia"
img: 'assets/andrew-seaman--m88z7ily-w-unsplash.jpg'
imgAlt: 'a picture of a typewriter'
dataSelector: true
dataSelectorControls: [{
            dataSource: true,
            type: "select",
            label: 'dataSource',
            default: "1623",
            values: {
                "1623": "1623",
                "1609": "1609"
            },
        },
        {
            dataSource: false,
            type: "navigator",
            listIndex: [
                ["Titlepage", "titlepage"],
                ["Preface", preface],
                ["Ad Autorem", dedication],
                ["Table of Contents", "contents"],
                ["Chapter 1", "ch1"],
                ["Chapter 2", "ch2"],
                ["Chapter 3", "ch3"],
                ["Chapter 4", "ch4"],
                ["Chapter 5", "ch5"],
                ["Chapter 6", "ch6"],
                ["Chapter 7", "ch7"],
                ["Chapter 8", "ch8"],
                ["Chapter 9", "ch9"],
                ["Chapter 10", "ch10"],
            ],
            defaultSelected: "titlepage"
        },
        {
            dataSource: false,
            type: "radioGroup",
            label: "view",
            defaultValue: 'both',
            values: {
                facsimile: 'facsimile',
                both: 'both',
                transcription: 'transcription',
            },
        },
        {
            dataSource: false,
            type: "radioGroup",
            label: "variation",
            defaultValue: 'no variation',
            values: {
                "no variation": 'no variation',
                "major changes": 'major changes',
                "all changes": 'all changes',
            },
        },
        {
            dataSource: false,
            type: "toggle",
            label: 'editorial notes',
            values: {
                default: false,
            },
        },
        {
            dataSource: false,
            type: "toggle",
            label: "translations",
            values: {
                default: false,
            },
        }
]
type: [data, experience]
---
<script>
    import TranscriptionViewer from '$lib/TranscriptionViewer.svelte'
</script>

<TranscriptionViewer/>
