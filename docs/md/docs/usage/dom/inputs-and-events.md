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

You can capture 

> :ToCPrevNext