export * from './typings';
export * from './common';
export * from './renderer';
export * from './html';


import { ContentPropPlugin, RefPlugin } from './common';
import { EventHandlerPlugin, LiveDOMRenderer } from './html';


export function htmlPlugins() {
  return [
    new RefPlugin<Node>(),
    new ContentPropPlugin<Node>(),
    new EventHandlerPlugin(),
  ];
}


export class HTMLRenderer extends LiveDOMRenderer {
  constructor(doc: HTMLDocument = document) {
    super(doc, ...htmlPlugins());
  }
}
