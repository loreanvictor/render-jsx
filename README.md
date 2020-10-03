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

<br><br>

# Overview

[JSX](https://reactjs.org/docs/introducing-jsx.html) is an extension of JavaScript syntax, 
allowing for XML-style layout description within JavaScript. Since it is an extension, you need transpilers
(such as [TypeScript](https://www.typescriptlang.org) or [Babel](https://babeljs.io)) to transpile it to JavaScript.
Transpilers in turn require a semantic specification, i.e. they need to know what should the meaning of the JSX syntax be.

`render-jsx` provides abstractions for creating such semantic specifications in a highly extensible and domain agnostic
fashion. This in turn enables re-use of logic for common patterns such as components, lifecycle, handling of custom
data types, etc., across different domains. For example, you can use same component management logic where 
JSX is directly translated to DOM, where it is translated to input format of a PDF generator, where it is
translated into native UI components, or where it is translated to some intermediary object representation 
(as in [React](https://reactjs.org)).

`render-jsx` also comes with a super-thin and fast DOM renderer (as a common case semantic specification). 
This means you can use it to create simple web interfaces without any extra dependency (`render-jsx` itself is 2.7kB):

```tsx
import { HTMLRenderer, ref } from 'render-jsx';

const renderer = new HTMLRenderer();
const list = ref();
const input = ref<HTMLInputElement>();

function Todo({title}) {
  const li = ref<HTMLElement>();
  return <li _ref={li}>
      {title}
      <button onclick={() => li.$.remove()}>X</button>
  </li>
}

renderer.render(
  <>
    <h1>Todos:</h1>
    <ol _ref={list}/>
    <input type="text" _ref={input}/>
    <button onclick={() => {
      renderer.render(<Todo title={input.$.value}/>).on(list.$);
      input.$.value = '';
    }}>Add</button>
  </>
).on(document.body);
```
[► TRY IT!](https://stackblitz.com/edit/render-jsx-demo3)

> 👉 Note that the capabilities of this default DOM renderer are relatively limited, specifically if you want highly interactive
> interfaces. This default DOM renderer is not intended as a full-blown UI rendering tool, but as a basis to build such a tool
> by combining it with proper reactive state management logic to provide interactivity.

<br><br>

# Usage

The main purpose of `render-jsx` is allowing you to define what some JSX code would mean. This _translation_ is done via `Renderer` classes, which define
various operations involved in interpreting JSX code. For example, you can easily create a simple object Renderer (which translates JSX to arbitrary objects) as follows:

```ts
// renderer.ts
import { Renderer } from 'render-jsx';


export class DummyRenderer extends Renderer<any> {
  fallbackCreate(tag: any, props?: { [prop: string]: any; }, ...children: any[]) {
    const res = { tag, props: {}, children: [] };
    if (props) {
      Object.entries(props).forEach(([prop, target]) => this.setProp(res, prop, target));
    }
    if (children) {
      children.forEach(child => this.append(child, res));
    }
    return res;
  }

  fallbackAppend(target: any, host: any) {
    if (target.tag === 'FRAGMENT') {
      target.children.forEach(child => this.append(child, host));
    } else {
      host.children.push(target);
    }
  }

  fallbackSetProp(node: any, prop: string, target: any) {
    node.props[prop] = target;
  }

  fallbackSetContent(node: any, target: any) {
    if (node.tag === 'LEAF') {
      node.content = target;
    }
  }

  fallbackFragment() { return 'FRAGMENT'; }

  fallbackLeaf() {
    return {
      tag: 'LEAF',
    }
  }

  renderOn(target: any, host: any): void { throw Error('NOT SUPPORTED!'); }
  renderAfter(target: any, ref: any): void { throw Error('NOT SUPPORTED!'); }
  renderBefore(target: any, ref: any): void { throw Error('NOT SUPPORTED!'); }
}
```

Now you can use this renderer like this:

```tsx
import { DummyRenderer } from './renderer';

const renderer = new DummyRenderer();

console.log(
  <div>
    <b>Hellow</b> World!
  </div>
)
```

Or you can augment its functionality by introducing functional components to it:

```tsx
import { ComponentPlugin } from 'render-jsx';
import { DummyRenderer } from './renderer';

const renderer = new DummyRenderer(new ComponentPlugin<any, any>());

const MyComp = () => <b>Hellow</b>;

console.log(
  <div>
    <MyComp/> World!
  </div>
)
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
[► TRY IT!](https://stackblitz.com/edit/render-jsx-demo2)
