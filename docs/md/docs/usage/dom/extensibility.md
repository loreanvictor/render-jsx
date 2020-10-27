> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# DOM Renderer Extensibility

You can add custom plugins to `CommonDOMRenderer` using `.plug()` method,
extending its functionality:

```tsx | --no-wmbar
import { CommonDOMRenderer } from 'render-jsx/dom';
import interval from 'callbag-interval';

/*!*/import { CallbagAppendPlugin } from './callbag-append.plugin';
/*!*/const renderer = new CommonDOMRenderer().plug(() => new CallbagAppendPlugin<Node>());

renderer
/*!*/  .render(<div>You've been here for {interval(1000)} seconds.</div>)
  .on(document.body);
```
> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo5?file=index.tsx

> [info](:Icon (align=-6px)) **IMPORTANT**
>
> A renderer's plugins cannot be changed after it was created. `.plug()` method returns
> a new renderer with the additional plugins plugged in.

---

## Custom Renderers

`CommonDOMRenderer` is itself a `LiveDOMRenderer` with some plugins plugged in. You can basically
re-create it like the following:

```tsx | --no-wmbar
import { LiveRendererLike } from 'render-jsx';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { LiveComponentProcessor, FunctionalComponentPlugin } from 'render-jsx/component/plugins';
import { FragmentLifeCycleMarkerComponentProcessor } from 'render-jsx/dom/component';
import { RefPlugin, ContentPropPlugin } from 'render-jsx/common/plugins';
import {
  EventHandlerPlugin,
  InputStatePlugin,
  OptionObjectValuePlugin,
  StylePlugin,
  ClassPlugin
} from 'render-jsx/dom/plugins';


function myCommonRenderer() {
  return new LiveDOMRenderer().plug(
/*!*/    () => new FunctionalComponentPlugin<Node, LiveRendererLike<Node>>(), // --> enables functional components
/*!*/    () => new LiveComponentProcessor<Node>(),                            // --> enables life-cycle hooks for functional components
/*!*/    () => new FragmentLifeCycleMarkerComponentProcessor(),               // --> enables specifying fragment life-cycle markers

/*!*/    () => new RefPlugin<Node>(),                                         // --> enables the `_ref` attribute
/*!*/    () => new ContentPropPlugin<Node>(),                                 // --> enables the `_content` attribute

/*!*/    () => new EventHandlerPlugin(),                                      // --> enables functions as event handlers
/*!*/    () => new InputStatePlugin(),                                        // --> enables `_state` attribute on inputs
/*!*/    () => new OptionObjectValuePlugin(),                                 // --> enables `_value` attribute on options
/*!*/    () => new ClassPlugin(),                                             // --> enables arrays and toggle maps for classes
/*!*/    () => new StylePlugin(),                                             // --> enables style objects
  );
}
```

> [info](:Icon (align=-6px)) **NOTICE**
>
> Note that `LiveDOMRenderer` is specifically for environments where the DOM is _alive_ 
> (i.e. receiving and reacting to events, changing, etc.).
> For more static rendering (like SSR) you should use the parent class `DOMRenderer` as 
> the basis of your custom renderers.

> :ToCPrevNext