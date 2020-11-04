import { RendererLike, ToBeRenderered } from './types';
import { Plugin, PluginFactory,
  isAppendPlugin, isPropPlugin, isContentPlugin, isFragmentPlugin,
  isCreatePlugin, isPostCreatePlugin, isPostRenderPlugin, isLeafPlugin,
  RendererWithPlugins, AppendPlugin, CreatePlugin, PropPlugin,
  ContentPlugin, FragmentPlugin, LeafPlugin, PostCreatePlugin, PostRenderPlugin
} from './plugin';


export abstract class Renderer<Node, R extends Renderer<Node, R>> implements RendererWithPlugins<Node> {
  readonly _factories: PluginFactory<Node, RendererLike<Node>>[];
  private _plugins: Plugin<Node, RendererLike<Node>>[];
  private readonly _appendPlugins: AppendPlugin<Node, RendererLike<Node>>[] = [];
  private readonly _createPlugins: CreatePlugin<Node, RendererLike<Node>>[] = [];
  private readonly _propPlugins: PropPlugin<Node, RendererLike<Node>>[] = [];
  private readonly _contentPlugins: ContentPlugin<Node, RendererLike<Node>>[] = [];
  private readonly _postCreatePlugins: PostCreatePlugin<Node, RendererLike<Node>>[] = [];
  private readonly _postRenderPlugins: PostRenderPlugin<Node, RendererLike<Node>>[] = [];
  private _fragmentPlugin: FragmentPlugin<Node, RendererLike<Node>> | undefined;
  private _leafPlugin: LeafPlugin<Node, RendererLike<Node>> | undefined;

  constructor(...plugins: PluginFactory<Node, RendererLike<Node>>[]) {
    this._factories = plugins;
  }

  _buildPlugins() {
    if (!this._plugins) {
      this._plugins = this._factories.map(f => f()).sort((a, b) => b.priority() - a.priority());
      this._plugins.forEach(p => {
        p.plug(this);
        if (isAppendPlugin(p)) { this._appendPlugins.push(p); }
        if (isContentPlugin(p)) { this._contentPlugins.push(p); }
        if (isPropPlugin(p)) { this._propPlugins.push(p); }
        if (isCreatePlugin(p)) { this._createPlugins.push(p); }
        if (isPostCreatePlugin(p)) { this._postCreatePlugins.push(p); }
        if (isPostRenderPlugin(p)) { this._postRenderPlugins.push(p); }
        if (isLeafPlugin(p) && !this._leafPlugin) { this._leafPlugin = p; }
        if (isFragmentPlugin(p) && !this._fragmentPlugin) { this._fragmentPlugin = p; }
      });
    }

    return this;
  }

  get plugins() { return this._buildPlugins() && this._plugins; }
  get appendPlugins() { return this._buildPlugins() && this._appendPlugins; }
  get contentPlugins() { return this._buildPlugins() && this._contentPlugins; }
  get propPlugins() { return this._buildPlugins() && this._propPlugins; }
  get createPlugins() { return this._buildPlugins() && this._createPlugins; }
  get postCreatePlugins() { return this._buildPlugins() && this._postCreatePlugins; }
  get postRenderPlugins() { return this._buildPlugins() && this._postRenderPlugins; }
  get leafPlugin() { return this._buildPlugins() && this._leafPlugin; }
  get fragmentPlugin() { return this._buildPlugins() && this._fragmentPlugin; }

  plug(...plugins: PluginFactory<Node, RendererLike<Node>>[]) {
    return this.clone(...this._factories, ...plugins);
  }

  abstract fallbackAppend(target: any, host: Node): void;
  abstract fallbackSetProp(node: Node, prop: string, target: any): void;
  abstract fallbackSetContent(node: Node, target: any): void;
  abstract fallbackFragment(): Node;
  abstract fallbackLeaf(): Node;
  abstract fallbackCreate(tag: any, props?: {[prop: string]: any}): Node;

  abstract renderOn(target: Node, host: Node): void;
  abstract renderAfter(target: Node, ref: Node): void;
  abstract renderBefore(target: Node, ref: Node): void;
  abstract remove(target: Node): void;

  abstract clone(...plugins: PluginFactory<Node, RendererLike<Node>>[]): R;

  append(target: any, host: Node): void {
    if (!this.appendPlugins.some(p => p.append(target, host))) {
      this.fallbackAppend(target, host);
    }
  }

  setProp(node: Node, prop: string, target: any): void {
    if (!this.propPlugins.some(p => p.setProp(node, prop, target))) {
      this.fallbackSetProp(node, prop, target);
    }
  }

  setContent(node: Node, target: any): void {
    if (!this.contentPlugins.some(p => p.setContent(node, target))) {
      this.fallbackSetContent(node, target);
    }
  }

  get fragment(): Node {
    const plugin = this.fragmentPlugin;

    return plugin ? plugin.fragment() : this.fallbackFragment();
  }

  leaf(): Node {
    const plugin = this.leafPlugin;

    return plugin ? plugin.leaf() : this.fallbackLeaf();
  }

  create(tag: any, props?: { [prop: string]: any; } | undefined, ...children: any[]): Node {
    let candidate: Node | undefined = undefined;

    for (const p of this.createPlugins) {
      candidate = p.create(tag, props, ...children);
      if (candidate) {
        break;
      }
    }

    if (!candidate) {
      candidate = this.fallbackCreate(tag, props);
      if (props) {
        Object.entries(props).forEach(([prop, target]) => this.setProp(candidate!!, prop, target));
      }

      children.forEach(child => this.append(child, candidate!!));
    }

    this.postCreatePlugins.forEach(p => p.postCreate(candidate!!));

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
    return () => this.postRenderPlugins.forEach(p => p.postRender(target));
  }
}
