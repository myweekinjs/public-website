---
path: "/schedular"
date: 2019-03-31T12:00:00.000Z
title: "Scheduling Your Social Interactions"
keywords: twitter,firebase,authentication,cloud functions,react app,nextjs,cron
resources:
- Custom <App> %% https://nextjs.org/docs/#custom-app
- datetime-local to timestamp %% https://stackoverflow.com/questions/24691501/how-to-convert-datetime-local-to-datetime-while-storing-and-retrieving-from-data
- datetime-local default value %% https://stackoverflow.com/questions/24468518/html5-input-datetime-local-default-value-of-today-and-current-time
---

This week I decided to build a "Twitter post scheduler" to try and reach a different audience by tweeting when I'd normally be asleep. Now, I am sure this already exists but I want to give it a go with Firebase, Heroku hacks (more on that in a second) and Nextjs.

> The code can be found on [Github](https://github.com/myweekinjs/post-schedular)

## Discovery

Initially, I wanted to use Cloud Scheduler for this, which is essentially Google's version of CRON jobs. However, that costs money and I ain't about that paying life... coffee is too expensive for that. So overcoming this was the first problem. Luckily for me, I built a twitter bot in early 2018 that I launched on Heroku on a free dino. The bot is set to do something every 30 minutes meaning it is never put to sleep. **HACKERMAN!** (I wish I had gifs in my posts) I am planning on using a similar approach here. Although, it might not be as accurate as CRON jobs, I really don't need it to be.

## Setup

This project is split into two parts, `cronish` and `fe`.

`cronish` will be deployed on Heroku and will handle all the twitter posting. `fe` is a nextjs app that will give me a "self-hosted" front end app that I can use to schedule my posts. The posts will be added to a Firebase database. When a `cronish` event runs, it will pull in the data from Firebase and filter through the posts that can be tweeted, and then post them. Not very elegant but hey, I have less than a week to build this. I also decided to use `react-bootstrap` for all the UI work in order to save some time.

## FE

The front end was my first attempt at writing a nextjs app, all in all, I think it went pretty well. I decided to stick with Firebase for the authentication and data storing because it is easy to set up and use. Both good things when you're on a tight schedule. I only have one page, `index.js`, which renders two different views based on the authenticate state that is passed down from the `_app.js`. I recommend looking through the resources at the bottom of the article to read more about the nextjs project structure.

```javascript
const Home = ({ isAuth }) => (
  <Layout>
    {
      isAuth ? <Dashboard /> : <SignIn />
    }
  </Layout>
)
```

How is the `isAuth` *prop* defined? In my personal opinion, probably not very well **BUT** I'll think of a better way next time.

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

The `<Dashboard />` I had in the code example above consists of two components, `CreateTweet` and `ScheduleTweets`. `ScheduleTweets` is similar to the `stats` page component I talked about [last week](/actions-with-google). The `CreateTweet` component, however, has a few cool things happening.

The `CreateTweet` component has the form that is used to schedule your tweets. The two main parts here is the `datetime-local` input field and the `onSubmit` method for the form. The `datetime-local` field allowed me to enter a date similar to `1/04/2019 16:33 pm`, this made it very easy to schedule posts when I need it and it was better than the other date select component that I was trying to use. I did have to find a way to set the default date for the field since `new Date` wasn't enough or in the correct format; small hickup but didn't slow me down too much.

The `onSubmit` method had an interesting bit of code.

```javascript
const timestamp = +new Date(this.state.date)
```

Apparently passing the `datetime-local` value to `new Date` wasn't enough to convert the value to a timestamp value, however, all it ended up needing was a +. Not entirely sure what this does, I'll need to look into it more to know for sure.

## Hacky CRON time

This is what I would call an "I have about 1 hour, let's build a CRON job" CRON job. The `cronish` folder has one main file and one main method, `index.js` & `scheduler`. The scheduler fetches all the posts for a user, loops and checks if the post is in the past and posts a status update to Twitter. The full method for this can be found [here](https://github.com/myweekinjs/post-schedular/blob/master/cronish/index.js).

```javascript
databaseRef.once('value')
.then(snap => snap.val())
.then(tweets => {
  tweets.loop() {
    if (tweet.inThePast()) {
      Twitter.Post()
    }
  }
})
```

It might not be pretty or super efficient but it works, which is slowly becoming the tagline for these challenges. Finally, the CRON part comes in the form of an interval that runs every 30 minutes. Making it very inaccurate but you can adjust it to whatever you need!

```javascript
setInterval(schedular, 1800000)
```

## Heroku gotchas

Due to using I am using the `firebase-admin` package, I needed to pass a `privateKey` value to the `initializeApp` method. However, the one you get from Firebase won't work out of the box. Here is an example of what the key will look like;

```javascript
"-----BEGIN PRIVATE KEY-----\nyoursecret\nkey-data\n8a8d8dS*SSHJJAS*8s8\n-----END PRIVATE KEY-----\n"
```

When you are entering your Heroku environment variables, change this to be;

```
-----BEGIN PRIVATE KEY-----
yoursecret
key-data
8a8d8dS*SSHJJAS*8s8
-----END PRIVATE KEY-----
```

## Improvements

Boy, there are a lot! I have to confess I had about 6 hours in total to work on this project this week, so the quality isn't that great. My first improvement would be to the front end portion of the site. Customising the theme slightly would go a long way, also some more error checking to ensure that you are scheduling posts for the future and not for the past. Making the CRON job a proper CRON job would also be a good improvement to increase the accuracy of the Tweets. And finally adding additional methods, such as LinkedIn, Instagram or Facebook posts to make it a worthwhile product to use. However, given the timeframe, I think this is a good base to build those things on top of.

### 👋 until next time!
