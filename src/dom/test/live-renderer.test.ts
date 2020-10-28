/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
import { should, expect } from 'chai'; should();
import register from 'jsdom-global'; register();
import { JSDOM } from 'jsdom';

import { LiveDOMRenderer } from '../live-renderer';
import { Plugin } from '../../renderer';


describe('LiveDOMRenderer', () => {
  describe('hook', () => {
    it('should attach given lifecycle hooks to given node.', done => {
      const dom = new JSDOM();
      let bound = false; let cleared = false;
      const r = new LiveDOMRenderer(dom.window);
      const n = dom.window.document.createElement('div');
      r.hook(n, {
        bind() { bound = true; },
        clear() { cleared = true; }
      });
      r.render(n).on(dom.window.document.body);
      setTimeout(() => {
        bound.should.be.true; cleared.should.be.false;
        r.remove(n);
        setTimeout(() => {
          cleared.should.be.true;
          done();
        }, 10);
      }, 10);
    });

    it('should also work for elements in fragments.', done => {
      const dom = new JSDOM();
      let bound = false; let cleared = false;
      const r = new LiveDOMRenderer(dom.window);
      const d = dom.window.document.createElement('div');
      const f = dom.window.document.createDocumentFragment();
      const n = dom.window.document.createElement('a'); f.append(n);
      r.render(d).on(dom.window.document.body);
      r.hook(n, {
        bind() { bound = true; },
        clear() { cleared = true; }
      });
      r.render(f).on(d);
      setTimeout(() => {
        bound.should.be.true; cleared.should.be.false;
        r.remove(d);
        setTimeout(() => {
          cleared.should.be.true;
          done();
        }, 10);
      }, 10);
    });

    it('should also work for fragments.', done => {
      const dom = new JSDOM();
      let bound = false; let cleared = false;
      const r = new LiveDOMRenderer(dom.window);
      const d = dom.window.document.createElement('div');
      const f = dom.window.document.createDocumentFragment();
      const n = dom.window.document.createElement('a'); f.append(n);
      r.render(d).on(dom.window.document.body);
      r.hook(f, {
        bind() { bound = true; },
        clear() { cleared = true; }
      });
      r.render(f).on(d);
      setTimeout(() => {
        bound.should.be.true; cleared.should.be.false;
        r.remove(d);
        setTimeout(() => {
          cleared.should.be.true;
          done();
        }, 10);
      }, 10);
    });

    it('should not trigger hook when element is not part of the document.', done => {
      const dom = new JSDOM();
      let bound = false;
      const r = new LiveDOMRenderer(dom.window);
      const n = dom.window.document.createElement('div');
      r.hook(n, {
        bind() { bound = true; }
      });
      r.render(n).on(dom.window.document.createElement('div'));
      setTimeout(() => {
        bound.should.be.false;
        done();
      }, 10);
    });
  });

  describe('.clone()', () => {
    it('should return a new live DOM renderer with same document and given plugins.', () => {
      class P extends Plugin<Node> { priority() { return 0; } }
      const dom = new JSDOM();
      const rndr = new LiveDOMRenderer(dom.window).clone(() => new P());
      rndr.should.be.instanceOf(LiveDOMRenderer);
      rndr.document.should.equal(dom.window.document);
      rndr.plugins[0].should.be.instanceOf(P);
    });
  });
});
