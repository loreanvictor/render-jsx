import { Plugin } from './plugin';
import { RendererLike } from '../types';


export interface CreatePlugin<Node, Renderer extends RendererLike<Node> = RendererLike<Node>> 
  extends Plugin<Node, Renderer> {
  create(tag: any, props?: {[prop: string]: any}, ...children: any[]): Node | undefined;
}

export function isCreatePlugin<Node, Renderer extends RendererLike<Node>>(plugin: Plugin<Node, Renderer>)
: plugin is CreatePlugin<Node, Renderer> {
  return !!(plugin as any).create && typeof (plugin as any).create === 'function';
}