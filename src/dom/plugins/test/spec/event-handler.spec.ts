/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import { DOMWindow, JSDOM } from 'jsdom';
import { RendererLike , PluginFactory } from '../../../../renderer';


export function testFunctionalEventHandlerSupport(
  factory: (dom: DOMWindow, ...plugins: PluginFactory<Node, RendererLike<Node>>[]) => RendererLike<Node>
) {
  it('should allow functions to be passed as event handlers on elements.', done => {
    const dom = new JSDOM().window;
    const r = factory(dom);
    const e = new dom.Event('click');
    r.create('div', {
      onclick: (event: any) => {
        event.should.equal(e);
        done();
      }
    }).dispatchEvent(e);
  });
}
