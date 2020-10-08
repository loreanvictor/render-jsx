/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
import { should, expect } from 'chai'; should();
import register from 'jsdom-global'; register();
import { JSDOM } from 'jsdom';

import { DOMRenderer } from '../renderer';
import { Plugin, PluginFactory, PostRenderPlugin } from '../../renderer';
import { testAppendExtensibility } from '../../renderer/test/extensibility/append.spec';
import { testPropExtensibility } from '../../renderer/test/extensibility/prop.spec';
import { testContentExtensibility } from '../../renderer/test/extensibility/content.spec';
import { testFragmentExtensibility } from '../../renderer/test/extensibility/fragment.spec';
import { testLeafExtensibility } from '../../renderer/test/extensibility/leaf.spec';
import { testCreateExtensibility } from '../../renderer/test/extensibility/create.spec';
import { testPostRenderAfterExtensibility, testPostRenderBeforeExtensibility, testPostRenderOnExtensibility } from '../../renderer/test/extensibility/post-render.spec';


describe('DOMRenderer', () => {
  describe('.document', () => {
    it('should be the given document object', () => {
      const dom = new JSDOM();
      new DOMRenderer(dom.window).document.should.equal(dom.window.document);
    });

    it('should be the global dom object if no document is passed', () => {
      class P extends Plugin<Node> { priority() { return 0; }}
      new DOMRenderer().document.should.equal(document);
      new DOMRenderer(() => new P()).document.should.equal(document);
    });
  });

  const factory = (...plugins: PluginFactory<Node>[]) => new DOMRenderer(...plugins);

  describe('.append()', () => {
    testAppendExtensibility(factory);

    it('should append given node to given host.', () => {
      const host = document.createElement('div');
      const node = document.createElement('div');
      new DOMRenderer().append(node, host);
      host.children.item(0)?.should.equal(node);
    });

    it('should append given array of nodes to given host.', () => {
      const host = document.createElement('div');
      const A = document.createElement('a');
      const B = document.createElement('span');
      new DOMRenderer().append([A, B], host);
      host.children.item(0)?.should.equal(A);
      host.children.item(1)?.should.equal(B);
    });

    it('should create a text node for unknown types.', () => {
      const host = document.createElement('span');
      new DOMRenderer().append(42, host);
      host.textContent?.should.equal('42');
    });
  });

  describe('.setProp()', () => {
    testPropExtensibility(factory);

    it('should set given attribute to string form of given value.', () => {
      const host = document.createElement('button');
      new DOMRenderer().setProp(host, 'whatevs', 42);
      host.getAttribute('whatevs')?.should.equal('42');
    });

    it('should add or remove given attribute when given a boolean value.', () => {
      const host = document.createElement('span');
      const rndr = new DOMRenderer();
      rndr.setProp(host, 'halo', true);
      host.hasAttribute('halo').should.be.true;
      rndr.setProp(host, 'halo', false);
      host.hasAttribute('halo').should.be.false;
    });
  });

  describe('.setContent()', () => {
    testContentExtensibility(factory);

    it('should set text content of text nodes.', () => {
      const host = document.createTextNode('');
      new DOMRenderer().setContent(host, 42);
      host.textContent?.should.equal('42');
    });

    it('should set inner html of html elements.', () => {
      const host = document.createElement('div');
      new DOMRenderer().setContent(host, '<span>Hola</span><a/>');
      host.childElementCount.should.equal(2);
    });
  });

  describe('.fragment', () => {
    testFragmentExtensibility(factory);

    it('should be a document fragment.', () => {
      new DOMRenderer().fragment.should.be.instanceOf(DocumentFragment);
    });
  });

  describe('.leaf()', () => {
    testLeafExtensibility(factory);

    it('should be a text node.', () => {
      new DOMRenderer().leaf().should.be.instanceOf(Text);
    });
  });

  describe('.create()', () => {
    testCreateExtensibility(factory);

    it('should throw for unknown types.', () => {
      expect(() => new DOMRenderer().create(42)).to.throw();
    });

    it('should return given node if a node is given.', () => {
      const ref = document.createElement('div');
      new DOMRenderer().create(ref).should.equal(ref);
    });

    it('should create an element of given tag.', () => {
      new DOMRenderer().create('ul').should.be.instanceOf(HTMLUListElement);
    });

    it('should create elements with given namespace.', () => {
      (new DOMRenderer().create('svg', {xmlns: 'http://www.w3.org/2000/svg'}) as HTMLElement)
        .tagName.should.equal('svg');
    });
  });

  describe('.renderOn()', () => {
    testPostRenderOnExtensibility(factory);

    it('should render given node on given node.', () => {
      const host = document.createElement('div');
      const target = document.createElement('div');
      new DOMRenderer().render(target).on(host);
      host.children.item(0)?.should.equal(target);
    });

    it('should run post renderers on children of a fragment too.', () => {
      let r = 0;
      class P extends Plugin<Node> implements PostRenderPlugin<Node> {
        priority() { return 0; }
        postRender() { r++; }
      }
      const frag = document.createDocumentFragment();
      frag.append(document.createElement('a'));
      frag.append(document.createElement('b'));
      frag.append(document.createElement('c'));
      new DOMRenderer().render(frag).on(document.createElement('div'));
    });
  });

  describe('.renderBefore()', () => {
    testPostRenderBeforeExtensibility(factory);

    it('should render given node before given node.', () => {
      const host = document.createElement('div');
      const ref = document.createElement('div'); host.append(ref);
      const target = document.createElement('div');
      const rndr = new DOMRenderer();
      rndr.render(target).before(ref);
      host.children.length.should.equal(2);
      host.children.item(0)?.should.equal(target);
    });

    it('should run post renderers on children of a fragment too.', () => {
      let r = 0;
      class P extends Plugin<Node> implements PostRenderPlugin<Node> {
        priority() { return 0; }
        postRender() { r++; }
      }
      const frag = document.createDocumentFragment();
      frag.append(document.createElement('a'));
      frag.append(document.createElement('b'));
      frag.append(document.createElement('c'));
      const host = document.createElement('div');
      const ref = document.createElement('div'); host.append(ref);
      new DOMRenderer().render(frag).before(ref);
    });

    it('should ignore orphan references.', () => {
      const r = document.createElement('div');
      const t = document.createElement('div');
      new DOMRenderer().render(t).before(r);
      expect(t.parentElement).to.be.null;
    });
  });

  describe('.renderAfter()', () => {
    testPostRenderAfterExtensibility(factory);

    it('should render given node after given node.', () => {
      const host = document.createElement('div');
      const ref = document.createElement('div'); host.append(ref);
      const target = document.createElement('div');
      const rndr = new DOMRenderer();
      rndr.render(target).after(ref);
      host.children.length.should.equal(2);
      host.children.item(1)?.should.equal(target);
    });

    it('should run post renderers on children of a fragment too.', () => {
      let r = 0;
      class P extends Plugin<Node> implements PostRenderPlugin<Node> {
        priority() { return 0; }
        postRender() { r++; }
      }
      const frag = document.createDocumentFragment();
      frag.append(document.createElement('a'));
      frag.append(document.createElement('b'));
      frag.append(document.createElement('c'));
      const host = document.createElement('div');
      const ref = document.createElement('div'); host.append(ref);
      new DOMRenderer().render(frag).after(ref);
    });

    it('should ignore orphan references.', () => {
      const r = document.createElement('div');
      const t = document.createElement('div');
      new DOMRenderer().render(t).after(r);
      expect(t.parentElement).to.be.null;
    });
  });

  describe('.remove()', () => {
    it('should remove given node.', () => {
      const host = document.createElement('div');
      const target = document.createElement('div'); host.append(target);
      const t2 = document.createTextNode('hola'); host.append(t2);
      new DOMRenderer().remove(target);
      host.childNodes.length.should.equal(1);
      new DOMRenderer().remove(t2);
      host.childNodes.length.should.equal(0);
    });

    it('should ignore orphan elements.', () => {
      new DOMRenderer().remove(document.createElement('div'));
    });
  });

  describe('.clone()', () => {
    it('should return a new DOM renderer with same document and given plugins.', () => {
      class P extends Plugin<Node> { priority() { return 0; } }
      const dom = new JSDOM();
      const rndr = new DOMRenderer(dom.window).clone(() => new P());
      rndr.should.be.instanceOf(DOMRenderer);
      rndr.document.should.equal(dom.window.document);
      rndr.plugins[0].should.be.instanceOf(P);
    });
  });
});
