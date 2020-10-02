import { Plugin, RendererLike } from '../renderer';
import { ComponentData, ComponentPostProcessor, ComponentProvision } from './types';


export abstract class ComponentProcessor<Node, Renderer extends RendererLike<Node>>
  extends Plugin<Node, Renderer> {
  abstract process(
    provide: (provision: ComponentProvision) => void,
    post: (processor: ComponentPostProcessor<Node>) => void,
    component: ComponentData,
  ): void;
}
