> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# Overview

[JSX](https://facebook.github.io/jsx/) is an XML-style syntax extension for JavaScript.
It was created for
describing DOM layouts intertwined with JavaScript values and logic, and can
be used for description of any tree-based data:

```jsx | --no-wmbar
const orgTree =                                                                                       // --> JavaScript
  <Org name={myOrg.name}>                                                                             {/* --> JSX */}
    {                                                                                                 // --> interpolate JS code
      myOrg.departments.map(department =>                                                             // --> JavaScript
        <Department name={department.name}>                                                           {/* --> JSX */}
          {                                                                                           // --> interpolate JS code
            department.people.map(person =>                                                           // --> JavaScript
              <Person name={person.name} role={person.role} />                                        // --> JSX
            );                                                                                        // --> JavaScript
          }                                                                                           {/* --> interpolate JS code */}
        </Department>                                                                                 // --> JSX
      );                                                                                              // --> JavaScript
    }                                                                                                 {/* --> interpolate JS code*/}
  </Org>;                                                                                             // --> JSX
```

>:Buttons
> > :Button label=Highlight JSX, url=#code1-l2-l5-l8-l11-l14
>
> > :Button label=Highlight JS, url=#code1-l1-l3:l4-l6:l7-l9:l10-l12:l13

<br>

As an extension, JSX needs to be transpiled to JavaScript. Transpilers such as [TypeScript](https://www.typescriptlang.org/) 
or [Babel](https://babeljs.io/) can properly turn JSX into JavaScript code, however they need to know what the JSX syntax means, i.e.
are the JSX trees to be interpreted as HTML strings, as DOM elements, or some custom data type.

---

**Render-JSX** provides tools and abstractions for specifying that _meaning_ in a highly extensible way.
That is done through `Renderer`s, which determine the baseline type and context to which
the JSX is translated into, for example whether it is DOM elements, native UI components, input format
of a particular PDF generator, etc.

The extensibility of these renderers is encapsulated in `Plugin`s. Each plugin can extend part of the
_rendering_ (or JSX translation) process and add functionality, without necessarily being aware
of the nature of the renderer. This means you can use the same plugin to add functional component support
to a DOM renderer and a PDF renderer, or the exact same plugins for rendering
[Observables](https://rxjs-dev.firebaseapp.com/guide/observable) regardless of whether you are
using an HTML renderer or a native UI renderer.

> :Buttons
> > :Button label=Learn More

---

Using JSX for HTML rendering (rendering DOM) is the most common use case.
As a result, **Render-JSX** comes with a simple and low-level HTML renderer.
This renderer sits directly on top of DOM APIs and is pretty thin (whole package
is ~2.7kB), and can be used to write simple applications or as a basis for
more involved rendering/UI frameworks/tools.

```tsx | --no-wmbar
import { HTMLRenderer, ref } from 'render-jsx';

const renderer = new HTMLRenderer();
const list = ref();
const input = ref<HTMLInputElement>();

function Todo({title}) {
  const li = ref<HTMLElement>();
  return <li _ref={li}>
    <div>{title}</div>
    <button onclick={() => li.$.remove()}>X</button>
  </li>
}

renderer.render(
  <div>
    <h1>Todos:</h1>
    <ol _ref={list}/>
    <input type="text" _ref={input}/>
    <button onclick={() => {
      renderer.render(<Todo title={input.$.value}/>).on(list.$);
      input.$.value = '';
    }}>Add</button>
  </div>
).on(document.body);
```

> :Buttons
> > :Button label=Try It!, url=https://stackblitz.com/edit/render-jsx-demo3
>
> > :Button label=Learn More

> :ToCPrevNext