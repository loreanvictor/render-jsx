import { RendererLike, ToBeRenderered } from './types';
import { Plugin, 
  isAppendPlugin, isPropPlugin, isContentPlugin, isFragmentPlugin, 
  isCreatePlugin, isPostCreatePlugin, isPostRenderPlugin
} from './plugin';


export abstract class Renderer<Node> implements RendererLike<Node> {
  readonly plugins: Plugin<Node, Renderer<Node>>[];

  constructor(...plugins: Plugin<Node, Renderer<Node>>[]) {
    this.plugins = plugins.sort((a, b) => b.priority() - a.priority());
    this.plugins.forEach(p => p.plug(this));
  }

  abstract fallbackAppend(target: any, host: Node): void;
  abstract fallbackSetProp(node: Node, prop: string, target: any): void;
  abstract fallbackSetContent(node: Node, target: any): void;
  abstract fallbackFragment(): Node;
  abstract fallbackCreate(tag: any, props?: {[prop: string]: any}, ...children: any[]): Node;

  abstract renderOn(target: Node, host: Node): void;
  abstract renderAfter(target: Node, ref: Node): void;
  abstract renderBefore(target: Node, ref: Node): void;

  append(target: any, host: Node): void {
    if (!this.plugins.filter(isAppendPlugin).some(p => p.append(target, host))) {
      this.fallbackAppend(target, host);
    }
  }

  setProp(node: Node, prop: string, target: any): void {
    if (!this.plugins.filter(isPropPlugin).some(p => p.setProp(node, prop, target))) {
      this.fallbackSetProp(node, prop, target);
    }
  }

  setContent(node: Node, target: any): void {
    if (!this.plugins.filter(isContentPlugin).some(p => p.setContent(node, target))) {
      this.fallbackSetContent(node, target);
    }
  }

  get fragment(): Node {
    const plugin = this.plugins.find(isFragmentPlugin);
    return plugin ? plugin.fragment() : this.fallbackFragment();
  }

  create(tag: any, props?: { [prop: string]: any; } | undefined, ...children: any[]): Node {
    let candidate: Node | undefined = undefined;

    for (const p of this.plugins.filter(isCreatePlugin)) {
      candidate = p.create(tag, props, children);
      if (candidate) {
        break;
      }
    }

    if (!candidate) {
      candidate = this.fallbackCreate(tag, props, children);
    }

    this.plugins.filter(isPostCreatePlugin).forEach(p => p.postCreate(candidate!!));
    return candidate;
  }

  render(target: Node | ((renderer: RendererLike<Node>) => Node)): ToBeRenderered<Node> {
    if (typeof target === 'function') {
      return this.render(target.apply(undefined, [this]));
    }

    const _this = this;
    const post = this.postRender(target);

    return {
      after(ref: Node) {
        _this.renderAfter(target, ref);
        post();
      },

      before(ref: Node) {
        _this.renderBefore(target, ref);
        post();
      },

      on(host: Node) {
        _this.renderOn(target, host);
        post();
      },

      target,
    };
  }

  postRender(target: Node) {
    return () => this.plugins.filter(isPostRenderPlugin).forEach(p => p.postRender(target));
  }
}
