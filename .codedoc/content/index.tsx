import { RendererLike } from '@connectv/html';
import { File } from 'rxline/fs';
import { Page, Meta, ContentNav, Fonts, ToC, GithubSearch$ } from '@codedoc/core/components';

import { config } from '../config';
import { Header } from './header';
import { Footer } from './footer';


export function content(_content: HTMLElement, toc: HTMLElement, renderer: RendererLike<any, any>, file: File<string>) {
  return (
    <Page title={config.page.title.extractor(_content, config, file)}
          favicon={config.page.favicon}
          meta={<Meta {...config.page.meta}/>}
          fonts={<Fonts {...config.page.fonts}/>}

          scripts={config.page.scripts}
          stylesheets={config.page.stylesheets}

          header={<Header {...config}/>}
          footer={<Footer {...config}/>}
          toc={
            <ToC search={
                  config.misc?.github ?
                  <GithubSearch$
                    repo={config.misc.github.repo}
                    user={config.misc.github.user}
                    root={config.src.base}
                    pick={config.src.pick.source}
                    drop={config.src.drop.source}
                  /> : false
            }>{toc}</ToC>
          }>
      <style>{`
        p { line-height: 1.7rem }
        h1 img, h2 img, h3 img, h4 img { width: 2rem; vertical-align: bottom; }
        #-codedoc-toc a { color: ${config.theme.light.text}; }
        #-codedoc-toc a:hover, #-codedoc-toc a.current { color: ${config.theme.light.primary}; }
        body.dark #-codedoc-toc a { color: ${config.theme.dark.text}; }
        body.dark #-codedoc-toc a:hover,
        body.dark #-codedoc-toc a.current { color: ${config.theme.dark.primary}; }
        @media (prefers-color-scheme: dark) {
          body:not(.dark-mode-animate) #-codedoc-toc a { color: ${config.theme.dark.text}; }
          body:not(.dark-mode-animate) #-codedoc-toc a:hover,
          body:not(.dark-mode-animate) #-codedoc-toc a.current { color: ${config.theme.dark.primary}; }
        }
        body.dark-mode-animate #-codedoc-toc a { transition: color .3s, background .3s, border-color .3s; }
      `}</style>
      {_content}
      <ContentNav content={_content}/>
    </Page>
  );
}
