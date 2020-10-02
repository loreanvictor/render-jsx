import { HTMLRenderer, LiveDOMComponentThis, ref } from '../src';


function Radios(this: LiveDOMComponentThis, _: {}, renderer: HTMLRenderer) {
  this.onBind(() => {
    console.log('HALO!');
  });

  const l = ref();
  this.setLifeCycleMarker(l);

  return <>
    <input type='radio' name='X' value='Hola' _state={console.log}/><label>Hola</label>
    <input type='radio' name='X' value='Halo'/><label _ref={l}>Halo</label>
  </>;
}

const renderer = new HTMLRenderer();

renderer.render(
  <form>
    <Radios/>
  </form>
).on(document.body);

