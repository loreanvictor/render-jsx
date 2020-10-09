/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import register from 'jsdom-global'; register();
import { JSDOM } from 'jsdom';
import { Plugin, PropPlugin } from '../../../renderer';
import { LiveDOMRenderer } from '../../live-renderer';
import { InputStatePlugin } from '../input-state.plugin';


describe('InputStatePlugin', () => {
  it('should pass values of the given input to given callback.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const res: string[] = [];
    const r = new LiveDOMRenderer(dom).plug(() => new InputStatePlugin());
    const i = r.create('input', {
      type: 'text',
      _state: (v: any) => {
        res.push(v);
        if (res.length === 2) {
          res.should.eql(['A', 'B']);
          done();
        }
      },
      value: 'A'
    });
    r.render(i).on(dom.document.body);
    (i as HTMLInputElement).value = 'B';
    i.dispatchEvent(new Event('input'));
  });

  it('should pass values of the given number input to given callback.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const res: number[] = [];
    const r = new LiveDOMRenderer(dom).plug(() => new InputStatePlugin());
    const i = r.create('input', {
      type: 'number',
      _state: (v: any) => {
        res.push(v);
        if (res.length === 2) {
          res.should.eql([42, 84]);
          done();
        }
      },
      value: '42'
    });
    r.render(i).on(dom.document.body);
    (i as HTMLInputElement).value = '84';
    i.dispatchEvent(new Event('input'));
  });

  it('should pass values of the given checkbox to given callback.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const res: boolean[] = [];
    const r = new LiveDOMRenderer(dom).plug(() => new InputStatePlugin());
    const i = r.create('input', {
      type: 'checkbox',
      _state: (v: any) => {
        res.push(v);
        if (res.length === 2) {
          res.should.eql([false, true]);
          done();
        }
      },
      checked: false
    });
    r.render(i).on(dom.document.body);
    (i as HTMLInputElement).click();
  });

  it('should pass values of the given textarea to given callback.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const res: string[] = [];
    const r = new LiveDOMRenderer(dom).plug(() => new InputStatePlugin());
    const i = r.create('textarea', {
      _state: (v: any) => {
        res.push(v);
        if (res.length === 2) {
          res.should.eql(['', 'B']);
          done();
        }
      }
    });
    r.render(i).on(dom.document.body);
    (i as HTMLTextAreaElement).value = 'B';
    i.dispatchEvent(new Event('input'));
  });

  it('should pass values of the given select to given callback.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const res: string[] = [];
    const r = new LiveDOMRenderer(dom).plug(() => new InputStatePlugin());
    const i = r.create('select', {
        _state: (v: any) => {
          res.push(v);
          if (res.length === 2) {
            res.should.eql(['A', 'B']);
            done();
          }
        }
      },
      r.create('option', { value: 'A', selected: true }),
      r.create('option', { value: 'B' })
    );
    r.render(i).on(dom.document.body);
    (i as HTMLSelectElement).options.item(1)!!.selected = true;
    i.dispatchEvent(new Event('input'));
  });

  it('should pass values of the given multiselect to given callback.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const res: string[][] = [];
    const r = new LiveDOMRenderer(dom).plug(() => new InputStatePlugin());
    const i = r.create('select', {
        multiple: true,
        _state: (v: any) => {
          res.push(v);
          if (res.length === 2) {
            res.should.eql([['A'], ['A', 'B']]);
            done();
          }
        }
      },
      r.create('option', { value: 'A', selected: true }),
      r.create('option', { value: 'B' })
    );
    r.render(i).on(dom.document.body);
    (i as HTMLSelectElement).options.item(1)!!.selected = true;
    i.dispatchEvent(new Event('input'));
  });

  it('should pass values of given radio to given callback.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const res: boolean[] = [];
    const r = new LiveDOMRenderer(dom).plug(() => new InputStatePlugin());
    const f = r.create('form', {},
      r.create('input', {
        type: 'radio', name: 'X',
        _state: (v: any) => {
          res.push(v);
          if (res.length === 3) {
            res.should.eql([false, true, false]);
            done();
          }
        }
      }),
      r.create('input', { type: 'radio', name: 'X' }),
      r.create('input', { type: 'radio', name: 'Y' })
    );
    r.render(f).on(dom.document.body);
    r.render(r.create('input', {type: 'radio', name: 'X'})).on(document.body);
    (f.firstChild as HTMLInputElement).click();
    (f.lastChild as HTMLInputElement).click();
    (f.lastChild?.previousSibling as HTMLInputElement).click();
    (f.firstChild?.nextSibling as HTMLInputElement).click();
  });

  it('should pass values of given formless radio to given callback.', done => {
    const dom = new JSDOM().window;
    global.MutationObserver = dom.window.MutationObserver;
    const res: boolean[] = [];
    const r = new LiveDOMRenderer(dom).plug(() => new InputStatePlugin());
    let r1: HTMLInputElement, r2: HTMLInputElement, r3: HTMLInputElement, r4: HTMLInputElement;
    const f = r.create(r.fragment, {},
      r1 = r.create('input', {
        type: 'radio', name: 'X',
        _state: (v: any) => {
          res.push(v);
          if (res.length === 3) {
            res.should.eql([false, true, false]);
            done();
          }
        }
      }) as any,
      r2 = r.create('input', { type: 'radio', name: 'X' }) as any,
      r3 = r.create('input', { type: 'radio', name: 'Y' }) as any,
    );
    const f2 = r.create('form', {},
      r4 = r.create('input', { type: 'radio', name: 'X' }) as any,
    );
    r.render(f).on(dom.document.body);
    r.render(f2).on(dom.document.body);
    r1.click();
    r2.click();
    r4.click();
    r3.click();
  });

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
