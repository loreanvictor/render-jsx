/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import { DOMWindow, JSDOM } from 'jsdom';
import { RendererLike , PluginFactory, Plugin, PropPlugin} from '../../../../renderer';


export function testOptionObjectValueSupport(
  factory: (dom: DOMWindow, ...plugins: PluginFactory<Node, RendererLike<Node>>[]) => RendererLike<Node>
) {
  it('should allow attaching JS objects to select options.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const r = factory(dom);
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
    setTimeout(() => {
      (i as HTMLSelectElement).options.item(1)!!.selected = true;
      i.dispatchEvent(new Event('input'));
    }, 10);
  });
}
