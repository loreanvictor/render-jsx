import { DOMWindow } from 'jsdom';
import { commonPlugins } from '../common';
import { componentPlugins } from '../component';
import { FragmentLifeCycleMarkerComponentProcessor } from './component';
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
      ...componentPlugins<Node>(),
      () => new FragmentLifeCycleMarkerComponentProcessor(),
      ...commonPlugins<Node>(),
      ...domPlugins(),
    );
  }
}
