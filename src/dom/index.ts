import { DOMWindow } from 'jsdom';
import { commonPlugins } from '../common';
import { liveDOMComponentPlugin } from './component';
import { LiveDOMRenderer } from './live-renderer';
import { domPlugins } from './plugins';


export * from './renderer';
export * from './util/life-cycle';
export * from './live-renderer';
export * from './plugins';
export * from './component';


export class CommonDOMRenderer extends LiveDOMRenderer {
  constructor(dom: DOMWindow = window as any) {
    super(dom,
      liveDOMComponentPlugin(),
      ...commonPlugins<Node>(),
      ...domPlugins(),
    );
  }
}
