import {json} from '@sveltejs/kit'
import { getFileNameFromPathWithoutExtension } from '../../../../utils/stringOperations.js';
import parseMD from 'parse-md'
import * as cheerio from 'cheerio'

export const prerender = true

export async function GET(event) {
    const portalBuzzwords = getBuzzwordsAPI();
    return json(portalBuzzwords);
}

function getBuzzwordsAPI() {
    let listBuzzWords = import.meta.glob('./../../../connections/buzzwords/*.md', {as: 'raw', eager: true});
    let portalBuzzwords = {}
    for (const buzz in listBuzzWords) {
        let path = JSON.stringify(buzz);
        let id = getFileNameFromPathWithoutExtension(path);
        const {_, content} = parseMD(listBuzzWords[buzz]);

        // using cheerio to parse and navigate any xml-like content inside the buzzword (i.e., like a <Portal> component. Wrapping content in a <root> to facilitate this. The $variable notation is the convention in cheerio, which is based on jquery);

        // loads content as a cheerio object
        const $doc = cheerio.load(`<root>${content}</root>`);

        // gets any Portal elements
        const $portals = $doc('Portal')

        // If Portals exist, iterate through them 
        if  ($portals.length > 0) {
            for (const $portal of $portals) {
                const portalId = $doc($portal).attr('id');
                const portalContent = $doc($portal).text();
                // adds portal to the response object
                portalBuzzwords[portalId] = {content: portalContent, buzzID: id}
            }
        }
    }

    return portalBuzzwords
}

