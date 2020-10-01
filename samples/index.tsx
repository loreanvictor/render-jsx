import { LiveDOMRenderer } from '../src';


const renderer = new LiveDOMRenderer();
const x = <div>Hellow</div>;

renderer.hook(x, {
  bind() {
    console.log('BOUND!');
  },
  clear() {
    console.log('CLEARED!');
  }
});

renderer.render(<>{x}</>).on(document.body);

setTimeout(() => x.remove(), 10000);
