import parseMD from 'parse-md';

export async function load({}) {
    let listArticles = import.meta.glob("./\*/\*.md", {query: '?raw', eager: true});
    let articlesObject = {}
    for (const article in listArticles) {
        const text = listArticles[article].default
        const {metadata, _} = parseMD(text);
        articlesObject[metadata.id] = metadata
    }
    return articlesObject
}