import { Plugin, PropPlugin } from '../../renderer';
import { setOptionObjectValue } from '../util';


export class OptionObjectValuePlugin
  extends Plugin<Node>
  implements PropPlugin<Node> {

  priority(): number {
    return Plugin.PriorityFallback;
  }

  setProp(node: Node, prop: string, target: any): boolean {
    if (prop === '_value' && node.nodeName === 'OPTION') {
      setOptionObjectValue(node as HTMLOptionElement, target);

      return true;
    }

    return false;
  }
}
