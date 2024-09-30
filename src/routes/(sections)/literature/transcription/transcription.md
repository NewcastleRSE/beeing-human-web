---
title: The Feminine Monarchie - transcription
id: transcription
parent: literature
link: literature/transcription
lead: 'Something about what this section is, to show up in the card; potentially could be carved out of some other part in the file'
img: 'assets/andrew-seaman--m88z7ily-w-unsplash.jpg'
imgAlt: 'a picture of a typewriter'
dataSelector: true
dataSelectorControls: [{
            dataSource: true,
            type: "select",
            label: 'dataSource',
            default: "1623",
            values: {
                "1623": "https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/refs/heads/dev/1623_consolidated.xml",
                "1609": "https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/refs/heads/dev/1609.xml"
            },
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
        }
]
type: [data, experience]
---
<script>
    import TranscriptionViewer from '$lib/TranscriptionViewer.svelte'
</script>

<TranscriptionViewer teiPath = 'https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/dev/1623_consolidated.xml' iiifManifest = 'https://iiif.archive.org/iiif/RAM2023-1081/manifest.json' startPage=5/>
