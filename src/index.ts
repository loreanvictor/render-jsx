import { commonPlugins } from './common';
import { domComponentPlugins, domPlugins, LiveDOMRenderer } from './dom';


export * from './typings';
export * from './common';
export * from './renderer';
export * from './dom';


export class HTMLRenderer extends LiveDOMRenderer {
  constructor(doc: HTMLDocument = document) {
    super(doc,
      ...commonPlugins<Node>(),
      ...domPlugins(),
      ...domComponentPlugins(),
    );
  }
}
