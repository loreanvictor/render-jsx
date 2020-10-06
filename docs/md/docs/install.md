> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# Installation

## Prerequisites

**Render-JSX** is all about transpiling [JSX](https://facebook.github.io/jsx/), which needs to happen on the server-side
(before you ship transpiled JavaScript to the client-side, for example). This means you
need [Node.js](https://nodejs.org/en/) and some Node.js package manager (such as
[NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)).

---

## Installation

Setting up **Render-JSX** is pretty simple: you need to install the package `render-jsx` and then configure
your transpiler properly. Easiest way to do that is to use one of the following starter projects:

> :Buttons
> > :Button label=TypeScript Starter, url=https://github.com/loreanvictor/render-jsx-starter-ts
>
> > :Button label=JavaScript Starter, url=https://github.com/loreanvictor/render-jsx-starter-js

You can also just get the package via NPM, though this would mean you would need to configure
your transpiler as well (see [the following section](#configuration)).

```bash
npm i render-jsx
```
> :Buttons
> > :CopyButton

---

## Configuration

For configuration, you can include these pragmas at the beginning of your `.jsx`/`.tsx` files.
Most common transpilers understand these pragmas:

```tsx | --no-wmbar
/** @jsx renderer.create */
/** @jsxFrag renderer.fragment */
```
> :Buttons
> > :CopyButton

For project wide configuration, you need to configure your transpiler accordingly. Here
is how sample configuration for [TypeScript](https://www.typescriptlang.org)
and [Babel](https://babeljs.io)
(with [`@babel/plugin-transform-react-jsx`](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx))
look like:

> :Tabs
> > :Tab title=TypeScript
> > ```json | tsconfig.json
> > {
> >  "compilerOptions": {
> >/*!*/    "jsx": "react",
> >/*!*/    "jsxFactory": "renderer.create",
> >/*!*/    "jsxFragmentFactory": "renderer.fragment",
> >    "target": "es6",
> >    "declaration": false,
> >    "sourceMap": true,
> >    "moduleResolution": "node",
> >    "esModuleInterop": true,
> >    "allowSyntheticDefaultImports": true,
> >    "lib": [
> >      "es2017",
> >      "dom"
> >    ]
> >  },
> >  "include": [
> >    "./src/**/*",
> >  ]
> >}
> >```
>
> > :Tab title=Babel
> > ```json | .babelrc
> > {
> >   "plugins": [
> >/*!*/     ["@babel/plugin-transform-react-jsx", {
> >/*!*/       "pragma": "renderer.create",
> >/*!*/       "pargmaFrag": "renderer.fragment"
> >/*!*/     }]
> >   ]
> > }
> > ```

> :ToCPrevNext