> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# DOM Inputs & Events

## Events

You can simply provide event handler functions to elements:

```tsx | --no-wmbar
import { CommonDOMRenderer } from 'render-jsx/dom';

const renderer = new CommonDOMRenderer();
renderer.render(
/*!*/  <button onclick={() => alert('Hi!')}>Say Hellow</button>
).on(document.body);
```
> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo7

Your handler function will also be provided with the event object:

```tsx | --no-wmbar
import { CommonDOMRenderer } from 'render-jsx/dom';
import { ref } from 'render-jsx/common';

const renderer = new CommonDOMRenderer();
const display = ref();

renderer.render(
  <div style={`
    height: 100vh; display: flex;
    justify-content: center;
    align-items: center;
  `}
/*!*/   onmousemove={e => {
/*!*/     display.$.textContent = `${e.clientX}, ${e.clientY}`
/*!*/   }}>
    <div _ref={display}/>
  </div>
).on(document.body);
```
> :Buttons 
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo8?file=index.tsx

---

## Inputs

You can capture input values using `_state` property:

```tsx | --no-wmbar
import { CommonDOMRenderer } from 'render-jsx/dom';
import { ref } from 'render-jsx/common';

const renderer = new CommonDOMRenderer();
let text = '';
const small = ref();

renderer.render(<div>
/*!*/  <input _state={t => text = small.$.textContent = t} type='text'/>
  <button onclick={() => alert(text)}>REPEAT!</button>
  <br/>
  <small _ref={small}/>
</div>).on(document.body);
```
> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo9?file=index.tsx

You can also use `_value` property on `<option>`s (in `<select>`) to attach
JavaScript values to each option, which is fetched via `_state` property on the
corresponding `<select>`:

```tsx | --no-wmbar
import { CommonDOMRenderer } from 'render-jsx/dom';
import { ref } from 'render-jsx/common';

const renderer = new CommonDOMRenderer();
const display = ref();

renderer.render(<div>
  <div _ref={display}/>
  <select _state={p => display.$.textContent = p.name}>
/*!*/    <option _value={{name: 'Eugene'}}>First Guy</option>
/*!*/    <option _value={{name: 'Tim'}}>Second Guy</option>
  </select>
</div>).on(document.body);
```
> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo10?file=index.tsx


> :ToCPrevNext