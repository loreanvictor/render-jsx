import { Plugin } from './plugin';
import { RendererLike } from '../types';


export interface FragmentPlugin<Node, Renderer extends RendererLike<Node> = RendererLike<Node>> 
  extends Plugin<Node, Renderer> {
  fragment(): Node;
}

export function isFragmentPlugin<Node, Renderer extends RendererLike<Node>>(plugin: Plugin<Node, Renderer>)
: plugin is FragmentPlugin<Node, Renderer> {
  return (plugin as any).fragment && typeof (plugin as any).fragment === 'function';
}
