> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# Refs

You can reference DOM elements with variables:

```tsx | --no-wmbar
const div = <div>Hellow World!</div>;
setTimeout(() => div.textContent = 'GoodBye, Blue Sky!', 2000);

renderer.render(div).on(document.body);
```

But typically its easier to have all the DOM tree described in one place. For that purpose,
you can use `ref` objects to reference elements (and generally any value) that will be resolved
later:

```tsx | --no-wmbar
/*!*/import { ref } from 'render-jsx/common';

// ...

/*!*/const div = ref();
/*!*/setTimeout(() => div.$.textContent = 'GoodBye, Blue Sky!', 2000);

renderer.render(
/*!*/  <div _ref={div}>Hellow World!</div>
).on(document.body);
```

---

## Generic Use

Refs can also be used to reference any other not-yet-resolved value:

```ts | --no-wmbar
const answer = ref<number>();

// ...

answer.resolve(42);
```

---

## Safety

If you access a ref's `.$` property before the ref is resolved, it will throw an error:

```ts | --no-wmbar
const myRef = ref();
/*~*/myRef.$/*~*/;
```

If a ref is also resolved multiple times, it will throw an error:

```ts | --no-wmbar
const myRef = ref<string>();
myRef.resolve('hellow');
/*~*/myRef.resolve('goodbye!')/*~*/;
```

You can check whether a ref is resolved via its `.resolved` property:

```ts | --no-wmbar
const myRef = ref<string>();
myRef.resolved;  // --> false

myRef.resolve('hellow');
myRef.resolved;  // --> true
```

> :ToCPrevNext