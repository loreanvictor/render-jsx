import { CommonDOMRenderer } from '../src/dom';

const renderer = new CommonDOMRenderer();

renderer.render(<>
  <input _state={console.log} type='radio' name='X'/> AA <br/>
  <input type='radio' name='X'/> BB <br/>
</>).on(document.body);

