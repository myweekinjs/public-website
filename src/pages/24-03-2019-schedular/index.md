---
path: "/schedular"
date: 2019-03-31T12:00:00.000Z
title: "Schedualing your social interactions"
keywords: twitter,firebase,authentication,cloud functions,react app,nextjs,cron
---

This week I want to build a site where I am able to schedule twitter posts for different times to help increase the interactivity with my tweets. Now, I am sure this already exists but I want to give it a go with Firebase, Heroku hacks (more on that in a second) and Nextjs.

> The code can be found on [Github](https://github.com/myweekinjs/post-schedular)

## Discovery

Initially I wanted to use Cloud Schedular for this, which is essentially Googles version of CRON jobs. However, that cost money and I ain't about that paying life... coffee is too expensive for that. So overcoming this was the first problem. Luckily for me I build a twitter bot early 2018 that I launced on heroku on a free dino. The bot is set to do something every 30 minutes meaning it is never put to sleep. HACKS! I am planning on using a similar approach here, although it might not be as accurate as CRON jobs, I really don't need it be.

## Setup

This project is split into two parts; `cronish` and `fe`. `cronish` is what will be deployed on heroku and will handle all the twitter posting. `fe` is a nextjs app that will give me a "self-hosted" front end app that I can use to schedule my posts. The posts will be posted on a Firebase database. When `cronish` runs, it will pull in the data and filter through for posts where the scheduled date is in the past, and then post them. Not very elegant but hey, I have less than a week for built this.

## FE

The front end was my first attempt at writing a nextjs app, all in all I think it went pretty well. I decided to stick with Firebase for the authentication and data storing because, it is easy to setup and use. Both good things when you're on a tight schedule. I only have one page `index.js` which renders two different views based on the authenticate state that is passed down from the `_app.js`. I recommend looking through the resources at the bottom of the article to read more about the nextjs project structure.

```javascript
// index.js
const Home = ({ isAuth }) => (
  <Layout>
    {
      isAuth ? <Dashboard /> : <SignIn />
    }
  </Layout>
)
```

How is the `isAuth` *prop* defined? In my personal opinion, probably not very well **BUT** we'll think of a better way next time.

```javascript
// _app.js
class App {
  authListener = () => {
    firebase.auth.onAuthStateChanged(user => {
      this.props.pageProps.isAuth = user
    })
  }

  componentDidMount() {
    this.authListener()
  }
}
```

This `authListener` method will listen for changes in the authentication state and update the `pageProps` (this is a special nextjs property), and the new `isAuth` value will then pass down to all the children.

### Start Scheduling

The `<Dashboard />` I had in the code example above consists of two components; `CreateTweet` and `ScheduleTweets`. `ScheduleTweets` is similar to the `stats` page component I talked about [last week](/actions-with-google). The `CreateTweet` component however, has a few cool things happening.

# Talk about the CreateTweet component

# Talk about the cronish folder

# mention what you would do better

# add resources