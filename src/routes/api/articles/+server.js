import {json} from '@sveltejs/kit'
import { getArticleMetadata } from '../../../utils/apiHelper.js';

export const prerender = true

export async function GET(event) {
    let articles = import.meta.glob(['/src/routes/\*\//\*\//\*\/\*.md', '!**/buzzwords/*.md'], {as: 'raw', eager: true});
    let articleMetadata = getArticleMetadata(articles)
    return json(articleMetadata);
}



