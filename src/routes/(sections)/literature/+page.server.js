import parseMD from 'parse-md';

export async function load({}) {
    let listArticles = import.meta.glob("./\*/\*.md", {as: 'raw', eager: true});
    let articlesObject = {}
    for (const article in listArticles) {
        const text = listArticles[article]
        const {metadata, _} = parseMD(text);
        articlesObject[metadata.id] = metadata
    }
    return articlesObject
}