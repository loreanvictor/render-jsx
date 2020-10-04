export interface ComponentData {
  tag: any;
  props: { [prop: string]: any };
  children: any[];
}

export type ComponentPostProcessor<Node> = (node: Node) => void;
export type ComponentProvision = {[key: string]: any};
