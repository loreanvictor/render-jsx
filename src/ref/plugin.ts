import { Plugin, PropPlugin  } from '../renderer';
import { Ref } from './ref';


export class RefPlugin<Node> 
  extends Plugin<Node>
  implements PropPlugin<Node> {

  setProp(node: Node, prop: string, target: any): boolean {
    if (prop === '_ref' && target instanceof Ref) {
      target.resolve(node);
      return true;
    }

    return false;
  }

  priority(): number {
    return Plugin.PriorityFallback;
  }
}
