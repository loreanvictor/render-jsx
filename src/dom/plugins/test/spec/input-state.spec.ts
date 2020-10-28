/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */
import { should, expect } from 'chai'; should();
import { DOMWindow, JSDOM } from 'jsdom';
import { RendererLike , PluginFactory, Plugin, PropPlugin} from '../../../../renderer';


export function testInputStateBinding(
  factory: (dom: DOMWindow, ...plugins: PluginFactory<Node, RendererLike<Node>>[]) => RendererLike<Node>
) {
  it('should pass values of the given input to given callback.', done => {
    const dom = new JSDOM().window;
    const res: string[] = [];
    const r = factory(dom);
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
    setTimeout(() => {
      (i as HTMLInputElement).value = 'B';
      i.dispatchEvent(new Event('input'));
    }, 10);
  });

  it('should pass values of the given number input to given callback.', done => {
    const dom = new JSDOM().window;
    const res: number[] = [];
    const r = factory(dom);
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
    setTimeout(() => {
      (i as HTMLInputElement).value = '84';
      i.dispatchEvent(new Event('input'));
    }, 10);
  });

  it('should pass values of the given checkbox to given callback.', done => {
    const dom = new JSDOM().window;
    const res: boolean[] = [];
    const r = factory(dom);
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
    setTimeout(() => {
      (i as HTMLInputElement).click();
    }, 10);
  });

  it('should pass values of the given textarea to given callback.', done => {
    const dom = new JSDOM().window;
    const res: string[] = [];
    const r = factory(dom);
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
    setTimeout(() => {
      (i as HTMLTextAreaElement).value = 'B';
      i.dispatchEvent(new Event('input'));
    }, 10);
  });

  it('should pass values of the given select to given callback.', done => {
    const dom = new JSDOM().window;
    const res: string[] = [];
    const r = factory(dom);
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
    setTimeout(() => {
      (i as HTMLSelectElement).options.item(1)!!.selected = true;
      i.dispatchEvent(new Event('input'));
    }, 10);
  });

  it('should pass values of the given multiselect to given callback.', done => {
    const dom = new JSDOM().window;
    const res: string[][] = [];
    const r = factory(dom);
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
    setTimeout(() => {
      (i as HTMLSelectElement).options.item(1)!!.selected = true;
      i.dispatchEvent(new Event('input'));
    }, 10);
  });

  it('should pass values of given radio to given callback.', done => {
    const dom = new JSDOM().window;
    const res: boolean[] = [];
    const r = factory(dom);
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

    setTimeout(() => {
      (f.firstChild as HTMLInputElement).click();
      (f.lastChild as HTMLInputElement).click();
      (f.lastChild?.previousSibling as HTMLInputElement).click();
      (f.firstChild?.nextSibling as HTMLInputElement).click();
    }, 10);
  });

  it('should pass values of given formless radio to given callback.', done => {
    const dom = new JSDOM().window;
    const res: boolean[] = [];
    const r = factory(dom);
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
    setTimeout(() => {
      r1.click();
      r2.click();
      r4.click();
      r3.click();
    }, 10);
  });

}
