import { HTMLBaseRenderer, ref, RefPlugin } from '../src';


const x = ref<Node>();
const renderer = new HTMLBaseRenderer(new RefPlugin<Node>());
renderer.render(
  <div _ref={x}>
    <>
      Hellow World!
    </>
    <br/>
    <>
      And some other stuff
    </>
  </div>
).on(document.body);

console.log(x.$);