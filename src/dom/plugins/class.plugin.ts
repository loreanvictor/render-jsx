import { isRendererWithPlugins, Plugin, PropPlugin, RendererLike } from '../../renderer';


export interface AddClassPlugin<R extends RendererLike<Node>> extends Plugin<Node, R> {
  addClass(node: HTMLElement, target: any, _switch: (value: string) => void): boolean;
}

function isAddClassPlugin<R extends RendererLike<Node>>(p: Plugin<Node, R>):p is AddClassPlugin<R> {
  return !!(p as any).addClass && typeof (p as any).addClass === 'function';
}

export interface ToggleClassPlugin<R extends RendererLike<Node>> extends Plugin<Node, R> {
  addClassToggle(node: HTMLElement, className: string, target: any, toggle: (v: boolean) => void): boolean;
}

function isToggleClassPlugin<R extends RendererLike<Node>>(p: Plugin<Node, R>):p is ToggleClassPlugin<R> {
  return !!(p as any).addClassToggle && typeof (p as any).addClassToggle === 'function';
}

export class ClassPlugin<R extends RendererLike<Node>>
  extends Plugin<Node, R>
  implements PropPlugin<Node> {

  private addClassPlugins: AddClassPlugin<RendererLike<Node>>[] | undefined;
  private toggleClassPlugins: ToggleClassPlugin<RendererLike<Node>>[] | undefined;

  plug(renderer: R) {
    if (isRendererWithPlugins(renderer)) {
      this.addClassPlugins = renderer.plugins.filter(isAddClassPlugin);
      this.toggleClassPlugins = renderer.plugins.filter(isToggleClassPlugin);
    }
  }

  priority(): number {
    return Plugin.PriorityFallback;
  }

  setProp(node: Node, prop: string, target: any): boolean {
    if (prop === 'class') {
      if (Array.isArray(target)) {
        target.forEach(cl => {
          let prev = '';
          const sw = (_cl: string) => {
            if ((node as HTMLElement).classList.contains(prev)) {
              (node as HTMLElement).classList.remove(prev);
            }

            (node as HTMLElement).classList.add(prev = _cl);
          };

          if (this.addClassPlugins &&
              this.addClassPlugins.some(p => isAddClassPlugin(p) && p.addClass(node as HTMLElement, cl, sw))) {
            return;
          } else if (typeof cl === 'string') {
            (node as HTMLElement).classList.add(cl);
          } else {
            this.setToggleMap(cl, node as HTMLElement);
          }
        });

        return true;
      } else if (target?.constructor === Object) {
        this.setToggleMap(target, node as HTMLElement);

        return true;
      }
    }

    return false;
  }

  setToggleMap(map: {[cl: string]: any}, node: HTMLElement) {
    Object.entries(map).forEach(([cl, clt]) => {
      if (this.toggleClassPlugins &&
        this.toggleClassPlugins.some(p => isToggleClassPlugin(p) && p.addClassToggle(node, cl, clt, v => {
          if (v) { (node as HTMLElement).classList.add(cl); }
          else { (node as HTMLElement).classList.remove(cl); }
        }))) {
        return;
      } else if (!!clt) { (node as HTMLElement).classList.add(cl); }
      else { (node as HTMLElement).classList.remove(cl); }
    });
  }
}
