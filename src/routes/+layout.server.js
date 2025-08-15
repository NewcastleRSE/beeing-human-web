import lunr from 'lunr';

export async function load({fetch}) {
    // Fetches metadata about articles and other sections
    let response = await fetch('/api/articles');
    let articleData = await response.json();

    let searchData = await fetch('/api/search.json');
    searchData = await searchData.json();

    let index = lunr(function () {
        this.ref('id')
        this.field('title')
        this.field('content')
        this.metadataWhitelist = ['position']

        searchData.forEach(post => {
            this.add(post)
        })
    })

    return { articleData, searchIndex: JSON.stringify(index) }
}