/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import { DOMWindow, JSDOM } from 'jsdom';
import { RendererLike , PluginFactory } from '../../../../renderer';


export function testStyleObjectSupport(
  factory: (dom: DOMWindow, ...plugins: PluginFactory<Node, RendererLike<Node>>[]) => RendererLike<Node>
) {
  it('should support setting style via objects', () => {
    const dom = new JSDOM().window;
    const renderer = factory(dom);
    const D = <div style={{
      textAlign: 'right',
      'fontSize.em': 2,
      transform: {
        scale: 1.5,
        'rotate.deg': 30
      },
      transition: {
        background: '.5s',
        'color.ms': 200,
      }
    }}/> as HTMLElement;

    D.style.textAlign.should.equal('right');
    D.style.fontSize.should.equal('2em');
    D.style.transform.should.equal('scale(1.5) rotate(30deg)');
    D.style.transition.should.equal('background .5s, color 200ms');
  });
}
