import { Plugin } from './plugin';
import { RendererLike } from '../types';


export interface PropPlugin<Node, Renderer extends RendererLike<Node> = RendererLike<Node>>
  extends Plugin<Node, Renderer> {
  setProp(node: Node, prop: string, target: any): boolean;
}

export function isPropPlugin<Node, Renderer extends RendererLike<Node>>(plugin: Plugin<Node, Renderer>)
: plugin is PropPlugin<Node, Renderer> {
  return !!(plugin as any).setProp && typeof (plugin as any).setProp === 'function';
}
