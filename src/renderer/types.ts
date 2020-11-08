export interface ToBeRenderered<Node> {
  target: Node;
  on(host: Node): void;
  after(host: Node): void;
  before(host: Node): void;
}


export interface RendererLike<Node> {
  append(target: any | any[], host: Node): void;
  setProp(node: Node, prop: string, target: any): void;
  setContent(node: Node, target: any): void;

  fragment: Node;
  leaf(): Node;
  create(tag: any, props?: {[prop: string]: any}, ...children: any[]): Node;
  render(target: Node | ((renderer: RendererLike<Node>) => Node)): ToBeRenderered<Node>;
  remove(target: Node, temporary?: boolean): void;
}


export interface LifeCycleHook {
  bind?(): void;
  clear?(): void;
}


export interface LiveRendererLike<Node> extends RendererLike<Node> {
  hook(node: Node, hook: LifeCycleHook): void;
}
