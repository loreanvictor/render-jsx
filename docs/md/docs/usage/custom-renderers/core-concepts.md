> :DarkLight
> > :InDark
> >
> > <img src="/docs/assets/render-jsx-logo-dark.svg" width="156px"/>
>
> > :InLight
> >
> > <img src="/docs/assets/render-jsx-logo.svg" width="156px"/>

<br><br>

# Core Concepts

- A _Renderer_ provides baseline translation of JSX into a particular environment / context. For example you would
have one renderer for rendering into DOM, one for iOS native UI, one for rendering into the shell, etc.

- A _Plugin_ provides additional functionality to a renderer. For example you can have a plugin that allows rendering
`Observable`s, or one that injects specific configs for all components, etc.

- Renderers are immutable. Their behavior is customized by plugging plugins into some _Base Renderer_.

---

## JSX Translation

In **Render-JSX**, JSX is translated into `renderer.create()`. Assuming `renderer` in scope is an instance of
a child class of `Renderer`, then for various operations (creating tagged nodes, leaf nodes, fragments, setting
properties, appending nodes together, etc.) it will first go over its provided plugins, and default to some
fallback behavior specified in the child class.

> :Buttons
> > :Button label=Learn More, url=/docs/usage/custom-renderers/custom-renderers

---

## Renderer / Plugin Reusability

A renderer masks the API of its context / environment, allowing the application code,
components and the plugins to be context / environment agnostic. For example, [a plugin
for rendering callbags](/docs/usage/overview#custom-plugins-and-renderers) can be fully environment agnostic (except for example that the
environment has a concept of life-cycle), meaning it would be usable
both for DOM rendering or for rendering native UI.

<br><br>

<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack-subset.css'>
<pre style="width: 462px; margin: 0 auto; max-width: 100%; overflow: auto; font-family: Hack; font-size: 12px; line-height: 1em">
    ╭────────────────────╮     ╭────────────────────╮         
    │                    │     │                    │         
    │                    │     │                    │         
    │        App         │────▶│     Components     │╶╶╶╶╶╶╶╶╮
    │                    │╶╮   │                    │        ╷
    │                    │ ╷   │                    │        ╷
    ╰────────────────────╯ ╷   ╰────────────────────╯        ╷
                │          ╷             ‌‌‌ │                  ╷
                │          ╷             ‌‌‌ │                  ╷
                ╰────╮     ╰╶╶╶╶╶╶╶╶╶╶╶╶╶ │ ╶╶╶╶╶╶╶╶╶╶╶╶╶╶╮  ╷
                     │                    │               ╷  ╷
      ╭────────────╮ │                    │               ╷  ╷
      │            │ ▼                    ▼               ╷  ╷
    ╭─│  Renderer  │────────────────────────────────╮     ╷  ╷
    │ │            │                                │     ╷  ╷
    │ ╰────────────╯                                │     ╷  ╷
    │                                               │     ╷  ╷
    │      ╭─────────────────────────────────╮      │     ╷  ╷
    │      │                                 │      │     ╷  ╷
    │      │                                 │            ╷  ╷
    │      │             Plugins             │╶╶╶╶╶╶╶╶╶╮  ╷  ╷
    │      │                                 │         ╷  ╷  ╷
    │      │                                 │      │  ╷  ╷  ╷
    │      ╰─────────────────────────────────╯      │  ╷  ╷  ╷
    │                       │                       │  ╷  ╷  ╷
    │                       │                       │  ╷  ╷  ╷
    │                       ▼                       │  ╷  ╷  ╷
    │      ╭─────────────────────────────────╮      │  ╷  ╷  ╷
    │      │                                 │      │  ╷  ╷  ╷
    │      │                                 │      │  ╷  ╷  ╷
    │      │          Base Renderer          │      │  ╷  ╷  ╷
    │      │                                 │      │  ╷  ╷  ╷
    │      │                                 │      │  ╷  ╷  ╷
    │      ╰─────────────────────────────────╯      │  ╷  ╷  ╷
    │                       │                       │  ╷  ╷  ╷
    │                       │                       │  ╷  ╷  ╷
    │                       │                       │  ╷  ╷  ╷
    ╰────────────────────── │ ──────────────────────╯  ╷  ╷  ╷
                            │                          ╷  ╷  ╷
                            │                          ╷  ╷  ╷
                            ▼                          ▽  ▽  ▽
╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮  ╭──╮
│  ╰──╯  ╰──╯  ╰──╯  ╰──╯  ╰──╯  ╰──╯  ╰──╯  ╰──╯  ╰──╯  ╰──╯  │
│                                                              │
│                                                              │
│                    Environment / Context                     │
│                                                              │
│                                                              │
</pre>

<br><br>

> [info](:Icon (align=-6px)) **NOTE**
>
> The application code, components and the plugins _can_ directly utilize
> APIs of the environment (like DOM APIs), if they so choose to. In fact, in some
> situations, there is no other way. However this would mean that particular
> code would be aware of the environment / context and not usable in another one.

> :ToCPrevNext