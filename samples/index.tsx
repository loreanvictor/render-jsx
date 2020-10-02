import { HTMLRenderer, ref } from '../src';


const renderer = new HTMLRenderer();
const x = ref<HTMLSelectElement>();

renderer.render(
  <select multiple={true} _ref={x} oninput={() => {
    console.log(Array.from(x.$.selectedOptions).map(_ => _.label));
  }}>
    <option value='A'>AA</option>
    <option value='B'>BB</option>
    <option value='C'>CC</option>
  </select>
).on(document.body);

