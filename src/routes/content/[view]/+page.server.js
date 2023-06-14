import { views } from "../data.js";
import { error } from "@sveltejs/kit";
import parseMD from "parse-md";
import verovio from 'verovio';

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
  // This would be necessary for a more granular approach to implement CETEIcean, but is not needed for the simple approach;
  // let tei = '';
  // let teiString = '';
  // if (view.slug === 'literature') {
  //   // Get the content of the TEI file into a string
  //   teiString = await fetch("literature/data/test2.xml")
  //     .then(function(response) {
  //       if (response.ok) {
  //         return response.text();
  //       }
  //     });

  //   tei = transformTEI(teiString);

  // }

  // Load MEI if in the music view
  let meiSvg = [];
  let meiString = '';
  let meiMidi = '';
  let mei = {};
  if (view.slug === 'music') {
    // Start verovio toolkit
    const vTk = new verovio.toolkit();
    
    // Set default options for the toolkit
    vTk.setOptions({
      scale: 30,
    });

    // fetch MEI file, convert to string;
    meiString = await fetch('music/data/CRIM_Model_0001.mei')
      .then(function(response) {
        if (response.ok) {
          return response.text();
        };
      });

    let loaded = vTk.loadData(meiString);
    if (loaded) {
      let nrPages = vTk.getPageCount();
      for (let page = 1; page <= nrPages; page++) {
        let meiPage = vTk.renderToSVG(page);
        meiSvg.push(meiPage);
      }
      let base64midi = vTk.renderToMIDI();
      meiMidi = 'data:audio/midi;base64,' + base64midi;
    }
    if (meiSvg.length > 0) {
      mei.svg = meiSvg;
      mei.midi = meiMidi
      view["mei"] = {...mei};
    }

  }

  return {
    view /*, tei, teiString */
  };
}
