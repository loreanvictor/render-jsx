export interface ToBeRenderered<Node> {
  target: Node;
  on(host: Node): void;
  after(host: Node): void;
  before(host: Node): void;
}


export interface RendererLike<Node> {
  append(target: Node | Node[], host: Node): void;
  setProp(node: Node, prop: string, target: any): void;
  setContent(node: Node, target: any): void;

  fragment(): Node;
  create(tag: any, props?: {[prop: string]: any}, ...children: any[]): Node;
  render(target: Node | ((renderer: RendererLike<Node>) => Node)): ToBeRenderered<Node>;
}


export interface LifeCycleHook {
  bind?(): void;
  clear?(): void;
}


export interface LiveRendererLike<Node> extends RendererLike<Node> {
  hook(node: Node, hook: LifeCycleHook): void;
}
