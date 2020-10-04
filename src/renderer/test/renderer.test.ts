/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */

import { should, expect } from 'chai';
import { AppendPlugin, ContentPlugin, CreatePlugin, Plugin, PropPlugin } from '../plugin';
 should();

import { Renderer } from '../renderer';
import { testAppendExtensibility } from './extensibility/append.spec';
import { testContentExtensibility } from './extensibility/content.spec';
import { testPropExtensibility } from './extensibility/prop.spec';
import { testFragmentExtensibility } from './extensibility/fragment.spec';
import { testLeafExtensibility } from './extensibility/leaf.spec';
import { testCreateExtensibility } from './extensibility/create.spec';
import { testPostCreateExtensibility } from './extensibility/post-create.spec';
import { testPostRenderBeforeExtensibility,
        testPostRenderOnExtensibility,
        testPostRenderAfterExtensibility } from './extensibility/post-render.spec';


describe('Renderer', () => {
  class R extends Renderer<any> {
    fallbackAppend(_target: any, _host: any): void {}
    fallbackSetProp(_node: any, _prop: string, _target: any): void {}
    fallbackSetContent(_node: any, _target: any): void {}
    fallbackFragment() {}
    fallbackLeaf() {}
    fallbackCreate(_tag: any, _props?: { [prop: string]: any; }) { return {}; }
    renderOn(_target: any, _host: any): void {}
    renderAfter(_target: any, _ref: any): void {}
    renderBefore(_target: any, _ref: any): void {}
  }

  const factory = (...p: Plugin<any, any>[]) => new R(...p);

  describe('.append()', () => {
    testAppendExtensibility(factory);

    it('should invoke `.fallbackAppend()` when no plugin returns `true`.', done => {
      class P extends Plugin<any, any> implements AppendPlugin<any> {
        priority() { return Plugin.PriorityFallback; }
        append() { return false; }
      }

      const _t = {}; const _h = {};
      class CR extends R {
        fallbackAppend(target: any, host: any) {
          target.should.equal(_t);
          host.should.equal(_h);
          done();
        }
      }

      new CR(new P()).append(_t, _h);
    });
  });

  describe('.setProp()', () => {
    testPropExtensibility(factory);

    it('should invoke `.fallbackSetProp()` when no plugin returns `true`.', done => {
      class P extends Plugin<any, any> implements PropPlugin<any> {
        setProp() { return false; }
        priority() { return Plugin.PriorityMax; }
      }

      const _n = {}; const _p = 'ASDJASNDszjxalSx9283aids'; const _t = {};
      class CR extends R {
        fallbackSetProp(node: any, prop: string, target: any) {
          node.should.equal(_n);
          prop.should.equal(_p);
          target.should.equal(_t);
          done();
        }
      }

      new CR(new P()).setProp(_n, _p, _t);
    });
  });

  describe('.setContent()', () => {
    testContentExtensibility(factory);

    it('should invoke `.fallbackSetContent()` when no plugin returns `true`.', done => {
      class P extends Plugin<any, any> implements ContentPlugin<any> {
        priority() { return Plugin.PriorityMax; }
        setContent() { return false; }
      }

      const _n = {}; const _t = {};
      class CR extends R {
        fallbackSetContent(node: any, target: any) {
          node.should.equal(_n);
          target.should.equal(_t);
          done();
        }
      }

      new CR(new P()).setContent(_n, _t);
    });
  });

  describe('.fragment', () => {
    testFragmentExtensibility(factory);

    it('should invoke `.fallbackFragment()` when no fragment plugin provided.', done => {
      class CR extends R {
        fallbackFragment() { done(); }
      }

      new CR().fragment;
    });
  });

  describe('.leaf()', () => {
    testLeafExtensibility(factory);

    it('should invoke `.fallbackLeaf()` when no leaf plugin provided.', done => {
      class CR extends R {
        fallbackLeaf() { done(); }
      }

      new CR().leaf();
    });
  });

  describe('.create()', () => {
    testCreateExtensibility(factory);
    testPostCreateExtensibility(factory);

    it('should invoke `.fallbackCreate()` when no plugin returns a node.', done => {
      class P extends Plugin<any, any> implements CreatePlugin<any> {
        priority() { return Plugin.PriorityFallback; }
        create() { return undefined; }
      }

      const _t = {}; const _p = {};
      class CR extends R {
        fallbackCreate(tag: any, props: any) {
          tag.should.equal(_t);
          props.should.equal(_p);
          done(); return {};
        }
      }

      new CR(new P()).create(_t, _p, 42, 43, 44);
    });

    it('should invoke `.setProp()` for provided properties when using fallback.', () => {
      const res: string[][] = [];
      const _n = {};
      class CR extends R {
        setProp(node: any, prop: string, target: any) {
          node.should.equal(_n);
          res.push([prop, target]);
        }

        fallbackCreate() { return _n; }
      }

      new CR().create(42, { exit: 'the light', enter: 'night' });
      res.should.eql([
        ['exit', 'the light'],
        ['enter', 'night']
      ]);
    });

    it('should invoke `.append()` for provided children when using fallback.', () => {
      const res: string[] = [];
      const _n = {};
      class CR extends R {
        append(target: any, host: any) {
          host.should.equal(_n);
          res.push(target);
        }

        fallbackCreate() { return _n; }
      }

      new CR().create(42, {}, 'I know', 'the pieces fit', 'cuz I watched them', 'fall away');
      res.join(' ').should.equal('I know the pieces fit cuz I watched them fall away');
    });
  });

  describe('.render()', () => {
    describe('.on()', () => {
      testPostRenderOnExtensibility(factory);

      it('should invoke `.renderOn()`', done => {
        const _t = {}; const _h = {};
        class CR extends R {
          renderOn(target: any, host: any) {
            target.should.equal(_t);
            host.should.equal(_h);
            done();
          }
        }
        new CR().render(_t).on(_h);
      });
    });

    describe('.before()', () => {
      testPostRenderBeforeExtensibility(factory);

      it('should invoke `.renderBefore()`', done => {
        const _t = {}; const _h = {};
        class CR extends R {
          renderBefore(target: any, host: any) {
            target.should.equal(_t);
            host.should.equal(_h);
            done();
          }
        }
        new CR().render(_t).before(_h);
      });
    });

    describe('.after()', () => {
      testPostRenderAfterExtensibility(factory);

      it('should invoke `.renderAfter()`', done => {
        const _t = {}; const _h = {};
        class CR extends R {
          renderAfter(target: any, host: any) {
            target.should.equal(_t);
            host.should.equal(_h);
            done();
          }
        }
        new CR().render(_t).after(_h);
      });
    });

    it('should invoke given function on the renderer object and invoke render accordingly.', () => {
      const res: any[] = [];
      class CR extends R {
        renderOn(target: any) { res.push({ on: target }); }
        renderBefore(target: any) { res.push({ before: target }); }
        renderAfter(target: any) { res.push({ after: target }); }
      }

      const r = new CR();
      const f = (_r: R) => { _r.should.equal(r); return "New Year's Eve"; };
      r.render(f).on(42); r.render(f).before(42); r.render(f).after(42);
      res.should.eql([
        { on: "New Year's Eve" },
        { before: "New Year's Eve" },
        { after: "New Year's Eve" }
      ]);
    });
  });
});

