> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# Component Life Cycle

Components have the following life cycle:
- **Creation**: this is when the component code is invoked
- **Binding**: this is when the DOM elements returned by the component are added to the actual DOM
- **Clearing**: this is when the DOM elements returned by the component are removed from the actual DOM

Component code is always invoked during **creation**. Components rendered with `CommonDOMRenderer` can also
run logic on other life-cycle stages (**binding**/**clearing**):

```tsx | --no-wmbar
import { ref } from 'render-jsx/common';


export function MyComp(_, renderer) {
  const container = ref();

/*!*/  this.onBind(() => console.log('Bound!'));
/*!*/  this.onClear(() => console.log('Cleared!'));

  return <div _ref={container}>
    <button onclick={() => renderer.remove(container.$)}>
      Remove ME!
    </button>
  </div>;
}

```
> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo14?devtoolsheight=33&embed=1&file=my-comp.tsx

> [verified_user](:Icon) **Strict Type-Checking in TypeScript**
>
> If you are programming in TypeScript and want to conduct strict-typechecking (which is actually
> highly recommended), **Render-JSX** provides type annotations for `this` argument:
>
> ```tsx | --no-wmbar
> import { RendererLike } from 'render-jsx';
>/*!*/ import { LiveComponentThis } from 'render-jsx/component/plugins';
> 
> export function MyComp(
>/*!*/    this: LiveComponentThis,
>    _: any,
>    renderer: RendererLike<Node>) {
>   // ...
>
>   this.onBind(() => ...);
>
>   // ...
> }
> ```
>
> If you want to use `this.setLifeCycleMarker()` (see [below](#fragment-returning-components)) you should use
> `LiveDOMComponentThis` instead:
> ```tsx | --no-wmbar
> /*-*/import { LiveComponentThis } from 'render-jsx/component/plugins';
> /*+*/import { LiveDOMComponentThis } from 'render-jsx/dom';
> ```

---

## Fragment Returning Components

A component's life-cycle hooks are bound to the DOM element it returns, so bind logic is called
when that element is added to DOM, and clear logic is invoked when that element gets removed.

However, if a component returns a fragment, there is no such element to track. `CommonDOMRenderer` automatically
inserts a hidden _marker_ element and will track that _marker_ for the component's life-cycle.

You can override that behavior by providing a _marker_ element yourself:

```tsx | --no-wmbar
import { ref } from 'render-jsx/common';


export function MyComp(_, renderer) {
  const btn = ref();

  this.onBind(() => console.log('Bound!'));
  this.onClear(() => console.log('Cleared!'));
/*!*/  this.setLifeCycleMarker(btn);

  return <>
    <button _ref={btn} onclick={() => renderer.remove(btn.$)}>
      Remove ME!
    </button>
  </>;
}
```
> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo15?devtoolsheight=33&embed=1&file=my-comp.tsx

> :ToCPrevNext