import { ref } from '../../ref';
import { RendererLike } from '../types';


export abstract class Plugin<Node, Renderer extends RendererLike<Node> = RendererLike<Node>> {
  public static PriorityMax = 1;
  public static PriorityFallback = 0;

  private _renderer = ref<Renderer>();

  plug(renderer: Renderer) {
    this._renderer.resolve(renderer);
  }

  renderer() {
    return this._renderer.$;
  }

  abstract priority(): number;
}
