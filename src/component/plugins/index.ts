import { LiveRendererLike } from '../../renderer';
import { ComponentPlugin } from './component.plugin';
import { LiveComponentProcessor } from './live-component.processor';

export * from './component.plugin';
export * from './live-component.processor';


export function componentPlugin<Node>() {
  return new ComponentPlugin<Node, LiveRendererLike<Node>>(
    new LiveComponentProcessor<Node>()
  );
}
