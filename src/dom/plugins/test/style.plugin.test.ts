/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import { JSDOM } from 'jsdom';
import { Plugin } from '../../../renderer';
import { DOMRenderer } from '../../renderer';
import { SetStylePlugin, StylePlugin } from '../style.plugin';
import { testStyleObjectSupport } from './spec/style.spec';


describe('StylePlugin', () => {
  testStyleObjectSupport((dom, ...plugins) =>
    new DOMRenderer(dom)
      .plug(() => new StylePlugin())
      .plug(...plugins)
  );

  it('should try to utilize provided `SetStylePlugin`s  of the renderer.', () => {
    class P extends Plugin<Node, DOMRenderer> implements SetStylePlugin<DOMRenderer> {
      set: any;
      priority(): number {
        return Plugin.PriorityFallback;
      }
      setStyle(node: HTMLElement, style: string, target: any, set: (value: string | object) => void): boolean {
        node.tagName.should.equal('DIV');
        style.should.equal('swag');
        target.should.equal('high');
        set('koolaid');
        this.set = set;
        return true;
      }
    }

    const p = new P();

    const dom = new JSDOM().window;
    const renderer = new DOMRenderer(dom)
      .plug(() => new StylePlugin())
      .plug(() => p);

    const N = renderer.create('div', {style: { swag: 'high' }}) as HTMLElement;
    N.style['swag' as any].should.equal('koolaid');
    p.set('wassup');
    N.style['swag' as any].should.equal('wassup');
  });

  it('should ignore when the property is not `style`.', () => {
    class P extends Plugin<Node, DOMRenderer> implements SetStylePlugin<DOMRenderer> {
      priority(): number { return Plugin.PriorityFallback; }
      setStyle(): boolean { throw new Error('should not have got here.'); }
    }

    const dom = new JSDOM().window;
    const renderer = new DOMRenderer(dom)
      .plug(() => new StylePlugin())
      .plug(() => new P());
    renderer.create('div', {_style: { swag: 'high' }});
  });

  it('should ignore when the target is not an object.', () => {
    class P extends Plugin<Node, DOMRenderer> implements SetStylePlugin<DOMRenderer> {
      priority(): number { return Plugin.PriorityFallback; }
      setStyle(): boolean { throw new Error('should not have got here.'); }
    }

    const dom = new JSDOM().window;
    const renderer = new DOMRenderer(dom)
      .plug(() => new StylePlugin())
      .plug(() => new P());
    renderer.create('div', {style: undefined});
  });
});
