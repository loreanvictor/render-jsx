import { ComponentPostProcessor, ComponentProcessor, ComponentProvision } from '../../component';
import { LifeCycleHook } from '../../renderer';
import { LiveDOMRenderer } from '../live-renderer';
import { attachLifeCycleHook, setLifeCycleMarker } from '../util';


export class LifeCylceComponentProcessor extends ComponentProcessor<Node, LiveDOMRenderer> {
  process(
    provide: (provision: ComponentProvision) => void,
    post: (processor: ComponentPostProcessor<Node>) => void,
  ): void {
    const hooks: LifeCycleHook[] = [];
    let marker: Node | undefined = undefined;

    provide({
      onBind: (fn: () => void) => hooks.push({ bind: fn }),
      onClear: (fn: () => void) => hooks.push({ clear: fn }),

      setLifeCycleMarker: (m: Node) => marker = m,
    });

    post(node => {
      if (node instanceof DocumentFragment && marker) {
        setLifeCycleMarker(node, marker);
      }

      hooks.forEach(hook => attachLifeCycleHook(hook, node));
    });
  }

  priority(): number {
    return ComponentProcessor.PriorityFallback;
  }
}
