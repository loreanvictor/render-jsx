import { CommonDOMRenderer } from '../src/dom';
import { ref } from '../src/common';
import { LiveComponentThis } from '../src/component';

const renderer = new CommonDOMRenderer();
function MyComp(this: LiveComponentThis, _: any) {
  const container = ref();

  this.onBind(() => console.log('Bound!'));
  this.onClear(() => console.log('Cleared!'));

  return <div _ref={container}>
    <button onclick={() => renderer.remove(container.$)}>Remove ME!</button>
  </div>;
}

const comp = <MyComp/>;
const btn = ref();

renderer.render(
  <button _ref={btn} onclick={() => {
    // tslint:disable-next-line: no-magic-numbers
    setTimeout(() => renderer.render(comp).on(document.body), 1000);
    renderer.remove(btn.$);
  }}>Add Comp</button>
).on(document.body);
