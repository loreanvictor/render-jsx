> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# DOM Renderer

**Render-JSX** provides `CommonDOMRenderer` class for rendering DOM elements in the browser:

```tsx | --no-wmbar
import { CommonDOMRenderer } from 'render-jsx/dom';

const renderer = new CommonDOMRenderer();
renderer.render(
  <div>
    <b>Hellow</b> World!
  </div>
).on(document.body);
```
> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo

`CommonDOMRenderer` creates DOM elements and renders them directly to the document (or wherever you target them)
without any layers in-between, making it as fast as browser's own DOM APIs.

> [info](:Icon (align=-6px)) **IMPORTANT**
>
> Even when you are not using `.render()` function, you need a renderer object (named `renderer`)
> in the context for creation of DOM elements.
>
> So this is incorrect:
> ```tsx | --no-wmbar
> function f() {
>   return /*~*/<div><b>Hellow</b> World!</div>/*~*/
> }
> ```
>
> And this is the correct version:
>
> ```tsx | --no-wmbar
> function f(renderer) {
>   return <div><b>Hellow</b> World!</div>
> }
> ```
> ```tsx | --no-wmbar
> const renderer = new CommonDOMRenderer();
> renderer.render(f(renderer)).on(document.body);
> ```

---

## Variables and Expressions

You can render variables and expressions inside your elements using `{}` syntax:

```tsx | --no-wmbar
const target = 'World';
renderer.render(
/*!*/  <div>Hellow {target}!</div>
).on(document.body);
```

---

## Properties

You can set properties (attributes) of elements to strings or custom expressions / variables:

```tsx | --no-wmbar
const placeholder = 'enter something';

renderer.render(
  <div class='ladida'>
    <input type='text' placeholder={placeholder}/>
  </div>
)
```

---

## Inner HTML

You can set inner html of an element using `_content` property:

```tsx | --no-wmbar
import { CommonDOMRenderer } from 'render-jsx/dom';
import marked from 'marked';

const renderer = new CommonDOMRenderer();
const markdown = marked('**Hellow** World!');

renderer.render(
/*!*/  <div _content={markdown}/>
).on(document.body);
```
> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo6?file=index.tsx

> :ToCPrevNext