<img src="/render-jsx-logo.svg" width="300"/>

# `render-jsx`

Tools for building JSX-based libraries / frameworks, also a super-thin and fast pure DOM renderer.

```bash
npm i render-jsx
```

```tsx
import { HTMLRenderer } from 'render-jsx';

const renderer = new HTMLRenderer();
renderer.render(
  <div>
    <b>Hellow</b> World!
  </div>
).on(document.body);
```
[► TRY IT!](https://stackblitz.com/edit/render-jsx-demo)

👉 [Read the Docs](https://loreanvictor.github.io/render-jsx/).

<br><br>

# Overview

[JSX](https://facebook.github.io/jsx/) is an syntax extension of JavaScript, 
allowing for XML-style representations within JavaScript. JSX needs to be transpiled (since it is an extension),
with transpilers such as [TypeScript](https://www.typescriptlang.org) or [Babel](https://babeljs.io).
Transpilers in turn need to know what JSX should mean.

`render-jsx` provides abstraction for specifying that _meaning_ in a highly extensible way, allowing re-use
of components and common JSX patterns across different domains.
For example, you can re-use your components or your custom class-based component system while rendering to DOM (client-side),
to HTML string (server side), to native UI libraries, to custom input format of a PDF generator, etc.

`render-jsx` also comes with a super-thin and fast DOM renderer (which is mostly meant as a basis of more involved UI renderers). 
This means you can use it to create simple web interfaces without any extra dependency (`render-jsx` itself is 2.7kB).

👉 [Read the Docs](https://loreanvictor.github.io/render-jsx/docs/overview)

<br><br>

# Installation

Use starter templates:
- [JavaScript Starter Template](https://github.com/loreanvictor/render-jsx-starter-js)
- [TypeScript Starter Template](https://github.com/loreanvictor/render-jsx-starter-ts)

Or get the package:
```
npm i render-jsx
```
And use the following pragmas in your `.jsx`/`.tsx` files:
```
/** @jsx renderer.create */
/** @jsxFrag renderer.fragment */
```
👉 [Read the Docs](https://loreanvictor.github.io/render-jsx/docs/install)

