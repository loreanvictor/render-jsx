import { LiveRendererLike } from '../../renderer';
import { FunctionalComponentPlugin } from './func-comp.plugin';
import { LiveComponentProcessor } from './live-component.processor';

export * from './component.plugin';
export * from './func-comp.plugin';
export * from './live-component.processor';


export function componentPlugins<Node>() {
  return [
    () => new FunctionalComponentPlugin<Node>(),
    () => new LiveComponentProcessor<Node>(),
  ];
}
