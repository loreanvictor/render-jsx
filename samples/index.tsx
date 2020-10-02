import { HTMLRenderer } from '../src';


const renderer = new HTMLRenderer();

renderer.render(
  <>
    <form>
      <input type='radio' name='X' value='Hola'/><label>Hola</label>
      <input type='radio' name='X' value='Halo'/><label>Halo</label>
    </form>
    <input type='radio' name='X' value='Hola' _state={console.log}/><label>Hola</label>
    <input type='radio' name='X' value='Halo'/><label>Halo</label>
  </>
).on(document.body);

