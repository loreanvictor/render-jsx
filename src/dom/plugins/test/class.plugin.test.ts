/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();

import { JSDOM } from 'jsdom';
import { Plugin } from '../../../renderer';
import { DOMRenderer } from '../../renderer';
import { AddClassPlugin, ClassPlugin, ToggleClassPlugin } from '../class.plugin';
import { testClassObjectSupport } from './spec/class.spec';


describe('ClassPlugin', () => {
  testClassObjectSupport((dom, ...plugins) =>
    new DOMRenderer(dom)
      .plug(() => new ClassPlugin())
      .plug(...plugins)
  );

  it('should use other `AddClassPlugin`s in the renderer.', () => {
    class P extends Plugin<Node, DOMRenderer> implements AddClassPlugin<DOMRenderer> {
      sw: any;
      addClass(node: HTMLElement, target: any, _switch: (value: string) => void): boolean {
        node.tagName.should.equal('SPAN');
        target.should.equal('hola');
        this.sw = _switch;
        _switch('AAA');
        return true;
      }
      priority() { return Plugin.PriorityFallback; }
    }

    const p = new P();

    const dom = new JSDOM().window;
    const renderer = new DOMRenderer(dom).plug(
      () => new ClassPlugin(),
      () => p
    );

    const N = renderer.create('span', { class: ['hola']}) as HTMLElement;
    N.classList.contains('AAA').should.be.true;
    p.sw('BBB');
    N.classList.contains('AAA').should.be.false;
    N.classList.contains('BBB').should.be.true;
  });

  it('should use other `ToggleClassPlugin`s on the renderer.', () => {
    const V = {};
    class P extends Plugin<Node, DOMRenderer> implements ToggleClassPlugin<DOMRenderer> {
      toggle: any;
      addClassToggle(node: HTMLElement, className: string, target: any, toggle: (v: boolean) => void): boolean {
        node.tagName.should.equal('I');
        className.should.equal('bozo');
        target.should.equal(V);
        this.toggle = toggle;
        toggle(true);
        return true;
      }
      priority() { return Plugin.PriorityFallback; }
    }

    const p = new P();

    const dom = new JSDOM().window;
    const renderer = new DOMRenderer(dom).plug(
      () => new ClassPlugin(),
      () => p
    );

    const N = renderer.create('i', { class: { bozo: V }}) as HTMLElement;
    N.classList.contains('bozo').should.be.true;
    p.toggle(false);
    N.classList.contains('bozo').should.be.false;
    p.toggle(true);
    N.classList.contains('bozo').should.be.true;
  });

  it('should ignore when given target is not an array or an object.', () => {
    class P extends Plugin<Node, DOMRenderer> implements ToggleClassPlugin<DOMRenderer> {
      addClassToggle(): boolean { throw new Error('should not have got here'); }
      priority() { return Plugin.PriorityFallback; }
    }

    const dom = new JSDOM().window;
    const renderer = new DOMRenderer(dom).plug(
      () => new ClassPlugin(),
      () => new P(),
    );

    renderer.create('div', { class: undefined});
  });
});
