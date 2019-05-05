---
path: "/chrome-extension-with-react"
date: 2019-04-15T12:00:00.000Z
title: "Creating a Chrome Extension with React"
keywords: google extension,react,chrome extension,react chrome extension,chrome,mutation observer
resources:
- Creating Extensions %% https://developer.chrome.com/extensions/getstarted
- Mutation Observers %% https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
---

This week I set out to create a chrome extension and utilise JavaScript and React to inject a component into a website. The result is a beautiful combination of Mutation Observers and JavaScript goodness!

> The code can be found on [Github](https://github.com/myweekinjs/chrome-extension-w-react)

## Lets get ready!

To start, I downloaded a starter for a chrome extension from the [Chrome Developer](https://developer.chrome.com/extensions/getstarted) website. If you want to learn the basics of extension development, I definitely recommend looking at the website. I immediately deleted the `options.js`, `options.html`, and `popup.js` files. In the `manifest.json` file I removed the `options_page` key as well as the `storage` value from the `permissions` array. Next, you want to add `https://www.myweekinjs.com/` to the `permissions` array.

I will be referencing *myweekinjs* a few times, this could be any website that you wish to inject a React component into.

Next, I created an `app.js` with a simple `console.log` to test that the script works, and updated the `background.js` to;

```javascript
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          hostEquals: 'www.myweekinjs.com',
          schemes: ['https', 'http'],
          pathContains: 'inject-me'
        },
        css: ['div']
      })],
      actions: [
        new chrome.declarativeContent.RequestContentScript({
          js: ['app.js']
        })
      ]
    }]);
  });
});
```

Alright! That was a lot! The `background.js` script will do the following;

1. Listen for page/tab changes
2. Check if the current page is (http|https)://www.myweekinjs.com/inject-me
3. If it is, it will load our `app.js` file

Follow these [steps](https://developer.chrome.com/extensions/getstarted#manifest) to load your extension for testing purposes.

## Let's get scripting!

Next step is to create our `webpack.config.js` file to compile our React and Javascript. At this point, I'd recommend creating a *dist* folder with the current files (minus the `app.js`), and unpacking that folder as our extension. This way you can compile into this *dist* folder and won't include your *node_modules* into the extension.

> We'll use this awesome resource to generate our webpack and .babelrc files [createapp.dev](https://createapp.dev/)

1. Open the resource ^
2. Check React, Babel. Uncheck React hot loader
3. Run `npm init -y` and install the packages outlined by the resource
4. Copy the `webpack.config.js` and `.babelrc` files into your project
5. Copy the `scripts` from the `package.json`

There are a couple of small tweaks that we need to make. For the `webpack.config.js` change the entry and output settings;

```javascript
var config = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  ...
}
```

Change the `build-dev` script to;

```javascript
"dev": "webpack -d --mode development --watch"
```

You might have some syntax issues with the `.babelrc`, they should be easy to fix though, mainly issues about using double quotes.

Running the `build-prod` script will compile the `app.js` file. After a unpack and reload, you should be greeted with the same `console.log` as before. A long process to get where we were, but now things get interesting!

## Let's get appy!

We want our app to do a few things;

1. Wait for the page to load completely
2. Watch for mutations on a target container
3. Insert our React root
4. Render a React component

We'll start with the following structure. It adds a listener to the window on `load` and contains our main callback function which I called *app*.

```javascript
window.addEventListener('load', function() {})

const app = () => {}
```

### Step 1 is done! Onwards!

Next, we'll be adding a [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) which gives us the superpower to watch for changes in the DOM tree. It is pretty sweet. For our project, we are going to be observing the `target-test` div on our [test page](/inject-me). The following code is added to the *load* callback.

```javascript
// Specifies the element we want to watch
const watch = document.getElementById('target-test')

// Creates a new Mutation Observer
const observer = new MutationObserver((mutationList, observer) => {

})

// Starts observing the child list of the element
observer.observe(watch, {
  childList: true
})
```

Next, we want to loop through the mutations and call our app method if we can find the element we are looking for.

```javascript
const observer = new MutationObserver((mutationList, observer) => {
  // Loops through the mutations
  for (const mutation of mutationList) {
    // Checks if it is a change to the child elements
    if (mutation.type === 'childList') {
      // Attempts to find the p tag
      const target = watch.querySelector('p')
      if (target) {
        // Calls our app method
        app(observer, target)
      }
    }
  }
})

// Update the callback to accept those arguements
const app = (observer, target) => {}
```

Almost there! Now we want to create a root for our React component and insert it before our target element.

```javascript
const app = (observer, target) => {
  // Disconnects from the observer to stop any additional watching
  observer.disconnect()

  // Checks if the element doesn't exist
  if (!document.getElementById('react-root-test')) {
    // Create and inserts the element before the target
    const parent = target.parentNode
    const root = document.createElement('div')
    root.setAttribute('id', 'react-root-test')

    parent.insertBefore(root, target)
  }
}
```

## Lets get reacting!

Now that we have our React root we can finally create and render our component. I will just be creating a simple React component in the same file. However, you can create any component you choose to, it is up to you! Once you've added your component, unpack your extension and reload the test page and you should see the component appear!

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

const TestComponent = () => (
  <h1>I am dynamically added!</h1>
)

const app = () => {
  //...
  parent.insertBefore(root, target)

  ReactDOM.render(<TestComponent />, document.getElementById('react-root-test'))
}
```

## BOOM!

We did it! This is only scratching the surface of what you are able to do with chrome extensions and using React. Using the same technique, you'll be able to add features to websites. Similar to extensions like Grammarly or LastPass. The possibilities are almost endless!

## Wrapping up

This was a pretty cool project I think. I definitely didn't think something like this was possible with chrome extensions. Using the Mutation Observer for this example may be overkill. However, when you encounter a website that dynamically renders content, being able to wait until the content you need is ready is super cool! If you have any questions about the code or process please reach out to me over [Twitter](https://twitter.com/hurricane_int), I'd love to keep talking about this and improving my code.

### 👋 until next time!
