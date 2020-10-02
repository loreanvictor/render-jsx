<img src="/render-jsx-logo.svg" width="300"/>

# render-jsx

```bash
npm i render-jsx
```

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
[► TRY IT!](https://stackblitz.com/edit/render-jsx-demo2)
