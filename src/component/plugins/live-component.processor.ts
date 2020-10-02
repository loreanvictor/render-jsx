import { ComponentPostProcessor, ComponentProvision } from '../types';
import { ComponentProcessor } from '../processor';
import { LifeCycleHook, LiveRendererLike } from '../../renderer';


export interface LiveComponentThis {
  onBind: (fn: () => void) => void;
  onClear: (fn: () => void) => void;
}


export class LiveComponentProcessor<Node> extends ComponentProcessor<Node, LiveRendererLike<Node>> {
  process(
    provide: (provision: ComponentProvision) => void,
    post: (processor: ComponentPostProcessor<Node>) => void,
  ): void {
    const renderer = this.renderer();
    const hooks: LifeCycleHook[] = [];

    provide(<LiveComponentThis>{
      onBind: (fn: () => void) => hooks.push({ bind: fn }),
      onClear: (fn: () => void) => hooks.push({ clear: fn }),
    });

    post(node => {
      hooks.forEach(hook => renderer.hook(node, hook));
    });
  }

  priority(): number {
    return ComponentProcessor.PriorityFallback;
  }
}
