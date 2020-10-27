/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import { DOMWindow, JSDOM } from 'jsdom';
import { RendererLike , PluginFactory } from '../../../../renderer';


export function testClassObjectSupport(
  factory: (dom: DOMWindow, ...plugins: PluginFactory<Node, RendererLike<Node>>[]) => RendererLike<Node>
) {
  it('should support setting style via toggle maps.', () => {
    const dom = new JSDOM().window;
    const renderer = factory(dom);

    const D = <div class={{ a: true, b: false, c: undefined, d: true }}/> as HTMLElement;
    D.classList.contains('a').should.be.true;
    D.classList.contains('b').should.be.false;
    D.classList.contains('c').should.be.false;
    D.classList.contains('d').should.be.true;
  });

  it('should support setting style via arrays.', () => {
    const dom = new JSDOM().window;
    const renderer = factory(dom);

    const D = <div class={['a', 'b', 'c']}/> as HTMLElement;
    D.classList.contains('a').should.be.true;
    D.classList.contains('b').should.be.true;
    D.classList.contains('c').should.be.true;
  });

  it('should support setting style via combination of arrays and toggle maps.', () => {
    const dom = new JSDOM().window;
    const renderer = factory(dom);

    const D = <div class={['a', 'b', { c: false, d: true }]}/> as HTMLElement;
    D.classList.contains('a').should.be.true;
    D.classList.contains('b').should.be.true;
    D.classList.contains('c').should.be.false;
    D.classList.contains('d').should.be.true;
  });
}
