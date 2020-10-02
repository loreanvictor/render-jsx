import { commonPlugins } from './common';
import { domPlugins, liveDOMComponentPlugin, LiveDOMRenderer } from './dom';


export * from './typings';
export * from './common';
export * from './renderer';
export * from './dom';
export * from './component';


export class HTMLRenderer extends LiveDOMRenderer {
  constructor(doc: HTMLDocument = document) {
    super(doc,
      liveDOMComponentPlugin(),
      ...commonPlugins<Node>(),
      ...domPlugins(),
    );
  }
}
