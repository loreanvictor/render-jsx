import { LifeCycleHook, LiveRendererLike } from '../renderer';
import { DOMRenderer } from './renderer';
import { attach, bind } from './life-cycle';


export class LiveDOMRenderer extends DOMRenderer implements LiveRendererLike<Node> {
  hook(node: Node, hook: LifeCycleHook): void {
    attach(hook, node);
  }

  postRender(target: Node) {
    if (target instanceof DocumentFragment) {
      const children = Array.from(target.childNodes);
      return () => children.forEach(child => { this.postRender(child)(); });
    } else {
      return () => {
        if (this.document.contains(target)) {
          bind(target);
        }
  
        super.postRender(target)();
      }
    }
  }
}
