import { loadMei } from "../../utils/loadFunctions.js";
import { base } from "$app/paths";


export async function load({fetch}) {

  // Load MEI if in the music view
  // fetch MEI file, convert to string;
  let url = `${base}/content/music/data/CRIM_Model_0001.mei`;
  let meiString = await fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.text();
      };
    });
  // load mei into verovio, generate SVG and MIDI
  let mei = await loadMei(meiString);

  // if the transformation was successful, add mei to data.view
  if (mei) {
    mei = { ...mei };
  }
  return {
    mei /*, tei, teiString */
  };
}
