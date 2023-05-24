import { views } from "../data.js";
import { error } from "@sveltejs/kit";
import parseMD from "parse-md";
import { JSDOM } from 'jsdom';
import CETEI from 'CETEIcean';
import { transformTEI } from "../../../utils/teiOperations.js";

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
  let tei = ''
  if (view.slug === 'literature') {
    // Get the content of the TEI file into a string
    const teiString = await fetch("literature/data/Coopers_hill_1655.xml")
      .then(function(response) {
        if (response.ok) {
          return response.text();
        }
      });

    tei = transformTEI(teiString);

  }

  return {
    view, tei
  };
}
