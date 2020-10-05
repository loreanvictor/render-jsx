
import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,                                  // --> add the theme. modify `./theme.ts` for chaning the theme.
  dest: {
    namespace: '/render-jsx',
    html: 'dist',
    assets: process.env.GITHUB_BUILD === 'true' ? 'dist' : '.',
    bundle: process.env.GITHUB_BUILD === 'true' ? 'bundle' : 'dist/bundle',
    styles: process.env.GITHUB_BUILD === 'true' ? 'styles' : 'dist/styles',
  },
  page: {
    title: {
      base: 'Render JSX'                  // --> the base title of your doc pages
    }
  },
  misc: {
    github: {
      user: 'loreanvictor',               // --> your github username (where your repo is hosted)
      repo: 'render-jsx',                 // --> your github repo name
    }
  },
});
