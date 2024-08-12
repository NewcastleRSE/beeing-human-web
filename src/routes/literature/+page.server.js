import parseMD from 'parse-md';

export async function load({fetch}) {
    let listArticles = import.meta.glob("./\*/\*.md", {as: 'raw', eager: true});
    for (const article in listArticles) {
        const text = listArticles[article]
        const {metadata, content} = parseMD(text);
        console.log(metadata);
    }
}