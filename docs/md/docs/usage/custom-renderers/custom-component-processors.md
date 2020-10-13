> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# Custom Component Processors

An advanced type of custom plugins are component processors. They are not directly
used by renderers, but component plugins use them to customize functionalities of
components.

```ts | --no-wmbar
abstract class ComponentProcessor<Node, Renderer> extends Plugin<Node, Renderer> {
  abstract process(
    provide: (provision: ComponentProvision) => void,          // --> can provide data / hooks for the component
    post: (processor: ComponentPostProcessor<Node>) => void,   // --> can post-process the nodes created by the component
    component: ComponentData,                                  // --> the component data (tag, props and children)
  ): void;
}
```

Example:

> :Tabs
> > :Tab title=Plugin
> > ```ts | theme.plugin.ts
> > /*!*/import { ComponentProcessor } from 'render-jsx/component';
> > import { RendererLike } from 'render-jsx';
> > 
> > 
> > export class Theme<Node> 
> >   extends ComponentProcessor<Node, RendererLike<Node>> {
> > 
> >   constructor(readonly color: string) {
> >     super();
> >   }
> > 
> >   priority() { return ComponentProcessor.PriorityFallback; }
> > 
> >   process(provide) {
> >     provide({                      // --> provide data/hooks to components in form of key/values
> >       color: this.color            // --> this translates to `this.color` in functional components
> >     });
> >   }
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { CommonDOMRenderer } from 'render-jsx/dom';
> > import { Theme } from './theme.plugin';
> > 
> > 
> > export function MyComp(_, renderer) {
> > /*!*/  return <button style={`background: ${this.color}`}>Hola!</button>;  // --> `this.color` exists because of the processor
> > }
> > 
> > /*!*/const renderer = new CommonDOMRenderer().plug(() => new Theme<Node>('#f7aa00'));
> > 
> > renderer.render(<MyComp/>).on(document.body);
> > ```

> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo19?file=theme.plugin.ts

---

## Custom Component Plugins

Plugins extending `ComponentPlugin` class can enable new types of components. For example,
the following plugin provides support for simple class-based components:

> :Tabs
> > :Tab title=Plugin
> > ```ts | class-comp.plugin.ts
> > import { RendererLike } from 'render-jsx';
> > /*!*/import { ComponentPlugin } from 'render-jsx/component/plugins';
> > 
> > 
> > export abstract class Component<Node, Renderer=RendererLike<Node>> {   // --> a base class for our components
> >   static __COMP_CLASS_BASE__ = true;                                   // --> this allows us to check if given tag is a class extending this base class
> > 
> >   constructor(
> >     protected props,                                                   // --> collect given props
> >     protected children,                                                // --> collect the children
> >     protected renderer,                                                // --> collect the renderer
> >     protected provision                                                // --> collect additional provisions
> >   ) {}
> > 
> >   abstract render(renderer: Renderer);                                 // --> this will be invoked for rendering stuff
> > }
> > 
> > 
> > export class ClassComponentPlugin<Node>                                // --> so our plugin is generic towards node type
> >   extends ComponentPlugin<Node, RendererLike<Node>> {                  // --> and can work with any renderer
> > 
> >   priority() { return ComponentPlugin.PriorityMax; }
> > 
> >   match(component) {                                                   // --> determines if given component data match this plugin
> >     return typeof component.tag === 'function'                         // --> check if the tag is a function (constructor)
> >           && component.tag.__COMP_CLASS_BASE__;                        // --> check if it is a class extending our base component class
> >   }
> > 
> >   createComponent(component, provision) {
> >     return new component.tag(                                          // --> invoke the constructor
> >       component.props,                                                 // --> give it the props
> >       component.children,                                              // --> give it the children
> >       this.renderer(),                                                 // --> give it the plugged in renderer
> >       provision                                                        // --> give it the additional provisions
> >     ).render(this.renderer());                                         // --> call its render
> >   }
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { CommonDOMRenderer } from 'render-jsx/dom';
> > import { Component, ClassComponentPlugin } from './class-comp.plugin';
> > 
> > /*!*/class MyComp extends Component<Node> {
> > /*!*/  render(renderer) {
> > /*!*/    return <div>Hellow {this.props.name}!</div>
> > /*!*/  }
> > /*!*/}
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

> :ToCPrevNext