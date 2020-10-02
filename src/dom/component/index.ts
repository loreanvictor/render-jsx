import { ComponentPlugin } from '../../component';
import { LiveDOMRenderer } from '../live-renderer';
import { LifeCylceComponentProcessor } from './lifecycle.component-processor';

export * from './lifecycle.component-processor';
export * from './types';


export function domComponentPlugins() {
  return [
    new ComponentPlugin<Node, LiveDOMRenderer>(new LifeCylceComponentProcessor())
  ];
}
