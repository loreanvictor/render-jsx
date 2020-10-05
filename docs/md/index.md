> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="300px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="300px"/>

<br><br>

Tools and abstractions for building JSX-based libraries and frameworks,
and a super thin (~2.7kB) and super-fast JSX-based pure DOM renderer (no
layers between code and DOM, so no VirtualDOM, dirty model checking, etc.).

```bash
npm i render-jsx
```

```tsx | --no-wmbar
import { HTMLRenderer } from 'render-jsx';

const renderer = new HTMLRenderer();
renderer.render(
  <div>
    <b>Hellow</b> World!
  </div>
).on(document.body);
```
> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo

> :ToCPrevNext