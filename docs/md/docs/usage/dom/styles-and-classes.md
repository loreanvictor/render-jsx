> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# Styles & Classes

## Styles

Besides setting styles via style strings, you can also set styles with objects:

```tsx
<div style={{ color: 'red', background: 'blue' }}>Hellow</div>
```

<br>

Transforms can also be specified individually:

```tsx
<div style={{ transform: { rotate: '30deg', scale: 2 } }}>Hellow</div>
```

And so can be transitions:

```tsx
<div style={{ transition: { color: '.3s', transform: '.15s' } }}>Hellow</div>
```

<br>

You can also include the unit for a particular property in its key for convenience:

```tsx
<div style={{ 'fontSize.px': 12, transform: { 'rotate.deg': 30 } }}>Hellow</div>
```

---

## Classes

Besides setting classess via class strings, you can also set them via class name arrays:

```tsx
<div class={['big', 'round']}>Hellow</div>
```

Or via toggle maps:

```tsx
<div class={{ big: true, round: props.round }}>Hellow</div>
```

Or both:

```tsx
<div class={['big', { round: props.round }]}>Hellow</div>
```

> :ToCPrevNext