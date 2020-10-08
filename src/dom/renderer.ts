import { DOMWindow } from 'jsdom';
import { isPostRenderPlugin, Plugin, PluginFactory, Renderer, RendererLike } from '../renderer';
import { UnrecognizedTagError } from './errors';


export class DOMRenderer extends Renderer<Node, DOMRenderer> {
  readonly dom: DOMWindow;

  constructor(dom?: DOMWindow, ...plugins: PluginFactory<Node, RendererLike<Node>>[]);
  constructor(...plugins: PluginFactory<Node, RendererLike<Node>>[]);
  constructor(
    dom: DOMWindow | PluginFactory<Node, RendererLike<Node>> = window as any,
    ...plugins: PluginFactory<Node, RendererLike<Node>>[]
  ) {
    super(...(typeof dom === 'function' ? [dom, ...plugins] : plugins));
    if (!dom || typeof dom === 'function') {
      this.dom = window as any;
    } else {
      this.dom = dom;
    }
  }

  get document() { return this.dom.document; }

  fallbackAppend(target: any, host: Node): void {
    if (target instanceof this.dom.Node) {
      host.appendChild(target);
    } else if (Array.isArray(target)) {
      target.forEach(child => this.append(child, host));
    } else {
      host.appendChild(this.document.createTextNode(`${target}`));
    }
  }

  fallbackSetProp(node: Node, prop: string, target: any): void {
    if (node instanceof this.dom.HTMLElement) {
      if (typeof target === 'boolean') {
        if (target) {
          node.setAttribute(prop, '');
        } else {
          node.removeAttribute(prop);
        }
      } else {
        node.setAttribute(prop, `${target}`);
      }
    }
  }

  fallbackSetContent(node: Node, target: any): void {
    if (node instanceof this.dom.HTMLElement) {
      node.innerHTML = `${target}`;
    } else {
      node.textContent = `${target}`;
    }
  }

  fallbackFragment(): Node {
    return this.document.createDocumentFragment();
  }

  fallbackLeaf(): Node {
    return this.document.createTextNode('');
  }

  fallbackCreate(tag: any, props?: { [prop: string]: any; }): Node {
    if (!(tag instanceof this.dom.Node || typeof tag === 'string')) {
      throw new UnrecognizedTagError(tag);
    }

    if (tag instanceof this.dom.Node) {
      return tag;
    } else if (props && props.xmlns) {
      return this.document.createElementNS(`${props.xmlns}`, tag);
    } else {
      return this.document.createElement(tag);
    }
  }

  renderOn(target: Node, host: Node): void {
    host.appendChild(target);
  }

  renderAfter(target: Node, ref: Node): void {
    if (ref.parentNode) {
      ref.parentNode.insertBefore(target, ref.nextSibling);
    }
  }

  renderBefore(target: Node, ref: Node): void {
    if (ref.parentNode) {
      ref.parentNode.insertBefore(target, ref);
    }
  }

  postRender(target: Node) {
    const post = this.plugins.filter(isPostRenderPlugin);
    if (target instanceof this.dom.DocumentFragment) {
      const children = Array.from(target.childNodes);

      return () => children.forEach(child => { this.postRender(child)(); });
    } else {
      return () => post.forEach(p => p.postRender(target));
    }
  }

  remove(node: Node) {
    node.parentNode?.removeChild(node);
  }

  clone(...plugins: PluginFactory<Node, RendererLike<Node>>[]) {
    return new DOMRenderer(this.dom, ...plugins);
  }
}
