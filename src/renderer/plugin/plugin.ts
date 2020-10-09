import { isArray } from 'util';
import { ref } from '../../common/ref';
import { RendererLike } from '../types';


export abstract class Plugin<Node, Renderer extends RendererLike<Node> = RendererLike<Node>> {
  public static PriorityMax = 1;
  public static PriorityFallback = 0;

  private readonly _renderer = ref<Renderer>();

  plug(renderer: Renderer) {
    this._renderer.resolve(renderer);
  }

  renderer() {
    return this._renderer.$;
  }

  abstract priority(): number;
}


export type PluginFactory<Node, Renderer extends RendererLike<Node> = RendererLike<Node>>
   = () => Plugin<Node, Renderer>;


export interface RendererWithPlugins<Node> extends RendererLike<Node> {
  plugins: Plugin<Node, RendererLike<Node>>[];
}

export function isRendererWithPlugins<Node>(renderer: RendererLike<Node>):
  renderer is RendererWithPlugins<Node> {
  return !!(renderer as any).plugins && Array.isArray((renderer as any).plugins);
}
