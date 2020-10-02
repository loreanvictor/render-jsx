import { ComponentPlugin, LiveComponentProcessor } from '../../component';
import { LiveRendererLike } from '../../renderer';
import { FragmentLifeCycleMarkerComponentProcessor } from './fragment-lcmarker.processor';

export * from './fragment-lcmarker.processor';


export function liveDOMComponentPlugin() {
  return new ComponentPlugin<Node, LiveRendererLike<Node>>(
    new LiveComponentProcessor<Node>(),
    new FragmentLifeCycleMarkerComponentProcessor(),
  );
}
