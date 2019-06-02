---
path: "/typescript-and-react-discoveries"
date: 2019-05-31T12:00:00.000Z
title: "Discoveries I made while using Typescript and React"
keywords: typescript,react,tips,tricks,type declaration,storybook
---

This week I have been working on a React app using Typescript and I've made a few discoveries that were very useful. This is one of my first projects using Typescript and so far I don't want to go back. Some of these discoveries may be common knowledge but for a Typescript novice, they are very useful for writing better code. For me at least. So without further ado, let's get into it!

## Only allow specific keys on an object

This is quite useful when you want to limit the keys that can be added to an object. For example, allowing another dev to pass functions that should be used as event listeners. In that situation you only want the dev to pass vaild event listeners to avoid nasty errors.

```javascript
type TListenerTypes = "onload" | "progress" | "error"
type TListeners = {
  [k in TListenerTypes]: Function
}

// Passes!
const listenerObj: TListeners = {
  onload: () => {}
}

// Error
const errorObj: TListeners = {
  a: "something", // wrong type
  progress: () => {},
  d: 10 // not in objectKeys type
}
```

## Categorising Storybook Stories

In the project I am working on, we are using [storybook](https://storybook.js.org/) to test our components. Once you've added a few stories, you start wishing for a way to categorise these into relevant groupings. Luckily there is a solution for this! As a side note, I cannot recommend storybook enough. It is **SUPER** useful for visually testing components independently. With the power of *addons* you can do accessibility checking, light/dark mode testing etc.

```javascript
// uncategorised
storiesOf("Button", module).add(...)

// categorised under "Form"
storiesOf("Form|Selectbox", module).add(...)
```

## Passing a component as props

This became an issue when I wanted to declare a custom `<Route>` component while using [React Router](https://reacttraining.com/react-router/web/api/Route/render-func). I needed a way to pass a component to the custom `<Route>` and then be able to render the component. This was surprisingly annoying. **Tip**, if you're able to view the type definitions for other modules, **DO IT!** I have found quite a few solutions from existing codebases, including this one;

```javascript
import { ComponentType } from "react"
import { RouteProps } from "react-router-dom"

interface ICustomRoute extends RouteProps {
  // Allows you to pass in components and then render them
  component: ComponentType<any>
}

const CustomRoute = ({
  component: Component,
  ...rest
}: ICustomRoute) => (
  <Route
    {...rest}
    render={props => (
      <Component {...props} />
    )}
  />
)
```

## Allow native HTML attributes as props

Imagine you want to create an `<Input />` component, which should accept all properties of a `<input />` element as well as an additional `theme` object. To stop you from creating a custom definition for the component, it would be alot better to just extend the available props of an `<input />` element, and, **YOU CAN!**

```javascript
import { HTMLAttributes } from "react"

type Theme = "light" | "dark"
interface IProps extends HTMLAttributes<HTMLInputElement> {
  // additional props if need
  theme: {
    variation: Theme
  }
}

// You might want to extract certain props and your custom props
// instead of just spreading all the props
// if you don't have additional props swap IProps for HTMLAttributes<HTMLInputElement>
const Input ({ theme, ...props }: IProps) => (
  <input
    {...props}
    className={`input input--${theme.variation}`}
  />
)

// Usage
<Input
  onChange={(e) => handle(e)}
  value={this.state.name}
  name="name"
  id="id"
  theme={{
    variation: "light"
  }}
/>
```

## Get device orientation

This is not really Typescript or React related, however, it could lead to something interesting. I can definitely imagine this being useful for a very cool but also very useless feature. Read more about it on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation).

```javascript
// Check if it is supported
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", function(e) {
    console.log({
      x: e.alpha,
      y: e.beta,
      z: e.gamma
    })
  }, false)
}
```

## Wrapping up

Each week we learn new techniques and different ways of thinking. I’d recommend to anyone to note down the different techniques you’ve learnt. Not only will you create a small knowledge base, you will also become more motivated when you see the progress you have made.

### 👋 until next time!
