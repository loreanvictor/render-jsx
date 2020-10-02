import { Plugin, PropPlugin  } from '../../renderer';


export class ContentPropPlugin<Node>
  extends Plugin<Node>
  implements PropPlugin<Node> {

  setProp(node: Node, prop: string, target: any): boolean {
    if (prop === '_content' && typeof target === 'string') {
      this.renderer().setContent(node, target);
      return true;
    }

    return false;
  }

  priority(): number {
    return Plugin.PriorityFallback;
  }
}
