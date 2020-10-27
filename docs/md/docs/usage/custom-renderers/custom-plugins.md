> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# Custom Plugins

You can create your own custom plugins by extending the `Plugin` class
and implementing one of the core plugin interfaces.

> [info](:Icon (align=-6px)) **NOTE**
>
> Using TypeScript (or an IDE with
> smart type inference and suggestions) is highly recommended, so that you automatically
> get the functions you need to fill in.

---

## Append Plugin

Plugins implementing the `AppendPlugin` interface can add/alter functionality
for when something is appended to another node.

> :Tabs
> > :Tab title=Plugin
> >
> >```ts | callbag-append.plugin.ts
> >/*!*/import { AppendPlugin, Plugin } from 'render-jsx/plugin';
> >import { LiveRendererLike } from 'render-jsx';
> >
> >import pipe from 'callbag-pipe';
> >import subscribe from 'callbag-subscribe';
> >
> >
> >export class CallbagAppendPlugin<Node>                      // --> is generic towards node type
> >  extends Plugin<Node, LiveRendererLike<Node>>              // --> but requires a `LiveRendererLike` (life-cycle concept)
> >  implements AppendPlugin<Node> {                           // --> and is an append plugin
> >
> >  priority() { return Plugin.PriorityFallback; }            // --> allows other plugins to supercede this plugin
> >
> >  append(target: any, host: Node) {                         // --> `target` is to be appended to `host`
> >    if (typeof target === 'function') {                     // --> this plugin only operates when `target` is a function (a callbag)
> >      const renderer = this.renderer();                     // --> get the renderer the plugin is plugged in to
> >      const leaf = renderer.leaf();                         // --> create a leaf node
> >
> >      renderer.hook(leaf, {                                 // --> hooks to life-cycle of the leaf
> >        bind: () => pipe(
> >          target,
> >          subscribe(v => renderer.setContent(leaf, v?.toString()))
> >        )
> >      });
> >
> >      renderer.append(leaf, host);                           // --> asks renderer to append the leaf node
> >      return true;                                           // --> indicates that this plugin handled the append operation
> >    }
> >
> >    return false;                                            // --> indicates that this plugin does not handle the append operation
> >  }
> >}
> >```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { CommonDOMRenderer } from 'render-jsx/dom';
> > import interval from 'callbag-interval';
> > 
> > import { CallbagAppendPlugin } from './callbag-append.plugin';
> > 
> > const renderer = new CommonDOMRenderer().plug(() => new CallbagAppendPlugin<Node>());
> > 
> > renderer
> >   .render(<div>You've been here for {interval(1000)} seconds.</div>)
> >   .on(document.body);
> > ```

> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo5?file=callbag-append.plugin.ts

<br>

> [info](:Icon (align=-6px)) **IMPORTANT**
>
> Append plugins **MUST** return a `boolean` from their `.append()` method.
> Returning `true` means the plugin took over the appending process and there is
> no need to try other plugins, `false` means the plugin could not handle the append
> and other plugins should be tried.

<br>

> [info](:Icon (align=-6px)) **NOTE**
>
> The `.priority()` method should return something between 0 and 1, and is used
> by renderers to prioritize this plugin over others. 0 means fallback, i.e. if no other
> plugin took over the operation then this plugin should be tested, and 1 means this
> is the first plugin that should be tested. `.priority()` method should be defined
> by all plugin types.

---

## Prop Plugin

Plugins implementing `PropPlugin` interface can affect how properties of nodes are set:

> :Tabs
> > :Tab title=Plugin
> > ```ts | callbag-prop.plugin.ts
> > /*!*/import { PropPlugin, Plugin } from 'render-jsx/plugin';
> > import { LiveRendererLike } from 'render-jsx';
> > 
> > import pipe from 'callbag-pipe';
> > import subscribe from 'callbag-subscribe';
> > 
> > 
> > export class CallbagPropPlugin<Node>                         // --> is generic towards node type
> >   extends Plugin<Node, LiveRendererLike<Node>>               // --> but requires a `LiveRendererLike` (life-cycle concept)
> >   implements PropPlugin<Node> {                              // --> and is a `PropPlugin`
> > 
> >   priority() { return Plugin.PriorityFallback; }             // --> allows other plugins to supercede this plugin
> > 
> >   setProp(node: Node, prop: string, target: any) {           // --> we want to set property `prop` on `node` to `target`
> >     if (typeof target === 'function') {                      // --> check if it is a function (i.e. a callbag)
> >       const renderer = this.renderer();                      // --> get the renderer we are plugged into
> > 
> >       renderer.hook(node, {                                  // --> attach to life-cycle of the node
> >         bind: () => pipe(
> >           target,
> >           subscribe(v => renderer.setProp(node, prop, v?.toString()))
> >         )
> >       });
> > 
> >       return true;                                           // --> indicates that we handled the setProp operation
> >     }
> > 
> >     return false;                                            // --> indicates that we couldn't handle the setProp operation
> >   }
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { CommonDOMRenderer } from 'render-jsx/dom';
> > import interval from 'callbag-interval';
> > import pipe from 'callbag-pipe';
> > import map from 'callbag-map';
> > 
> > import { CallbagPropPlugin } from './callbag-prop.plugin';
> > 
> > const renderer = new CommonDOMRenderer().plug(() => new CallbagPropPlugin<Node>());
> > 
> > const style = pipe(
> >   interval(1000),
> >   map(v => v % 2 === 0 ? 'color: red' : 'color: blue')
> > );
> > 
> > renderer.render(
> >   <div style={style}>
> >     Hellow There!
> >   </div>
> > ).on(document.body);
> > ```

> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo16?file=callbag-append.plugin.ts

<br>

> [info](:Icon (align=-6px)) **IMPORTANT**
>
> Prop plugins **MUST** return a `boolean` from their `.setProp()` method.
> Returning `true` means the plugin took over setting the property and there is
> no need to try other plugins, `false` means the plugin could not set given property on given node
> and other plugins should be tried.

<br>

### Styles and Classes

Plugins implementing `SetStylePlugin` interface can affect how particular style values are set
via [style objects](/docs/usage/dom/styles-and-classes#styles):

> :Tabs
> > :Tab title=Plugin
> > ```ts | callbag-style.plugin.ts
> > /*!*/import { Plugin } from 'render-jsx/plugin';
> > /*!*/import { SetStylePlugin } from 'render-jsx/dom/plugins';
> > import { LiveRendererLike } from 'render-jsx';
> > 
> > import pipe from 'callbag-pipe';
> > import subscribe from 'callbag-subscribe';
> > 
> > 
> > export class CallbagStylePlugin
> >   extends Plugin<Node, LiveRendererLike<Node>> 
> >   implements SetStylePlugin<LiveRendererLike<Node>> {
> > 
> >   priority() { return Plugin.PriorityFallback; }
> > 
> >   setStyle(
> >     node: HTMLElement,
> >     style: string,
> >     target: any,
> >     set: (value: string|object) => void
> >   ): boolean {
> >     if (typeof target === 'function') {
> >       const renderer = this.renderer();
> > 
> >       renderer.hook(node, {
> >         bind: () => pipe(
> >           target,
> >           subscribe(v => set(v?.toString()))
> >         )
> >       });
> > 
> >       return true;
> >     }
> > 
> >     return false;
> >   }
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { CommonDOMRenderer } from 'render-jsx/dom';
> > import interval from 'callbag-interval';
> > import pipe from 'callbag-pipe';
> > import map from 'callbag-map';
> > 
> > import { CallbagStylePlugin } from './callbag-style.plugin';
> > 
> > const renderer = new CommonDOMRenderer()
> > .plug(() => new CallbagStylePlugin<Node>());
> > 
> > const color = pipe(
> >   interval(1000),
> >   map(v => v % 2 === 0 ? 'red' : 'blue')
> > );
> > 
> > renderer.render(
> >   <div style={{color: color}}>
> >     Hellow There!
> >   </div>
> > ).on(document.body);
> > ```

> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo20?file=callbag-style.plugin.ts

Similarly, plugins implementing `AddClassPlugin` or `ToggleClassPlugin` can affect how classes are set.
Both of these plugins are also exported from `render-jsx/dom/plugins`.

- Implementors of `AddClassPlugin` are utilizied when a custom value is provided in a [class array](/docs/usage/dom/styles-and-classes#classes).
- Implementors of `ToggleClassPlugin` are used when custom values are provided in [class toggle maps](/docs/usage/dom/styles-and-classes#classes).

> [info](:Icon (align=-6px)) **IMPORTANT**
>
> You **MUST** have `StylePlugin` plugged into your renderer for any `SetStylePlugin` to have any effect.
> Similarly, you **MUST** have `ClassPlugin` plugged into your renderer for any `AddClassPlugin` or `ToggleClassPlugin`
> to have any effect.

<br>

> [info](:Icon (align-6px)) **IMPORTANT**
>
> Similar to prop plugins, style and class plugins **MUST** return a `boolean` from their `.setStyle()`, `.addClass()`
> or their `.addClassToggle()` methods, were `true` indicates that the plugin is handling setting the particular class/style
> and `false` means other plugins should be attempted.

---

## Content Plugin

Plugins implementing `ContentPlugin` can add functionality for setting the
_content_ of a node. The meaning of _content_ of a node is context-dependent,
for example in DOM it is the same thing as inner HTML for elements and text content
of text nodes.

> :Tabs
> > :Tab title=Plugin
> > ```ts | callbag-content.plugin.ts
> >/*!*/ import { ContentPlugin, Plugin } from 'render-jsx/plugin';
> > import { LiveRendererLike } from 'render-jsx';
> > 
> > import pipe from 'callbag-pipe';
> > import subscribe from 'callbag-subscribe';
> > 
> > 
> > export class CallbagContentPlugin<Node>                   // --> is generic towards node type
> >   extends Plugin<Node, LiveRendererLike<Node>>            // --> but needs a `LiveRendererLike` (life-cylce concept)
> >   implements ContentPlugin<Node> {                        // --> and is a `ContentPlugin`
> > 
> >   priority() { return Plugin.PriorityFallback; }          // --> allows for other plugins to supercede this plugin
> > 
> >   setContent(node: Node, target: any) {                   // --> set `node`'s content to `target`
> >     if (typeof target === 'function') {                   // --> if `target` is a function (i.e. a callbag)
> >       const renderer = this.renderer();
> > 
> >       renderer.hook(node, {                               // --> bind to `node`'s lifecycle
> >         bind: () => pipe(
> >           target,
> >           subscribe(v => renderer.setContent(node, v?.toString()))
> >         )
> >       });
> > 
> >       return true;                                        // --> indicates this plugin set the content
> >     }
> > 
> >     return false;                                         // --> indicates this plugin could not set the content
> >   }
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { CommonDOMRenderer } from 'render-jsx/dom';
> > import interval from 'callbag-interval';
> > import pipe from 'callbag-pipe';
> > import map from 'callbag-map';
> > 
> > import { CallbagContentPlugin } from './callbag-content.plugin';
> > 
> > const renderer = new CommonDOMRenderer()
> >       .plug(() => new CallbagContentPlugin<Node>());
> > 
> > const content = pipe(
> >   interval(1000),
> >   map(v => `You have been here for ${v} seconds.`)
> > );
> > 
> > renderer.render(
> >   <div _content={content}/>
> > ).on(document.body);
> > ```

> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo17?file=class-comp.plugin.ts

<br>

> [info](:Icon (align=-6px)) **IMPORTANT**
>
> Content plugins **MUST** return a `boolean` from their `.setContent()` method.
> Returning `true` means the plugin set the content, and `false` means it couldn't
> and the renderer should try other plugins.

---

## Other Plugin Types

Plugins implementing `CreatePlugin` can modify how nodes are created. Returning `undefined`
means the plugin could not create the node and the renderer should try other plugins.

```ts | --no-wmbar
interface CreatePlugin<Node, Renderer> extends Plugin<Node, Renderer> {
  create(tag: any, props?: {[prop: string]: any}, ...children: any[]): Node | undefined;
}
```

<br>

Plugins implementing `LeafPlugin` can determine how leaf nodes are made. Only the highest
priority `LeafPlugin` will be used by the renderer, its fallback mechanism will also be discarded.

```ts | --no-wmbar
interface LeafPlugin<Node, Renderer> extends Plugin<Node, Renderer> {
  leaf(): Node;
}
```

<br>

Plugins implementing `FragmentPlugin` can determine how fragments are created.
The result of this plugin will be passed to renderer's `.create()` method as the tag.
Only the highest priority `FragmentPlugin` will be used by the renderer, its fallback mechanism
will also be discarded.

```ts | --no-wmbar
interface FragmentPlugin<Node, Renderer> extends Plugin<Node, Renderer> {
  fragment(): Node;
}
```

<br>

Plugins implementing`PostCreatePlugin` can run some post-processing on nodes after they
are created.

```ts | --no-wmbar
interface PostCreatePlugin<Node, Renderer> extends Plugin<Node, Renderer> {
  postCreate(node: Node): void;
}
```

<br>

Plugins implementing `PostRenderPlugin` can run some post-processing on nodes
after they are rendered (might happen multiple times for a single node).

```ts | --no-wmbar
export interface PostRenderPlugin<Node, Renderer> extends Plugin<Node, Renderer> {
  postRender(node: Node): void;
}
```

> :ToCPrevNext