> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# Components

`CommonDOMRenderer` by default supports functional components:

> :Tabs
> > :Tab title=Component
> > ```tsx | card.tsx
> > const style = raise => `
> >     display: inline-block;
> >     width: 200px;
> >     background: white;
> >     margin: 8px; padding: 8px;
> >     border-radius: 3px;
> >     box-shadow: 0 ${raise}px ${raise * 3}px rgba(0, 0, 0, .2)
> > `;
> > 
> > /*!*/export function Card(props, renderer, children) {
> > /*!*/  const raise = props?.raise || 1;
> > /*!*/  return <div style={style(raise)}>
> > /*!*/    {children}
> > /*!*/  </div>;
> > /*!*/}
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { CommonDOMRenderer } from 'render-jsx/dom';
> > /*!*/import { Card } from './card'; // @see [Component](tab:Component)
> > 
> > const renderer = new CommonDOMRenderer();
> > 
> > renderer.render(<div>
> > /*!*/  <Card>Hellow <i>World!</i></Card>
> > /*!*/  <Card raise={4}>Goodbye <b>Blue Sky!</b></Card>
> > </div>).on(document.body);
> > ```

> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo11

> [info](:Icon (align=-6px)) **IMPORTANT**
>
> For most JSX transpilers, component names **MUST** start with uppercase letters,
> as otherwise the tag will be interpreted by the transpiler as a string tag.
>
> So this is wrong:
> ```tsx | --no-wmbar
> function component(_, renderer) { ... }
> /*~*/<component/>/*~*/
> ```
> But this is correct:
> ```tsx | --no-wmbar
> function Component(_, renderer) { ... }
> <Component/>
> ```

<br>

> [info](:Icon (align=-6px)) **IMPORTANT**
>
> Note that your component functions **MUST** always have a second argument
> named `renderer`, as otherwise the JSX in your component scope cannot be transpiled.
>
> So this is wrong:
> ```tsx
> function Component() {
>   return /*~*/<div>hellow</div>/*~*/
> }
> ```
> But this is correct:
> ```tsx
> function Component(_, renderer) {
>   return <div>hellow</div>
> }
> ```

---

## Child Slots

For slotting other DOM elements into your components, you can
simply use `props`:

> :Tabs
> > :Tab title=Component
> > ```tsx | card.tsx
> > const style = raise => `
> >     display: inline-block;
> >     width: 200px;
> >     background: white;
> >     margin: 8px; padding: 8px;
> >     border-radius: 3px;
> >     box-shadow: 0 ${raise}px ${raise * 3}px rgba(0, 0, 0, .2)
> > `;
> > 
> > export function Card(props, renderer, children) {
> >   const raise = props?.raise || 1;
> >   return <div style={style(raise)}>
> >     {children}
> >/*!*/     {
> >/*!*/       props?.actions?
> >/*!*/       <div style='text-align: right'>{props.actions}</div>
> >/*!*/       :''
> >/*!*/     }
> >   </div>;
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { CommonDOMRenderer } from 'render-jsx/dom';
> > import { Card } from './card'; // @see [Component](tab:Component)
> > 
> > const renderer = new CommonDOMRenderer();
> > 
> > renderer.render(<div>
> >/*!*/   <Card actions={
> >/*!*/     <button onclick={() => alert('Hellow')}>Say Hi</button>
> >/*!*/   }>
> >     Hellow <i>World!</i>
> >   </Card>
> > </div>).on(document.body);
> > ```

> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo12

---

## Fragments

Sometimes you want your components to return a group of DOM elements
without wrapping them inside a container element. For example, your
component might want to return a bunch of columns (`td` elements)
that should sit inside a bigger table.

For this situation, you can use fragments (`<>...</>`):

> :Tabs
> > :Tab title=Component
> > ```tsx | columns.tsx
> > export function Columns(_, renderer) {
> >/*!*/   return <>
> >     <td>Hellow</td>
> >     <td>World</td>
> >/*!*/   </>
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { CommonDOMRenderer } from 'render-jsx/dom';
> > import { Columns } from './columns'; // @see [Component](tab:Component)
> > 
> > const renderer = new CommonDOMRenderer();
> > 
> > renderer.render(<table>
> >   <tr><Columns/></tr>
> > </table>).on(document.body);
> > ```

> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo13

> :ToCPrevNext