import { ref, RefPlugin } from '../src/common';
import { ComponentPlugin, LiveComponentProcessor, LiveComponentThis } from '../src/component';
import { EventHandlerPlugin, LiveDOMRenderer } from '../src/dom';

const renderer = new LiveDOMRenderer().plug(
  () => new RefPlugin(),
  () => new EventHandlerPlugin(),
  () => new ComponentPlugin<Node, LiveDOMRenderer>(),
  () => new LiveComponentProcessor(),
);


function MyComp(this: LiveComponentThis) {
  this.onBind(() => console.log('Bound!'));
  this.onClear(() => console.log('Cleared!'));

  const container = ref();

  return <div _ref={container} onclick={() => renderer.remove(container.$)}>Hellow!</div>;
}

renderer.render(<button onclick={() => renderer.render(<MyComp/>).on(document.body)}>Add</button>).on(document.body);
