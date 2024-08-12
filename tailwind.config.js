// @ts-check
import { join } from 'path';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

import { beeTheme } from './bee-theme';

/** @type {import('tailwindcss').Config} */
export default {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		clipPath: {
			hexagonBorder: "path('M97.7267 2.96631C100.585 2.96631 103.226 4.4911 104.655 6.96631L133.881 57.5881C135.31 60.0633 135.31 63.1129 133.881 65.5881L104.655 116.21C103.226 118.685 100.585 120.21 97.7267 120.21L39.2737 120.21C36.4156 120.21 33.7745 118.685 32.3455 116.21L3.11899 65.5881C1.68994 63.1129 1.68994 60.0633 3.119 57.5881L32.3455 6.9663C33.7746 4.4911 36.4156 2.96631 39.2737 2.96631L97.7267 2.96631Z')",

			hexagon: "path('M96.0133 5.75L121.74 50.3096C123.437 53.2489 123.437 56.8703 121.74 59.8096L96.0133 104.369C94.3163 107.309 91.1801 109.119 87.7861 109.119L36.3331 109.119C32.9391 109.119 29.8029 107.309 28.1059 104.369L2.37937 59.8096C0.682352 56.8703 0.682352 53.2489 2.37936 50.3096L28.1059 5.75C29.8029 2.81069 32.9391 0.999999 36.3331 0.999999L87.7861 1C91.1801 1 94.3163 2.81069 96.0133 5.75Z')"
		},
		extend: {},
	},
	plugins: [
		require('tailwind-clip-path'),
		// 4. Append the Skeleton plugin (after other plugins)
		skeleton({
      themes: {
        custom: [beeTheme]
      }
    }),
	]
}