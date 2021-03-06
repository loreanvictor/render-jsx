import { Ref } from '../../common';
import { ComponentPostProcessor, ComponentProcessor, ComponentProvision, LiveComponentThis } from '../../component';
import { LiveDOMRenderer } from '../live-renderer';
import { setLifeCycleMarker } from '../util';


export interface LiveDOMComponentThis extends LiveComponentThis {
  setLifeCycleMarker: (node: Node | Ref<Node>) => void;
}


export class FragmentLifeCycleMarkerComponentProcessor
  extends ComponentProcessor<Node, LiveDOMRenderer> {

  process(
    provide: (provision: ComponentProvision) => void,
    post: (processor: ComponentPostProcessor<Node>) => void
  ): void {
    let marker: Node | Ref<Node> | undefined = undefined;

    provide({
      setLifeCycleMarker: (node: Node | Ref<Node>) => marker = node
    });

    post(node => {
      if (node.nodeType === node.DOCUMENT_FRAGMENT_NODE && marker) {
        if (marker instanceof Ref) {
          setLifeCycleMarker(node as DocumentFragment, marker.$);
        } else {
          setLifeCycleMarker(node as DocumentFragment, marker);
        }
      }
    });
  }

  priority(): number {
    return ComponentProcessor.PriorityFallback +
      (ComponentProcessor.PriorityMax - ComponentProcessor.PriorityFallback) / 100;
  }
}
