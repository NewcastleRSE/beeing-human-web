let FlexSearch;

async function initFlexSearch() {
    if (!FlexSearch) {
        const module = await import('flexsearch');
        FlexSearch = module.default || module;
    }
}

let articlesIndex;
let articles;

export async function createArticleIndex(data) {
    await initFlexSearch();
    articlesIndex = new FlexSearch.Index({ tokenizer: "forward" });

    data.forEach((article, i) => {
        const item = `${article.title} ${article.content}`;
        articlesIndex.add(i, item);
    });

    articles = data;
}

export function searchArticlesIndex(searchTerm) {
    // escape regex
    const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // return matching post indexes
    const results = articlesIndex.search(match)

    return results
        // filter the posts based on the matched index
        .map((index) => articles[index])
        // you can do whatever you want at this point 👌
        .map(({ slug, title, content }) => {
            return {
                slug,
                // replace match in title with a marker
                title: replaceTextWithMarker(title, match),
                // match words in post and replace matches with marker
                content: getMatches(content, match),
            }
        })
}

function getMatches(text, searchTerm, limit = 1) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const indexes = []
    let matches = 0
    let match

    while ((match = regex.exec(text)) !== null && matches < limit) {
        indexes.push(match.index);
        matches++;
    };
    return indexes.map((index) => {
        // go back 20 characters
        const start = index - 20
        // go forward 80 characters
        const end = index + 80
        // yoink the text
        const excerpt = text.substring(start, end).trim()
        // return excerpt 🤝
        return `...${replaceTextWithMarker(excerpt, searchTerm)}...`
    })
}

function replaceTextWithMarker(text, match) {
  // create dynamic regex 😎
	const regex = new RegExp(match, 'gi')
  // preserves the text casing 🤙
	return text.replaceAll(regex, (match) => `<mark>${match}</mark>`)
}