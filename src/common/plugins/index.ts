import { ContentPropPlugin } from './content-prop.plugin';
import { RefPlugin } from './ref.plugin';


export * from './ref.plugin';
export * from './content-prop.plugin';


export function commonPlugins<Node>() {
  return [
    () => new RefPlugin<Node>(),
    () => new ContentPropPlugin<Node>(),
  ];
}
