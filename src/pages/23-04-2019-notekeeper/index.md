---
path: "/notekeeper"
date: 2019-04-23T12:00:00.000Z
title: "Keeping your notes in one place"
keywords: firebase,markdown editor,create react app,react,firebase hosting,markdown,notekeeper
resources:
- create-react-app %% https://github.com/facebook/create-react-app
- Firebase Documentation %% https://firebase.google.com/docs/web/setup
- Context API %% https://reactjs.org/docs/context.html
---

Writing markdown files in your code editor can get a little annoying sometimes, and having to make sure that I don't accidentally push the article live before it is ready can also be frustrating. These were some of the reason I chose to write my own markdown editor online. **Note** these aren't a good reason and are easily avoidable but we'll run with it.

> The code and be found on [Github](https://github.com/myweekinjs/notekeeper)

## The Tech

Like with many previous weeks, I am using Firebase for all my authentication and data storing. However, I am using [create-react-app](https://github.com/facebook/create-react-app) for the frontend. I am also using [emotion](https://emotion.sh) for all my styling, which I have really grown to love over the past few weeks.

> The final product can be viewed [here](https://notekeeper-e0386.firebaseapp.com/)

### Disclaimer

Before I continue, this was actually built in 1 day so, I recommend playing around a bit but not using it to actually save information. I will probably wipe the database at some point because I wrote a delete query wrong.

## The interesting parts

This project uses a lot of "*generic*" methods, for example, Firebase Authentication, Saving data, Loading data and looping through the data to display the Notes. All this can be found in the Firebase [Documentation](https://firebase.google.com/docs/web/setup).

Something that I did work with that was really interesting was the React `Context` API. The `Context` API allows you to share global state across components without needing to pass down the data using props. This is done by defining your *Context*, *Provider* and a *Consumer*.

#### Context

```javascript
import { createContext } from "react"
const AppContext = createContext()
export default AppContext
```

#### Provider

```javascript
import React, { Component } from "react"
import AppContext from "./AppContext"

export default class AppProvider extends Component {
  state = {
    globalErrors: null
  }

  render() {
    return (
      <AppContext.Provider value={{...this.state}}>
        { this.props.children }
      </AppContext.Provider>
    )
  }
}
```

At this point, you would wrap your global App component in the `<AppProvider>` component to allow child components to Consume the Context data.

#### Consumer
```javascript
import AppContext from "./AppContext"

class ErrorBar extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          renderErrors(context.globalErrors)
        )}
      </AppContext.Consumer>
    )
  }
}
```

This is a pretty neat feature and definitely makes state management in smaller applications a lot easier! However, you are not limited to just stateful components. You can also use them on functional components using Hooks. Hooks are also something I've grown to love over the last few weeks.

```javascript
import React, { useContext } from "react"
import AppContext from "./AppContext"

const Errors = () => {
  const errors = useContext(AppContext)

  return renderErrors(errors.globalErrors)
}
```

> An example of this can be found [here](https://github.com/myweekinjs/notekeeper/blob/master/src/components/NotesListing/NotesListing.js)

## That really is it

Unfortunately, there wasn't a whole lot to cover for this project. I do want to continue working on this in the future and expanding it to a point where it is worth using on a day to day basis. Even it was just a personal thing. A future expansion that I have planned is to add a [frontmatter](https://jekyllrb.com/docs/front-matter/) editor for each post, which would make the transition over to Gatsby a whole lot easier. Possibly even a markdown file downloader, we'll see, the possibilities are endless (my motivation to keep working might not be though...)

### 👋 until next time!