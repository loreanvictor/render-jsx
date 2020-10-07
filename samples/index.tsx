import { CommonDOMRenderer } from '../src/dom';
import { ref } from '../src/common';

const renderer = new CommonDOMRenderer();
let text = '';
const small = ref();

renderer.render(<div>
  <input _state={(t: any) => text = small.$.textContent = t} type='text'/>
  <button onclick={() => alert(text)}>REPEAT!</button>
  <br/>
  <small _ref={small}/>
</div>).on(document.body);
