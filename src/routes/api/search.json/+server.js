import {json} from '@sveltejs/kit'
import { returnArticleSearch } from '../../../utils/apiHelper.js';
import removeMd from 'remove-markdown';

export const prerender = true

function cleanMD(content) {
    // removes markdown
    content = removeMd(content);
    // removes anything inside <script> tags
    content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    //TODO still needs to remove import statments

    return content;
}

export async function GET(event) {
    let articles = import.meta.glob(['/src/routes/\*\//\*\//\*\/\*.md', '!**/buzzwords/*.md'], {query: '?raw', eager: true});
    let articleMetadata = returnArticleSearch(articles)

    // strip markdown from content
    articleMetadata = articleMetadata.map(article => ({
        ...article,
        content: cleanMD(article.content)
    }));

    

    return json(articleMetadata);
}

