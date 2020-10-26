import { JSDOM } from 'jsdom';
import { LiveDOMRenderer } from '../../../dom';
import { FunctionalComponentPlugin } from '../func-comp.plugin';
import { LiveComponentProcessor } from '../live-component.processor';
import { testComponentLifeCycleHooksSupport } from './spec/live-component.processor.spec';


describe('LiveComponentProcessor', () => {
  const dom = new JSDOM().window;
  global.MutationObserver = dom.window.MutationObserver;
  testComponentLifeCycleHooksSupport(
    (...plugins) =>
      new LiveDOMRenderer(dom)
      .plug(() => new FunctionalComponentPlugin<Node>())
      .plug(() => new LiveComponentProcessor())
      .plug(...plugins),
    () => dom.document.body as Node,
  );
});
