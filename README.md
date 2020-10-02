<img src="/render-jsx-logo.svg" width="300"/>

# render-jsx

_JSX is NOT React, and its time to democratize it._

```bash
npm i render-jsx
```

[JSX](https://reactjs.org/docs/introducing-jsx.html) is an extension of JavaScript syntax, 
allowing for XML-style layout description within JavaScript. To use it, you need to tell your transpiler (babel / typescript)
what the JSX should mean. `render-jsx` provides tools and abstractions to make that process easy and standardized, so that you
can easily build JSX-based tools / libraries / frameworks based on it.

`render-jsx` also comes with a super-thin and fast _example_ DOM renderer. This means you can use it to create simple web interfaces
without any extra dependency (`render-jsx` itself is 2.7kB):

```tsx
import { HTMLRenderer } from 'render-jsx';

const renderer = new HTMLRenderer();
renderer.render(
  <div>
    <b>Hellow</b> World!
  </div>
).on(document.body);
```
► [TRY IT!](https://stackblitz.com/edit/render-jsx-demo)
<br>

## Usage

The main 
