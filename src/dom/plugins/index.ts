import { ClassPlugin } from './class.plugin';
import { EventHandlerPlugin } from './event-handler.plugin';
import { InputStatePlugin } from './input-state.plugin';
import { OptionObjectValuePlugin } from './object-value.plugin';
import { StylePlugin } from './style.plugin';


export * from './event-handler.plugin';
export * from './object-value.plugin';
export * from './input-state.plugin';
export * from './class.plugin';
export * from './style.plugin';


export function domPlugins() {
  return [
    () => new EventHandlerPlugin(),
    () => new OptionObjectValuePlugin(),
    () => new InputStatePlugin(),
    () => new ClassPlugin(),
    () => new StylePlugin(),
  ];
}
