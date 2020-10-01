import { Plugin } from './plugin';
import { RendererLike } from '../types';


export interface PostRenderPlugin<Node, Renderer extends RendererLike<Node> = RendererLike<Node>>
  extends Plugin<Node, Renderer> {
  postRender(node: Node): void;
}

export function isPostRenderPlugin<Node, Renderer extends RendererLike<Node>>(plugin: Plugin<Node, Renderer>) 
: plugin is PostRenderPlugin<Node, Renderer> {
  return (plugin as any).postRender && typeof (plugin as any).postRender === 'function';
}
