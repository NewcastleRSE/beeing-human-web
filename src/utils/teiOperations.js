import { JSDOM } from 'jsdom';
import CETEI from 'CETEIcean';

export function transformTEI(teiString) {
    // Transforms the TEI file into custom elements
    // and
    // returns a serialised version of the transformed file,
    // as well as an array of new elements

    const jdom = new JSDOM(teiString, {contentType: 'text/xml'});
    const teiDoc = jdom.window.document;

    const ceteicean = new CETEI({documentObject: teiDoc});
    
    const teiData = ceteicean.preprocess(teiDoc);
    teiData.setAttribute("data-elements", Array.from(ceteicean.els).join(','));
    
    teiDoc.documentElement.replaceWith(teiData);
    const elements = teiDoc.documentElement.getAttribute('data-elements').split(',');

    return {content: jdom.serialize(), elements: elements};
}