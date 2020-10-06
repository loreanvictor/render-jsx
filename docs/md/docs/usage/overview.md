> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# Usage Overview

**Render-JSX** can be used in two main ways: as a thin and fast DOM renderer, and as a basis for
creating extensible custom JSX renderers and rendering plugins.

---

## DOM Renderer

**Render-JSX** comes with a `CommonDOMRenderer` class which enables rendering pure DOM elements
on the document. It also has base DOM renderer and rendering plugins that allow for basic DOM rendering
either on client or server side.

```tsx | --no-wmbar
import { CommonDOMRenderer } from 'render-jsx/dom';
import { ref } from 'render-jsx/common';

const renderer = new CommonDOMRenderer();
const span = ref();

renderer
  .render(<div>You've been here for <span _ref={span}/> seconds.</div>)
  .on(document.body);

let s = 0;
span.$.textContent = `${s}`;
setInterval(() => { s++; span.$.textContent = `${s}`; }, 1000);
```

> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo4?file=index.tsx
>
> > :Button label=Learn More, url=/docs/usage/dom/overview

---

## Custom Plugins and Renderers

Imagine you want to be able to render [callbags](https://github.com/callbag/callbag) in your JSX.
You can do that by writing a rendering plugin for it:

```ts | callbag-append.plugin.ts
import { AppendPlugin, Plugin } from 'render-jsx/plugin';
import { LiveRendererLike } from 'render-jsx';

import pipe from 'callbag-pipe';
import subscribe from 'callbag-subscribe';


export class CallbagAppendPlugin<Node>                                  // --> this plugin can be applied to any node type
  extends Plugin<Node, LiveRendererLike<Node>>                          // --> but the renderer must be live-like (understand life-cycle hooks)
  implements AppendPlugin<Node> {

  priority() { return Plugin.PriorityFallback; }

  append(target: any, host: Node) {
    if (typeof target === 'function') {                                 // --> appending a function (perhaps callbag) is requested
      const renderer = this.renderer();                                 // --> get the renderer
      const leaf = renderer.leaf();                                     // --> create a leaf node

      renderer.hook(leaf, {                                             // --> add life-cycle hook to the leaf
        bind: () => pipe(                                               // --> when it is bound
          target,                                                       // --> start listening to the target
          subscribe(v => renderer.setContent(leaf, v?.toString()))      // --> and set its value as the leaf's content
        )
      });

      renderer.append(leaf, host);                                      // --> now append this leaf to the host
      return true;
    }

    return false;
  }
}

```

<br>

You can now plug this plugin into any JSX renderer that supports life-cycle hooks to render
callbags, including the aforementioned `CommonDOMRenderer`:

```tsx | --no-wmbar
import { CommonDOMRenderer } from 'render-jsx/dom';
import interval from 'callbag-interval';

import { CallbagAppendPlugin } from './callbag-append.plugin';

const renderer = new CommonDOMRenderer().plug(() => new CallbagAppendPlugin<Node>());

renderer
  .render(<div>You've been here for {interval(1000)} seconds.</div>)
  .on(document.body);
```
> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo5?file=index.tsx
>
> > :Button label=Learn More, url=/docs/usage/custom-renderers/core-concepts

> :ToCPrevNext