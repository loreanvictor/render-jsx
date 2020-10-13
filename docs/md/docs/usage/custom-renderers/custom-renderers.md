> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# Custom Renderers

You can create custom renderers by extending `Renderer` class:

```ts | --no-wmbar
import { Renderer } from 'render-jsx';


export class DummyRenderer extends Renderer<any, DummyRenderer> {
  fallbackCreate(tag: any) {
    return { tag, props: {}, children: [] };
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
  fallbackLeaf() { return { tag: 'LEAF', } }

  renderOn(target: any, host: any): void { throw Error('NOT SUPPORTED!'); }
  renderAfter(target: any, ref: any): void { throw Error('NOT SUPPORTED!'); }
  renderBefore(target: any, ref: any): void { throw Error('NOT SUPPORTED!'); }

  remove() {}

  clone(...plugins) { return new DummyRenderer(...plugins); }
}
```
> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo2?devtoolsheight=33&embed=1&file=renderer.ts

---

## Live Renderers

Sometimes the tree described by the JSX is _alive_, i.e. its nodes have life-cycles.
In such environments it is recommended that your custom renderer also implements `LiveRendererLike` interface,
as that would allow plugins and components to tap into life-cycle of nodes and provide more reactive-style
features.

```ts | --no-wmbar
/*!*/import { Renderer, LiveRendererLike } from 'render-jsx';

export class MyRenderer extends Renderer<N> implements LiveRenderer<N> {
  // ...

  hook(node: N, hook: LifeCycleHook) {
    //
    // --> somehow attach given life cycle hook to the node
    //
  }
}
```

> [info](:Icon (align=-6px)) **INFO**
>
> The `hook` parameter in this example has the following type signature:
> ```ts | --no-wmbar
> interface LifeCycleHook {
>   bind?(): void;
>   clear?(): void;
> }
> ```
>
> The `bind()` callback, if provided, should be invoked when the node is _attached_ 
> and becomes alive (which is typically _after_ when it is created), and `clear()`
> should be invoked when the node is _detached_ (i.e. removed and is basically garbage now).

> :ToCPrevNext