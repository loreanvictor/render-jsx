import { Plugin } from './plugin';
import { RendererLike } from '../types';


export interface LeafPlugin<Node, Renderer extends RendererLike<Node> = RendererLike<Node>>
  extends Plugin<Node, Renderer> {
  leaf(): Node;
}

export function isLeafPlugin<Node, Renderer extends RendererLike<Node>>(plugin: Plugin<Node, Renderer>)
: plugin is LeafPlugin<Node, Renderer> {
  return !!(plugin as any).leaf && typeof (plugin as any).leaf === 'function';
}
