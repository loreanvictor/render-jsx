import { RendererLike } from '../../renderer';
import { ComponentData, ComponentProvision } from '../types';
import { ComponentPlugin } from './component.plugin';


export class FunctionalComponentPlugin<Node, Renderer extends RendererLike<Node>=RendererLike<Node>>
  extends ComponentPlugin<Node, Renderer> {

  createComponent(component: ComponentData, provision: ComponentProvision): Node {
    return component.tag.apply(provision, [component.props, this.renderer(), component.children]);
  }

  match(component: ComponentData): boolean {
    return typeof component.tag === 'function';
  }

  priority(): number {
    return ComponentPlugin.PriorityFallback;
  }
}
