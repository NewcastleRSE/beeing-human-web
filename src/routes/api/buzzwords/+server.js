import {json} from '@sveltejs/kit'
import { getBuzzwordsObject } from '../../../utils/apiHelper.js';

export const prerender = true

export async function GET(event) {
    let listBuzzWords = import.meta.glob('/src/routes/\*\/connections/buzzwords/*.md', {query: '?raw', eager: true});
    const buzzwordsObject = getBuzzwordsObject(listBuzzWords)
    return json(buzzwordsObject);
}



