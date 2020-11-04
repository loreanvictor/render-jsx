import { isRendererWithPlugins, Plugin, PropPlugin, RendererLike } from '../../renderer';


export interface SetStylePlugin<R extends RendererLike<Node>> extends Plugin<Node, R> {
  setStyle(node: HTMLElement, style: string, target: any, set: (value: string | object) => void): boolean;
}

function isSetStylePlugin<R extends RendererLike<Node>>(p: Plugin<Node, R>): p is SetStylePlugin<R> {
  return !!(p as any).setStyle && typeof (p as any).setStyle === 'function';
}

export class StylePlugin<R extends RendererLike<Node>>
  extends Plugin<Node, R>
  implements PropPlugin<Node> {

  private stylePlugins: SetStylePlugin<RendererLike<Node>>[] | undefined;

  plug(renderer: R) {
    super.plug(renderer);
    if (isRendererWithPlugins(renderer)) {
      this.stylePlugins = renderer.plugins.filter(isSetStylePlugin);
    }
  }

  priority(): number {
    return Plugin.PriorityFallback;
  }

  setProp(node: Node, prop: string, target: any): boolean {
    if (prop === 'style' && target?.constructor === Object) {
      Object.entries(target).forEach(([style, value]) => {
        if (this.stylePlugins &&
          this.stylePlugins.some(p =>
            isSetStylePlugin(p) &&
            p.setStyle(node as HTMLElement, style, value, s => this.setStyle(node as HTMLElement, style, s))
          )
        ) { return; }
        else {
          this.setStyle(node as HTMLElement, style, value as any);
        }
      });

      return true;
    }

    return false;
  }

  format(key: string, value: string) {
    const split = key.split('.');

    return {
      key: split[0],
      val: value,
      unit: split[1] || '',
    };
  }

  setStyle(node: HTMLElement, style: string, value: string | object) {
    if (style === 'transform' && typeof value === 'object') {
      node.style.transform = Object.entries(value)
        .map(e => this.format(...e))
        .map(({key, val, unit}) => `${key}(${val}${unit})`).join(' ');
    } else if (style === 'transition' && typeof value === 'object') {
      node.style.transition = Object.entries(value)
        .map(e => this.format(...e))
        .map(({key, val, unit}) => `${key} ${val}${unit}`).join(', ');
    } else {
      const { key, val, unit } = this.format(style, `${value}`);
      node.style[key as any] = `${val}${unit}`;
    }
  }
}
