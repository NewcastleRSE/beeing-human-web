import {json} from '@sveltejs/kit'
import { getFileNameFromPathWithoutExtension } from '../../../utils/stringOperations.js';
import parseMD from 'parse-md'
export const prerender = true

export async function GET(event) {
    const buzzwords = getBuzzwordsAPI();
    return json(buzzwords)
}

function getBuzzwordsAPI() {
    let listBuzzWords = import.meta.glob('./../buzzwords/*.md', {as: 'raw', eager: true});
    let buzzwords = {}
    for (const buzz in listBuzzWords) {
        let path = JSON.stringify(buzz);
        let id = getFileNameFromPathWithoutExtension(path);
        const {_, content} = parseMD(listBuzzWords[buzz]);
        
        // REPLACE REGEX WITH A DOMPARSER 
        const regexp = /<Portal(.*)>(.*)<\/Portal>/g
        
        const tags = content.matchAll(regexp)
        const listTags = []
        for (const tag of tags) {
            console.log(tag)
            if (tag[0]) {
                listTags.push(tag[0]);
            }
        }

        // THIS DOES NOT WORK ON SERVER, USE JSDOM or ANYTHING CAPABLE OF PARSING XML-LIKE ELEMENTS
        const parser = new DOMParser();
        const doc = parser.parseFromString(content);
        console.log(doc);
        if (listTags != []) {
            buzzwords[id] = listTags;
        }
    }

    return buzzwords
}

