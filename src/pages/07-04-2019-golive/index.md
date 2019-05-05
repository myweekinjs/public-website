---
path: "/golive"
date: 2019-04-07T12:00:00.000Z
title: "Going Live Checklist"
keywords: react,checkboxes,go live,checklist
---

Ever wanted a small checklist with some generic items that you should do before making a website live? Well here it is!

> The code can be found on [Github](https://github.com/myweekinjs/golive)

> Visit the [golive](https://golive.hurricaneinteractive.now.sh/) website

The project this week uses [Nextjs](https://nextjs.org) and [Emotion](https://emotion.sh/docs/introduction). Emotion is a library to write your CSS inside your JavaScript files. This is my first time using Emotion and I have to say, I am definitely going to keep using it. It makes setting up projects super quick, and easy to create reusable components for consistency throughout your project. One of the main elements for this project was the `<Checkbox />`, which I was able to give a cool *checked* styling.

```javascript
/** @jsx jsx */
import { jsx, css } from "@emotion/core"

const Checkbox = (props) => (
  <input
    {...otherProps}
    type="checkbox"
    css={css`
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: white;
      border: 1px solid #002C3E;
      border-radius: 3px;
      outline: none;
      margin: 0;
      cursor: pointer;
      transition: all 250ms ease-in-out;
      &:checked {
        background: #f50c68;
        box-shadow: inset 0 0 0 4px white;
      }
    `}
  />
)
```

Something to note here is the `/** @jsx jsx */` line. This tells [Babel](https://babeljs.io/) to use the Emotion *jsx* method instead of the React *jsx* method. Pretty sweet!

## The Checklist

My checklist component accepts two props, `headline` (string) and `questions` (array). The biggest issue I had was handling the state for the questions (whether they are "checked" or not). My first approach was to create an array of zeros, equal to the number of questions. When a question is checked, I'd change the 0 to a 1 to mark it as checked.

```javascript
class Checklist extends Component {
  state = {
    checked: Array(this.props.questions.length).fill(0)
  }
}
```

However, when I tried this, it didn't work. Not a 100% sure why but I moved onto my next method, which was to create a key based on the question using the `slugify` package. I also used this key as the input `name` which is used to "toggle" the checked value when a user clicks on the checkbox.

```javascript
import slugify from 'slugify'

class Checklist extends Component {
  constructor(props) {
    super(props)
    let state = {}
    this.props.questions.forEach((q) => {
      const key = slugify(q.toLowerCase())
      state[key] = false
    })
    this.state = {
      ...state
    }
  }

  onChange = (e) => {
    const name = e.target.name
    this.setState({
      [name]: !this.state[name]
    })
  }
}
```

## Wrapping Up

Checkboxes in React was suprisingly annoying but I got there in the end! This week was another quick hack job, unfortunately. In the upcoming week I am working on a chrome extension that injects a React component into a website. Which is definitely more exciting than this. Hopefully my checkbox woes was enough to keep the article interesting.

### 👋 until next time!
