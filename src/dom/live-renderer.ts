import { LifeCycleHook, LiveRendererLike } from '../renderer';
import { DOMRenderer } from './renderer';
import { attachLifeCycleHook, lifeCycleBind } from './util/life-cycle';


export class LiveDOMRenderer extends DOMRenderer implements LiveRendererLike<Node> {
  hook(node: Node, hook: LifeCycleHook): void {
    attachLifeCycleHook(hook, node);
  }

  postRender(target: Node) {
    if (target instanceof DocumentFragment) {
      const children = Array.from(target.childNodes);
      return () => children.forEach(child => { this.postRender(child)(); });
    } else {
      return () => {
        if (this.document.contains(target)) {
          lifeCycleBind(target);
        }
  
        super.postRender(target)();
      }
    }
  }
}
