import { CommonDOMRenderer } from '../src/dom';
import { ref } from '../src/common';
import { LiveDOMComponentThis } from '../src/dom';

const renderer = new CommonDOMRenderer();
function MyComp(this: LiveDOMComponentThis, _: any) {
  const b = ref();

  this.onBind(() => console.log('Bound!'));
  this.onClear(() => console.log('Cleared!'));
  this.setLifeCycleMarker(b);

  return <>
    <button _ref={b} onclick={() => renderer.remove(b.$)}>Remove ME!</button>
  </>;
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
