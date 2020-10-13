> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# Plugins

Plugins are the easiest way for customizing renderer behavior of any renderer object.
You can plug plugins into an existing renderer using `.plug()` method:

```tsx | --no-wmbar
const baseRenderer = new SomeRenderer();
/*!*/const renderer = baseRenderer.plug(() => new MyPlugin());
```

<br>

> [info](:Icon (align=-6px)) **IMPORTANT**
>
> You **MUST** pass a plugin factory function to `.plug()`.
> So this is wrong:
> ```tsx | --no-wmbar
> const myPlugin = new MyPlugin();
> const renderer = baseRenderer/*~*/.plug(myPlugin)/*~*/;
> ```
> And this is correct:
> ```tsx | --no-wmbar
> const renderer = baseRenderer.plug(() => new MyPlugin());
> ```

<br>

> [info](:Icon (align=-6px)) **IMPORTANT**
>
> `.plug()` method returns a new renderer object. So this does nothing:
> ```tsx | --no-wmbar
> /*~warn~*/baseRenderer.plug(() => new MyPlugin());/*~warn~*/
> ```
> But this creates a customized renderer:
> ```tsx | --no-wmbar
> const renderer = baseRenderer.plug(() => new MyPlugin());
> ```

---

## Default Plugins

The following plugins are provided by **Render-JSX** package itself. They are all
plugged in into `CommonDOMRenderer` by default, but you can plug them in into
other renderers to get their functionality.

> :Buttons
> > :Button label=See Example, url=/docs/usage/dom/extensibility#custom-renderers

<br>

### Ref Plugin

Allows you to use refs on your elements. Can be plugged into any renderer.
```tsx
import { RefPlugin } from 'render-jsx/common/plugins';
```
> :Buttons
> > :Button label=Learn More, url=/docs/usage/dom/ref


### Content Prop Plugin

Allows setting content (e.g. inner HTML) of elements via `_content` property.
Can be plugged into any renderer.
```tsx
import { ContentPropPlugin } from 'render-jsx/common/plugins';
```
> :Buttons
> > :Button label=Learn More, url=/docs/usage/dom/overview#inner-html

### Event Handler Plugin

Allows attaching functions as event handlers to DOM elements.
Can be plugged into `LiveDOMRenderer`s.
```tsx
import { EventHandlerPlugin } from 'render-jsx/dom/plugins';
```
> :Buttons
> > :Button label=Learn More, url=/docs/usage/dom/inputs-and-events#events

### Input State Plugin

Allows capturing state of an `<input>` element via a callback.
Can be plugged into `LiveDOMRenderer`s.

```tsx
import { InputStatePlugin } from 'render-jsx/dom/plugins';
```
> :Buttons
> > :Button label=Learn More, url=/docs/usage/dom/inputs-and-events#inputs

### Option Object Value Plugin

Allows setting custom data as value of `<option>` elements.
Can be plugged into `LiveDOMRenderer`s.

```tsx
import { OptionObjectValuePlugin } from 'render-jsx/dom/plugins';
```
> :Buttons
> > :Button label=Learn More, url=/docs/usage/dom/inputs-and-events#inputs

### Functional Component Plugin

Allows use of functional components. Can be plugged into any renderer.

```tsx
import { FunctionalComponentPlugin } from 'render-jsx/component/plugins';
```
> :Buttons
> > :Button label=Learn More, url=/docs/usage/dom/components

### Live Component Processor

Allows use of life-cycle hooks in components. Can be plugged into _live_ renderers (implementing `LiveRendererLike` interface).

```tsx
import { LiveComponentProcessor } from 'render-jsx/component/plugins';
```
> :Buttons
> > :Button label=Learn More, url=/docs/usage/dom/component-life-cycle

> :ToCPrevNext