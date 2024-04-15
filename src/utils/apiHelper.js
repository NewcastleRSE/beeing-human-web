import { getFileNameFromPathWithoutExtension } from './stringOperations'
import parseMD from 'parse-md'
import * as cheerio from 'cheerio'
import { marked } from 'marked';
// Using marked introduces an error at build time that fails the build (probably because it tries to prerender a route that does not exist somehow) -- added an option to svelt.config.kit.prerender.handleHttpError to warn to finish the build with a warning. Does not seem to affect anything.

export function getPortalsAPI(listPaths) {

    if (!listPaths || JSON.stringify(listPaths) === '{}') {
        throw new ReferenceError('No list of paths was passed to the API function')
    }
    
    let portals = {}
    for (const entryPath in listPaths) {
        if (!entryPath.includes('/') || !entryPath.includes('.md')) {
            // checks if the path is likely to be correct, if it isn't adds it to an errors list and moves on to the next entry
            if (portals.errors) {
                portals.errors.push(entryPath);
            } else {
                portals.errors = [entryPath];
            }
            continue
        }
        let path = JSON.stringify(entryPath);
        let id = getFileNameFromPathWithoutExtension(path);
        const {_, content} = parseMD(listPaths[entryPath]);

        if (!content) {
            // if couldn't extract content, moves on
            if (portals.errors) {
                portals.errors.push(entryPath);
            } else {
                portals.errors = [entryPath];
            }
            continue
        }

        // using cheerio to parse and navigate any xml-like content inside the buzzword (i.e., like a <Portal> component. Wrapping content in a <root> to facilitate this. The $variable notation is the convention in cheerio, which is based on jquery);

        // loads content as a cheerio object
        let $doc = undefined
        try {
            // seems to be next to impossible to force an error on loading xml
            $doc = cheerio.load(`<root>${content}</root>`);
        } catch(e) {
            console.log(e);
        }

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