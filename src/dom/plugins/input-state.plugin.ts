import { Plugin, PropPlugin } from '../../renderer';
import { LiveDOMRenderer } from '../live-renderer';
import { getInputValue } from '../util';


export class InputStatePlugin 
  extends Plugin<Node, LiveDOMRenderer>
  implements PropPlugin<Node> {

  priority(): number {
    return Plugin.PriorityFallback;
  }

  setProp(node: Node, prop: string, target: any): boolean {
    if (prop === '_state'
      && (
        node instanceof HTMLInputElement
        || node instanceof HTMLTextAreaElement
        || node instanceof HTMLSelectElement
      )
      && typeof target === 'function'
    ) {
      if (node instanceof HTMLInputElement && node.type === 'radio' && node.name) {
        const renderer = this.renderer();
        renderer.hook(node, {
          bind() {
            (node.form || renderer.document)
            .querySelectorAll(`input[name="${node.name}"]`)
            .forEach(input => {
              if ((input as HTMLInputElement).form === node.form) {
                input.addEventListener('input', () => target(getInputValue(node)))
              }
            });
          }
        });
      } else {
        node.addEventListener('input', () => target(getInputValue(node)));
      }

      target(getInputValue(node));
      return true;
    }

    return false;
  }
}
