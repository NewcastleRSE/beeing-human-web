import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

import {mdsvex} from 'mdsvex'
import rehypeClassNames from 'rehype-class-names'
import remarkFootnotes from "remark-footnotes";
import { customClasses } from "./skeleton-typography.js";

// rehype plugin adds the class name necessary for Skeleton typography
const mdsvexOptions = {
  extensions: ['.md'],
  layout: {
    article: './src/lib/ArticleLayout.svelte'
  },
  smartypants: {
    quotes: false,
    ellipses: true,
    backticks: true,
    dashes: true
  },
  remarkPlugins: [remarkFootnotes],
  rehypePlugins: [
    [rehypeClassNames, customClasses]
  ]
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
      relative: true,
    },
    prerender: {
      handleHttpError: 'warn',
      handleMissingId: 'warn'
    }
  },

  preprocess: [preprocess(), mdsvex(mdsvexOptions)],
};

export default config;
