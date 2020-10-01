import { Plugin } from './plugin';
import { RendererLike } from '../types';


export interface AppendPlugin<Node, Renderer extends RendererLike<Node> = RendererLike<Node>> 
  extends Plugin<Node, Renderer> {
  append(target: any, host: Node): boolean;
}

export function isAppendPlugin<Node, Renderer extends RendererLike<Node>>(plugin: Plugin<Node, Renderer>)
: plugin is AppendPlugin<Node, Renderer> {
  return (plugin as any).append && typeof (plugin as any).append === 'function';
}
