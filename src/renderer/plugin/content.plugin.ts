import { Plugin } from './plugin';
import { RendererLike } from '../types';


export interface ContentPlugin<Node, Renderer extends RendererLike<Node> = RendererLike<Node>>
  extends Plugin<Node, Renderer> {
  setContent(node: Node, target: any): boolean;
}

export function isContentPlugin<Node, Renderer extends RendererLike<Node>>(plugin: Plugin<Node, Renderer>) 
: plugin is ContentPlugin<Node, Renderer> {
  return (plugin as any).setContent && typeof (plugin as any).setContent === 'function';
}

