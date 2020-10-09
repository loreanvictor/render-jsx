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
        node.nodeName === 'INPUT'
        || node.nodeName === 'TEXTAREA'
        || node.nodeName === 'SELECT'
      )
      && typeof target === 'function'
    ) {
      const renderer = this.renderer();
      if (node.nodeName === 'INPUT' && (node as HTMLInputElement).type === 'radio' && (node as HTMLInputElement).name) {
        const i = node as HTMLInputElement;
        renderer.hook(node, {
          bind() {
            // TODO: write in a more performant manner.
            // TODO: this will not pick up input from radio buttons added later, fix that maybe?
            (i.form || renderer.document)
            .querySelectorAll(`input[name="${i.name}"]`)
            .forEach(input => {
              if ((input as HTMLInputElement).form === i.form) {
                input.addEventListener('input', () => target(getInputValue(i)));
              }
            });

            target(getInputValue(i));
          }
        });
      } else {
        node.addEventListener('input', () => target(getInputValue(node as any)));
        renderer.hook(node, {
          bind() {
            target(getInputValue(node as any));
          }
        });
      }

      return true;
    }

    return false;
  }
}
