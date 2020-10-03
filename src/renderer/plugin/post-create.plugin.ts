import { Plugin } from './plugin';
import { RendererLike } from '../types';


export interface PostCreatePlugin<Node, Renderer extends RendererLike<Node> = RendererLike<Node>>
  extends Plugin<Node, Renderer> {
  postCreate(node: Node): void;
}

export function isPostCreatePlugin<Node, Renderer extends RendererLike<Node>>(plugin: Plugin<Node, Renderer>)
: plugin is PostCreatePlugin<Node, Renderer> {
  return !!(plugin as any).postCreate && typeof (plugin as any).postCreate === 'function';
}

