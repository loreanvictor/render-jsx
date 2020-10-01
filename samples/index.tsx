import { HTMLBaseRenderer } from '../src';

const renderer = new HTMLBaseRenderer();
renderer.render(
  <div>
  <>
    Hellow World!
  </>
  <br/>
  <>
    And some other stuff
  </>
  </div>
).on(document.body);
