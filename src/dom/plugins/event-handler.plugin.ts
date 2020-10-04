import { Plugin, PropPlugin } from '../../renderer';


export class EventHandlerPlugin
  extends Plugin<Node>
  implements PropPlugin<Node> {

  priority(): number {
    return Plugin.PriorityFallback;
  }

  setProp(node: Node, prop: string, target: any): boolean {
    if (prop.startsWith('on') && typeof target === 'function') {
      const event = prop.substr(2).toLowerCase();
      node.addEventListener(event, target as EventListener);

      return true;
    }

    return false;
  }
}
