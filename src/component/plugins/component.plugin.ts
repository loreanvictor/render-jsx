import { CreatePlugin, Plugin, RendererLike } from '../../renderer';
import { ComponentProcessor } from '../processor';
import { ComponentPostProcessor, ComponentProvision } from '../types';


export class ComponentPlugin<Node, Renderer extends RendererLike<Node>>
  extends Plugin<Node, Renderer>
  implements CreatePlugin<Node, Renderer> {

  readonly processors: ComponentProcessor<Node, Renderer>[];

  constructor(...processors: ComponentProcessor<Node, Renderer>[]) {
    super();
    this.processors = processors.sort((a, b) => b.priority() - a.priority());
  }

  plug(renderer: Renderer) {
    super.plug(renderer);
    this.processors.forEach(p => p.plug(this.renderer()));
  }

  create(tag: any, props?: { [prop: string]: any; }, ...children: any[]): Node | undefined {
    if (typeof tag === 'function') {
      let provision: ComponentProvision = {};
      const post: ComponentPostProcessor<Node>[] = [];

      this.processors.forEach(p => p.process(
        _provision => provision = { ...provision, ..._provision },
        _post => post.push(_post),
        {
          tag,
          props: props || {},
          children,
        }
      ));

      const $ = tag.apply(provision, [props, this.renderer(), children]);

      post.forEach(p => p($));
      return $;
    } else {
      return undefined;
    }
  }

  priority(): number {
    return Plugin.PriorityFallback;
  }
}
