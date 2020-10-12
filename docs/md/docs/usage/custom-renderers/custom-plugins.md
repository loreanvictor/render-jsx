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
> > ```tsx | --no-wmbar
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
> > ```tsx | --no-wmbar
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

---

## Create Plugin

Plugins implementing `CreatePlugin` can add functionality to node creation process.
For example, the following plugin enables simple class-based components:

> :Tabs
> > :Tab title=Plugin
> > ```ts | class-comp.plugin.ts
> > /*!*/import { Plugin, CreatePlugin } from 'render-jsx/plugin';
> > import { RendererLike } from 'render-jsx';
> > 
> > 
> > export abstract class Component<Node, Renderer=RendererLike<Node>> {  // --> a base class for our class-based components
> >   static __COMP_CLASS_BASE__ = true;                                  // --> this allows checking if given function is constructor of this base class
> > 
> >   constructor(protected props, protected children) {}                 // --> collect props and children
> >   abstract render(renderer: Renderer);                                // --> this will be called to render the component
> > }
> > 
> > 
> > export class ClassComponentPlugin<Node>                               // --> our plugin is generic towards node type
> >   extends Plugin<Node, RendererLike<Node>>                            // --> and can work on any renderer
> >   implements CreatePlugin<Node> {                                     // --> and is a `CreatePlugin`
> > 
> >   priority() { return Plugin.PriorityMax; }                           // --> it has really high priority
> > 
> >   create(tag, props, children) {
> >     if (typeof tag === 'function' && tag.__COMP_CLASS_BASE__) {       // --> if `tag` is a class inheriting our `Component` class
> >       return new tag(props, children).render(this.renderer());        // --> create a new object from it and call its `.render()`
> >     }
> > 
> >     return undefined;                                                 // --> this indicates this plugin couldn't create requested nodes
> >   }
> > }
> > ```
>
> > :Tab title=Usage (Component)
> > ```tsx | my-comp.tsx
> > import { Component } from './class-comp.plugin';
> > 
> > export class MyComp extends Component<Node> {
> >   render(renderer) {
> >     return <div>Hellow {this.props.name}!</div>
> >   }
> > }
> > ```
>
> > :Tab title=Usage (Renderer)
> > ```tsx | --no-wmbar
> > import { CommonDOMRenderer } from 'render-jsx/dom';
> > import { ClassComponentPlugin } from './class-comp.plugin';
> > import { MyComp } from './my-comp';
> > 
> > const renderer = new CommonDOMRenderer()
> >                      .plug(() => new ClassComponentPlugin<Node>());
> > 
> > renderer.render
> >   (<MyComp name='World'/>
> > ).on(document.body);
> > ```

> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo17?file=class-comp.plugin.ts

<br>

> [info](:Icon (align=-6px)) **IMPORTANT**
>
> Create plugins **MUST** either return the node they have created, in which case
> the renderer will not iterate through rest of the plugins, or return `undefined`,
> which causes the renderer to also try other plugins.

> :ToCPrevNext