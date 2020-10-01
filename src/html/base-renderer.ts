import { isPostRenderPlugin, Plugin, Renderer } from '../renderer';
import { UnrecognizedTagError } from './errors';


export class HTMLBaseRenderer extends Renderer<Node> {
  readonly document: HTMLDocument;

  constructor();
  constructor(doc: HTMLDocument);
  constructor(doc: HTMLDocument, ...plugins: Plugin<Node, HTMLBaseRenderer>[]);
  constructor(...plugins: Plugin<Node, HTMLBaseRenderer>[]);
  constructor(
    doc: HTMLDocument | Plugin<Node, HTMLBaseRenderer> = document,
    ...plugins: Plugin<Node, HTMLBaseRenderer>[]
  ) {
    super(...(doc instanceof HTMLDocument ? plugins : [doc, ...plugins]));
    if (doc instanceof HTMLDocument) {
      this.document = doc;
    } else {
      this.document = document;
    }
  }

  fallbackAppend(target: any, host: Node): void {
    if (target instanceof Node) {
      host.appendChild(target);
    } else if (Array.isArray(target)) {
      target.forEach(child => this.append(child, host));
    } else {
      host.appendChild(this.document.createTextNode(`${target}`));
    }
  }

  fallbackSetProp(node: Node, prop: string, target: any): void {
    if (node instanceof HTMLElement) {
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
    if (node instanceof HTMLElement) {
      node.innerHTML = `${target}`;
    } else {
      node.textContent = `${target}`;
    }
  }

  fallbackFragment(): Node {
    return this.document.createDocumentFragment();
  }

  fallbackCreate(tag: any, props?: { [prop: string]: any; }, ...children: any[]): Node {
    if (tag instanceof Node || typeof tag === 'string') {
      let el: Node;
      if (tag instanceof Node) {
        el = tag;
      } else {
        if (props && props.xmlns) {
          el = this.document.createElementNS(`${props.xmlns}`, tag);
        } else {
          el = this.document.createElement(tag);
        }
      }

      if (props) {
        Object.entries(props).forEach(([prop, target]) => this.setProp(el, prop, target));
      }

      children.forEach(child => this.append(child, el));
      return el;
    } else {
      throw new UnrecognizedTagError(tag);
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
    if (target instanceof DocumentFragment) {
      const children = Array.from(target.childNodes);
      return () => children.forEach(child => post.forEach(p => p.postRender(child)));
    } else {
      return () => post.forEach(p => p.postRender(target));
    }
  }
}
