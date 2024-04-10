import { getFileNameFromPathWithoutExtension } from './stringOperations'
import parseMD from 'parse-md'
import * as cheerio from 'cheerio'
import { marked } from 'marked';
// Using marked introduces an error at build time that fails the build (probably because it tries to prerender a route that does not exist somehow) -- added an option to svelt.config.kit.prerender.handleHttpError to warn to finish the build with a warning. Does not seem to affect anything.

export function getPortalsAPI(listPaths) {
    
    let portals = {}
    for (const entryPath in listPaths) {
        let path = JSON.stringify(entryPath);
        let id = getFileNameFromPathWithoutExtension(path);
        const {_, content} = parseMD(listPaths[entryPath]);

        // using cheerio to parse and navigate any xml-like content inside the buzzword (i.e., like a <Portal> component. Wrapping content in a <root> to facilitate this. The $variable notation is the convention in cheerio, which is based on jquery);

        // loads content as a cheerio object
        const $doc = cheerio.load(`<root>${content}</root>`);

        // gets any Portal elements
        const $portals = $doc('Portal')

        // If Portals exist, iterate through them 
        if  ($portals.length > 0) {
            for (const $portal of $portals) {
                const portalId = $doc($portal).attr('id');
                let portalContent = $doc($portal).text();

                // converts any existing markup into html
                portalContent = marked.parse(portalContent)
                // adds portal to the response object
                portals[portalId] = {content: portalContent, id: id}
            }
        }
    }

    return portals
}