import { getFileNameFromPathWithoutExtension, getListOfUniqueElements } from './stringOperations'
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
            // catches any errors loading xml (though it seems next to impossible to create one)
            $doc = cheerio.load(`<root>${content}</root>`, {xml: {withEndIndices: true}});
        } catch(e) {
            if (portals.errors) {
                portals.errors.push({[entryPath]: e});
            } else {
                portals.errors = [{[entryPath]: e}];
            }
            continue
        }

        // if it couldn't load xml but didn't produce an error
        if ($doc === undefined) {
            if (portals.errors) {
                portals.errors.push({[entryPath]: e});
            } else {
                portals.errors = [{[entryPath]: e}];
            }
            continue
        }

        // gets any Portal elements
        let $portals = undefined
        try {
            $portals = $doc('Portal')
        } catch (e){
            if (portals.errors) {
                portals.errors.push({[entryPath]: e});
            } else {
                portals.errors = [{[entryPath]: e}];
            }
            continue
        }

        // If Portals exist, iterate through them 
        if  ($portals.length > 0) {
            for (const $portal of $portals) {
                
                if ($portal.endIndex >= $portal.parent.endIndex) {
                    // if end index of the portal is the same or bigger than their parent, the tag is likely malformed or not closed at all
                    if (portals.errors) {
                        portals.errors.push({[entryPath]: 'Portal tag is malformed'});
                    } else {
                        portals.errors = [{[entryPath]: 'Portal tag is malformed'}];
                    }
                    continue
                }

                let portalId = undefined;
                portalId = $doc($portal).attr('id');
                if (!portalId) {
                    portalId = `undefined-${$portal.endIndex}`
                }

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

export function getBuzzwordsObject(listPaths) {
    let buzzwords = []
    let buzzwordTags = []
    let buzzwordAuthors = []
    for (const buzz in listPaths) {
      let path = JSON.stringify(buzz);
      let id = getFileNameFromPathWithoutExtension(path);
      // still need to get the content here, despite not using it for display, so that the searchbar functions can work;
      const {metadata, content} = parseMD(listPaths[buzz]);
      if (metadata.tags) {
        // splits the tags into an array, ensuring they are all lowercase
        metadata.tags = metadata.tags.toLowerCase().split(', ');
        metadata.author = metadata.author.toLowerCase();
      }
      metadata.date = new Date(metadata.date)
      buzzwords.push({...metadata, id: id, content:content});
    }

    // create list of tags for buzzwords
    let tags = buzzwords.map(entry => entry.tags).flat();
    
    // get a list of unique elements in the array and remove any undefined
    buzzwordTags = getListOfUniqueElements(tags);

    // create a list of authors
    buzzwordAuthors = getListOfUniqueElements(buzzwords.map(entry => entry.author));

    return {buzzwords, buzzwordTags, buzzwordAuthors}
}

export function getArticleMetadata(listArticles) {
    const articles = {};
    for (const path in listArticles) {
        let id = getFileNameFromPathWithoutExtension(path);
        const {metadata, _} = parseMD(listArticles[path]);
        articles[id] = {...metadata}
        if (articles[id].type && typeof(articles[id].type) === 'string') {
            articles[id].type = articles[id].type.split(", ")
        } else if (articles[id].type === undefined){
        articles[id].type = ['none']
        }
    }
    return articles
}