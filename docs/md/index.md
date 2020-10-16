> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="300px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="300px"/>

<br><br>

# Render-JSX

Tools and abstractions for building JSX-based libraries and frameworks,
and a super thin and super-fast JSX-based pure DOM renderer (no
layers between code and DOM, so no VirtualDOM, dirty model checking, etc.).

```bash
npm i render-jsx
```

```tsx | --no-wmbar
/** @jsx renderer.create */

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

---

## Quick Access

- [Overview](/docs/overview)
- [Installation](/docs/install)
- [Usage](/docs/usage/overview)
- [DOM Renderer](/docs/usage/dom/overview)
- [Custom Renderers](/docs/usage/custom-renderers/core-concepts)

> :ToCPrevNext
