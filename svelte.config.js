import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

import {mdsvex} from 'mdsvex'

const mdsvexOptions = {
  extensions: ['.md'],
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", '.md'],

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      'utils': 'src/utils',
    },
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
      assets: '',
      relative: true,
    },
  },

  preprocess: [preprocess(), mdsvex(mdsvexOptions)],
};

export default config;
