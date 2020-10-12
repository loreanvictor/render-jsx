/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import register from 'jsdom-global'; register();
import { Plugin, PropPlugin } from '../../../renderer';
import { LiveDOMRenderer } from '../../live-renderer';
import { InputStatePlugin } from '../input-state.plugin';
import { testInputStateBinding } from './spec/input-state.spec';


describe('InputStatePlugin', () => {
  testInputStateBinding((dom, ...plugins) =>
    new LiveDOMRenderer(dom)
    .plug(() => new InputStatePlugin())
    .plug(...plugins)
  );

  it('should ignore if property does not equal to `_state`.', done => {
    class P extends Plugin<Node> implements PropPlugin<Node> {
      priority() { return Plugin.PriorityFallback; }
      setProp() { done(); return false; }
    }

    const r = new LiveDOMRenderer().plug(() => new InputStatePlugin(), () => new P());
    r.create('input', { state: () => {} });
  });

  it('should ignore if the node is not an input / textarea / select.', done => {
    class P extends Plugin<Node> implements PropPlugin<Node> {
      priority() { return Plugin.PriorityFallback; }
      setProp() { done(); return false; }
    }

    const r = new LiveDOMRenderer().plug(() => new InputStatePlugin(), () => new P());
    r.create('div', { _state: () => {} });
  });

  it('should ignore if the given value is not a function.', done => {
    class P extends Plugin<Node> implements PropPlugin<Node> {
      priority() { return Plugin.PriorityFallback; }
      setProp() { done(); return false; }
    }

    const r = new LiveDOMRenderer().plug(() => new InputStatePlugin(), () => new P());
    r.create('input', { _state: 42 });
  });
});
