<img src="/render-jsx-logo.svg" width="300"/>

# Render-JSX
[![NPM Version](https://badgen.net/npm/v/render-jsx?cache=600)](https://www.npmjs.com/package/render-jsx)
[![Build Status](https://travis-ci.org/loreanvictor/render-jsx.svg?branch=master)](https://travis-ci.org/loreanvictor/render-jsx)
[![Code Coverage](https://app.codacy.com/project/badge/Coverage/32af4af651f345fca094a0d1ea2084fe)](https://www.codacy.com/gh/loreanvictor/render-jsx/dashboard?utm_source=github.com&utm_medium=referral&utm_content=loreanvictor/render-jsx&utm_campaign=Badge_Coverage)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/render-jsx?cache=300)](https://bundlephobia.com/result?p=render-jsx@latest)
[![Codacy Quality](https://app.codacy.com/project/badge/Grade/32af4af651f345fca094a0d1ea2084fe)](https://www.codacy.com/gh/loreanvictor/render-jsx/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=loreanvictor/render-jsx&amp;utm_campaign=Badge_Grade)

Tools for building JSX-based libraries / frameworks, also a super-thin and fast pure DOM renderer.

```bash
npm i render-jsx
```

```tsx
/** @jsx renderer.create */

import { CommonDOMRenderer } from 'render-jsx/dom';

const renderer = new CommonDOMRenderer();
renderer.render(
  <div>
    <b>Hellow</b> World!
  </div>
).on(document.body);
```
[► TRY IT!](https://stackblitz.com/edit/render-jsx-demo)

👉 [Read the Docs](https://loreanvictor.github.io/render-jsx/)

<br><br>

# Overview

[JSX](https://facebook.github.io/jsx/) is an syntax extension of JavaScript, 
allowing for XML-style representations within JavaScript. JSX needs to be transpiled (since it is an extension),
with transpilers such as [TypeScript](https://www.typescriptlang.org) or [Babel](https://babeljs.io).
Transpilers in turn need to know what JSX should mean.

**Render-JSX** provides abstraction for specifying that _meaning_ in a highly extensible way, allowing re-use
of components and common JSX patterns across different domains.
For example, you can re-use your components (or your custom class-based component system) while rendering to DOM (client-side),
to HTML string (server side), to native UI libraries, to custom input format of a PDF generator, etc.

**Render-JSX** also comes with a super-thin and fast DOM renderer (which is mostly meant as a basis of more involved UI renderers). 
This means you can use it to create simple web interfaces without any extra dependency (< 1kB).

👉 [Read the Docs](https://loreanvictor.github.io/render-jsx/docs/overview)

```
    ╭────────────────────╮     ╭────────────────────╮         
    │                    │     │                    │         
    │        App         │────▶│     Components     │╶╶╶╶╶╶╶╶╮
    │                    │╶╮   │                    │        ╷
    ╰────────────────────╯ ╷   ╰────────────────────╯        ╷
                │          ╷              │                  ╷
                ╰────╮     ╰╶╶╶╶╶╶╶╶╶╶╶╶╶ │ ╶╶╶╶╶╶╶╶╶╶╶╶╶╶╮  ╷
                     │                    │               ╷  ╷
      ╭────────────╮ ▼                    ▼               ╷  ╷
    ╭─│  Renderer  │────────────────────────────────╮     ╷  ╷
    │ ╰────────────╯                                │     ╷  ╷
    │      ╭─────────────────────────────────╮      │     ╷  ╷
    │      │                                 │      │     ╷  ╷
    │      │             Plugins             │╶╶╶╶╶╶╶╶╶╮  ╷  ╷
    │      │                                 │      │  ╷  ╷  ╷
    │      ╰─────────────────────────────────╯      │  ╷  ╷  ╷
    │                       │                       │  ╷  ╷  ╷
    │                       ▼                       │  ╷  ╷  ╷
    │      ╭─────────────────────────────────╮      │  ╷  ╷  ╷
    │      │                                 │      │  ╷  ╷  ╷
    │      │          Base Renderer          │      │  ╷  ╷  ╷
    │      │                                 │      │  ╷  ╷  ╷
    │      ╰─────────────────────────────────╯      │  ╷  ╷  ╷
    │                       │                       │  ╷  ╷  ╷
    ╰────────────────────── │ ──────────────────────╯  ╷  ╷  ╷
                            │                          ╷  ╷  ╷
                            ▼                          ▽  ▽  ▽
╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮
│  ╰──╯  ╰──╯  ╰──╯  ╰──╯  ╰──╯  ╰──╯  ╰──╯  ╰──╯  ╰──╯  ╰──╯  │
│                                                              │
│                    Environment / Context                     │
│                                                              │
```

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

<br><br>

# Contribution

There are no contribution guidelines or issue templates currently, so just be nice (and also note that this is REALLY early stage).
Useful commands for development / testing:
```bash
git clone https://github.com/loreanvictor/render-jsx.git
```
```bash
npm i                   # --> install dependencies
```
```bash
npm start               # --> run `samples/index.tsx` on `localhost:3000`
```
```bash
npm test                # --> run all tests
```
```bash
npm run cov:view        # --> run tests and display the code coverage report
```
```bash
npm i -g @codedoc/cli   # --> install CODEDOC cli (for working on docs)
```
```bash
codedoc install         # --> install CODEDOC dependencies (for working on docs)
```
```bash
codedoc serve           # --> serve docs on `localhost:3000/render-jsx` (from `docs/md/`)
```
