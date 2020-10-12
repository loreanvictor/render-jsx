/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import register from 'jsdom-global'; register();
import { DOMRenderer } from '../../renderer';
import { EventHandlerPlugin } from '../event-handler.plugin';
import { Plugin, PropPlugin } from '../../../renderer';
import { testFunctionalEventHandlerSupport } from './spec/event-handler.spec';


describe('EventHandlerPlugin', () => {
  testFunctionalEventHandlerSupport((dom, ...plugins) =>
    new DOMRenderer(dom)
      .plug(() => new EventHandlerPlugin())
      .plug(...plugins)
  );

  it('should ignore when property does not start with `on`', done => {
    class P extends Plugin<Node> implements PropPlugin<Node> {
      priority() { return Plugin.PriorityFallback; }
      setProp() { done(); return false; }
    }

    const r = new DOMRenderer().plug(() => new EventHandlerPlugin(), () => new P());
    r.create('div', { click: () => {}});
  });

  it('should ignore when given value is not a function', done => {
    class P extends Plugin<Node> implements PropPlugin<Node> {
      priority() { return Plugin.PriorityFallback; }
      setProp() { done(); return false; }
    }

    const r = new DOMRenderer().plug(() => new EventHandlerPlugin(), () => new P());
    r.create('div', { onclick: 42 });
  });
});
