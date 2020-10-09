/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import register from 'jsdom-global'; register();
import { JSDOM } from 'jsdom';
import { Plugin, PropPlugin } from '../../../renderer';
import { LiveDOMRenderer } from '../../live-renderer';
import { InputStatePlugin } from '../input-state.plugin';
import { OptionObjectValuePlugin } from '../object-value.plugin';


describe('OptionObjectValuePlugin', () => {
  it('should allow attaching JS objects to select options.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const r = new LiveDOMRenderer(dom).plug(() => new InputStatePlugin(), () => new OptionObjectValuePlugin());
    const A = {}; const B = {};
    const res: any[] = [];
    const i = r.create('select', {
        _state: (v: any) => {
          res.push(v);
          if (res.length === 2) {
            res[0].should.equal(A);
            res[1].should.equal(B);
            done();
          }
        }
      },
      r.create('option', { _value: A, selected: true }),
      r.create('option', { _value: B })
    );
    r.render(i).on(dom.document.body);
    (i as HTMLSelectElement).options.item(1)!!.selected = true;
    i.dispatchEvent(new Event('input'));
  });

  it('should ignore if property does not equal to `_value`.', done => {
    class P extends Plugin<Node> implements PropPlugin<Node> {
      priority() { return Plugin.PriorityFallback; }
      setProp() { done(); return false; }
    }

    const r = new LiveDOMRenderer().plug(() => new OptionObjectValuePlugin(), () => new P());
    r.create('option', { value: {} });
  });
});
