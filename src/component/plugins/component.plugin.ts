import { CreatePlugin, isRendererWithPlugins, Plugin, RendererLike } from '../../renderer';
import { ComponentProcessor } from '../processor';
import { ComponentData, ComponentPostProcessor, ComponentProvision } from '../types';


export abstract class ComponentPlugin<Node, Renderer extends RendererLike<Node>>
  extends Plugin<Node, Renderer>
  implements CreatePlugin<Node, Renderer> {

  processors: ComponentProcessor<Node, Renderer>[];

  constructor(...processors: ComponentProcessor<Node, Renderer>[]) {
    super();
    this.processors = processors;
  }

  plug(renderer: Renderer) {
    super.plug(renderer);
    this.processors.forEach(p => p.plug(this.renderer()));

    if (isRendererWithPlugins(renderer)) {
      renderer.plugins.forEach(p => {
        if (p instanceof ComponentProcessor) {
          this.processors.push(p);
        }
      });
    }

    this.processors = this.processors.sort((a, b) => a.priority() - b.priority());
  }

  create(tag: any, props?: { [prop: string]: any; }, ...children: any[]): Node | undefined {
    const data = { tag, props: props || {}, children };

    if (this.match(data)) {
      let provision: ComponentProvision = {};
      const post: ComponentPostProcessor<Node>[] = [];

      this.processors.forEach(p => p.process(
        _provision => provision = { ...provision, ..._provision },
        _post => post.push(_post),
        data
      ));

      const $ = this.createComponent(data, provision);
      post.reverse().forEach(p => p($));

      return $;
    } else {
      return undefined;
    }
  }

  abstract createComponent(component: ComponentData, provision: ComponentProvision): Node;
  abstract match(component: ComponentData): boolean;
}
