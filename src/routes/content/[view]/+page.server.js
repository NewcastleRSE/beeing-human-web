import { views } from "../data.js";
import { error } from "@sveltejs/kit";
import parseMD from "parse-md";
import { JSDOM } from 'jsdom';
import CETEI from 'CETEIcean';

export async function load({ fetch, params }) {
  let view = views.find((view) => view.slug === params.view);
  let listSections = [];

  if (!view) throw error(404, `${params.view} does not exist`);

  // get list of sections
  // import.meta.glob does not allow for dynamic variables in the search path, so it needs a switch statement to adjust based on the selected view
  // will need to be adapted if different/more views are necessary
  switch (view.slug) {
    case "literature":
      listSections = import.meta.glob("/static/content/literature/*.md", {
        as: "raw",
        eager: true,
      });
      break;
    case "science":
      listSections = import.meta.glob("/static/content/science/*.md", {
        as: "raw",
        eager: true,
      });
      break;
    case "music":
      listSections = import.meta.glob("/static/content/music/*.md", {
        as: "raw",
        eager: true,
      });
      break;
    case "interdisciplinarity":
      listSections = import.meta.glob(
        "/static/content/interdisciplinarity/*.md",
        { as: "raw", eager: true }
      );
      break;
    default:
      throw error(404, `${view} does not exist;`);
      break;
  }

  // iterate through the list of sections and add it to the `data.js` data
  let sections = {};
  for (const path in listSections) {
    const { metadata, content } = parseMD(listSections[path]);
    sections[metadata.title] = { ...metadata, content: content };
  }

  // add section metadata and data to export view
  view["sections"] = sections;

  // TEST CETEICEAN
  let testString = '';
  let jdom = '';
  let processedTEI = '';
  let processedTEIString = '';
  if (view.slug === 'literature') {
    testString = await fetch("literature/data/testTEI.xml")
      .then(function(response) {
        if (response.ok) {
          return response.text();
        }
      });

    jdom = new JSDOM(`<TEI xmlns="http://www.tei-c.org/ns/1.0"><div>test</div></TEI>`, {contentType: 'text/xml'});
    const teiDoc = jdom.window.document;
    processedTEI = (new CETEI({documentObject: teiDoc}).domToHTML5(teiDoc));

    console.log(processedTEI.outerHTML);

    processedTEI = JSON.stringify(processedTEI.querySelector('tei-div').outerHTML);
  }

  return {
    view, processedTEI
  };
}
