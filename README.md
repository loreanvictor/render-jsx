<img src="/render-jsx-logo.svg" width="300"/>

# render-jsx

```bash
npm i render-jsx
```

_JSX is NOT React, and its time to democratize it._

[JSX](https://reactjs.org/docs/introducing-jsx.html) is an extension of JavaScript syntax, 
allowing for XML-style layout description within JavaScript. To use it, you need to tell your transpiler (babel / typescript)
what the JSX should mean. `render-jsx` provides tools and abstractions to make that process easy and standardized, so that you
can easily build JSX-based tools / libraries / frameworks based on it.

`render-jsx` also comes with a super-thin and fast DOM renderer. This means you can use it to create simple web interfaces
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
[► TRY IT!](https://stackblitz.com/edit/render-jsx-demo)

> 👉 Note that the capabilities of this default DOM renderer are relatively limited, specifically if you want highly interactive
> interfaces. This default DOM renderer is not intended as a full-blown UI rendering tool, but as a basis to build such a tool
> by combining it with proper reactive state management logic to provide interactivity.

<br><br>

## Usage

The main purpose of `render-jsx` is allowing you to define what some JSX code would mean. This _translation_ is done via `Renderer` classes, which define
various operations involved in interpreting JSX code. For example, you can easily create a simple (and incomplete) JSON Renderer (which translates JSX to JSON objects) as follows:

```ts
// renderer.ts

import { Renderer } from 'render-jsx';


export class JSONRenderer extends Renderer<any> {
  fallbackAppend(target: any, host: any): void {
    host?.children?.push(target);
  }

  fallbackSetProp(node: any,prop: string,target: any): void {
    node[prop] = target;
  }

  fallbackCreate(tag: any,props?: { [prop: string]: any; },...children: any[]) {
    return { tag, props, children }
  }

  fallbackSetContent(node: any,target: any): void {}
  fallbackFragment() { return {}; }
  renderOn(target: any, host: any): void {}
  renderAfter(target: any, ref: any): void {}
  renderBefore(target: any, ref: any): void {}
}
```

Which can then be used like this:

```tsx
import { JSONRenderer } from './renderer';

const renderer = new JSONRenderer();
console.log(
  <div>
    <b>Hellow</b> World!
  </div>
);
```
```json
{
  "type": "div",
  "children": [
      {
        "type": "b",
        "children": [
          "Hellow"
        ]
      },
      "World!"
  ]
}
```
