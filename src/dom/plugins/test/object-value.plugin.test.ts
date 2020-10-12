/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import register from 'jsdom-global'; register();
import { Plugin, PropPlugin } from '../../../renderer';
import { LiveDOMRenderer } from '../../live-renderer';
import { InputStatePlugin } from '../input-state.plugin';
import { OptionObjectValuePlugin } from '../object-value.plugin';
import { testOptionObjectValueSupport } from './spec/object-value.spec';


describe('OptionObjectValuePlugin', () => {
  testOptionObjectValueSupport((dom, ...plugins) =>
    new LiveDOMRenderer(dom)
    .plug(
      () => new InputStatePlugin(),
      () => new OptionObjectValuePlugin()
    )
    .plug(...plugins)
  );

  it('should ignore if property does not equal to `_value`.', done => {
    class P extends Plugin<Node> implements PropPlugin<Node> {
      priority() { return Plugin.PriorityFallback; }
      setProp() { done(); return false; }
    }

    const r = new LiveDOMRenderer().plug(() => new OptionObjectValuePlugin(), () => new P());
    r.create('option', { value: {} });
  });
});
