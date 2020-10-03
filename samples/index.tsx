import { HTMLRenderer, ref } from '../src';

const renderer = new HTMLRenderer();
const list = ref();
const input = ref<HTMLInputElement>();

function Todo({title}: {title: string}) {
  const li = ref<HTMLElement>();
  return <li _ref={li}>
    <div style='display: flex'>
      <div style='flex-grow: 1'>{title}</div>
      <button onclick={() => li.$.remove()}>X</button>
    </div>
  </li>
}

renderer.render(
  <div>
    <h1>Todos:</h1>
    <ol _ref={list}/>
    <div style='display: flex'>
      <input type='text' _ref={input} style='flex-grow: 1'/>
      <button onclick={() => {
        renderer.render(<Todo title={input.$.value}/>).on(list.$);
        input.$.value = '';
      }}>Add</button>
    </div>
  </div>
).on(document.body);