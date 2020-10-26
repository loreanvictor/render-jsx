/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import { DOMWindow, JSDOM } from 'jsdom';
import { ref, RefPlugin } from '../../../../common';
import { RendererLike , PluginFactory } from '../../../../renderer';
import { LiveDOMComponentThis } from '../../fragment-lcmarker.processor';


export function testFragmentLCMarkerSupport(
  factory: (dom: DOMWindow, ...plugins: PluginFactory<Node, RendererLike<Node>>[]) => RendererLike<Node>
) {
  it('should allow setting custom markers for fragments returned by a component.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const renderer = factory(dom);
    function F(this: LiveDOMComponentThis) {
      const d = <div id='D'></div>;
      this.setLifeCycleMarker(d);
      this.onClear(() => done());
      return <>{d}<div></div></>;
    }

    renderer.render(<F/>).on(dom.document.body);
    dom.document.getElementById('D')?.remove();
  });

  it('should allow setting custom fragment lc markers using refs as well.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const renderer = factory(dom, () => new RefPlugin());
    function F(this: LiveDOMComponentThis) {
      const d = ref();
      this.setLifeCycleMarker(d);
      this.onClear(() => done());
      return <>
        <div _ref={d} id='D'></div>
        <div></div>
      </>;
    }

    renderer.render(<F/>).on(dom.document.body);
    dom.document.getElementById('D')?.remove();
  });

  it('should still auto-create a marker in case no marker is set.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const renderer = factory(dom);
    function F(this: LiveDOMComponentThis) {
      this.onClear(() => done());
      return <>
        <div></div>
        <div></div>
      </>;
    }

    renderer.render(<div id='D'><F/></div>).on(dom.document.body);
    dom.document.getElementById('D')?.remove();
  });
}
