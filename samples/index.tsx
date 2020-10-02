import { HTMLRenderer, LiveDOMComponentThis } from '../src';


function Radios(this: LiveDOMComponentThis, _: {}, renderer: HTMLRenderer) {
  this.onBind(() => {
    console.log('HALO!');
  });

  return <>
    <input type='radio' name='X' value='Hola' _state={console.log}/><label>Hola</label>
    <input type='radio' name='X' value='Halo'/><label>Halo</label>
  </>;
}

const renderer = new HTMLRenderer();

renderer.render(
  <>
    <form>
      <Radios/>
    </form>
    <Radios/>
  </>
).on(document.body);

