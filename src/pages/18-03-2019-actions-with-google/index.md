---
path: "/actions-with-google"
date: 2019-03-25T12:00:00.000Z
title: "Google actions in Actions"
---

This week I set out to great a app to keep track of different life stats using Google Actions. This would be the first time I am working with the Google Actions SDK which is both exciting and nerve racking!

> The code can be found on [Github](https://github.com/myweekinjs/gactions-life-stats)

## The Goal

The goal is simple, create a small set of actions that will increase simple stats of my day to day life. For example; Hey Google, add **1** to **coffee**.

## Approach #1

[Actions on Google](https://developers.google.com/actions/) offers two ways of creating interactions with the Google Assistant. These being; DialogFlow and Actions SDK. My first approached involved using the Actions SDK as it made the most sense. Define your action; *add {number} to coffees*. Retrive the number and then plus the number to my total.

```javascript
// Excerpt
app.intent('COFFEE', (conv, number) => {
  // +number to total
  conv.reply('Coffees added')
})
```

However, after getting to essentially this point, I read [here](https://developers.google.com/actions/reference/nodejsv2/overview#access_parameters_and_contexts) that the Dialogue flow approach is better suited for defining parameters to capture information during the interaction with the Google Assistant. **Approach #2 here I come!**

## Approach #2

Approach two involves using DialogFlow to setup did *intents* and writing Firebase Cloud Functions to fulfill those intents, very similar to the Actions SDK. After setting up my intent with a number of Traning Phrases;

1. add **1** to coffees
2. I had **5** coffees today
3. etc

The intent learnt that I want to pull out the number in each of the phrases and to save it into a `coffees` variable that I can use in my Cloud Function.

```javascript
app.intent('Add Coffee', (conv, { coffees }) => {
  conv.close(`You want to add ${coffees} to your total`)
})
```

After redeploying my Cloud Functions to my Firebase projects I was able to have the following conversation with my lovely Google Assistant.

- **Me:** talk to AJ's life style
- **Google**: Hello! How can I help you?
- **Me**: Add 2 to coffee
- **Google**: You want to add 2 to your total

### Progress!!

The next step was to take the request and save it into the Firebase Realtime Database to be used later on. This turned out to be easier than I expected. The first step was to authorise my application, which I did through the `firebase-admin` package and generating a SDK key through the Firebase Console interface. After this I was able to easily write a normal push function to add the number to the database.

```javascript
// Authorise code
app.intent('Add Coffee', ({ coffees }) => {
  admin.database().ref('/coffee').push({
    coffee: coffees
  })
  .then(/** Success */)
  .catch(/** Fail */)
})
```

Once this worked I made a small change to the `push` object to add more "metadata" to the values in the database for when I finally add these stats to the website for everyone to see. The first thing was to store the number as a `int` instead of a `string`, I also added a timestamp value to the object which I want to use to sort my coffee consumption by day.

```javascript
admin.database().ref('/coffee').push({
  coffee: parseInt(coffees),
  timestamp: admin.database.ServerValue.TIMESTAMP
})
```

I finally had got my Google Action working! Now the next step is to display the information on the website.

> To see a preview go to the [Stats Page](/stats).

## Displaying from Firebase

For this to work I needed to setup two files.

1. Firebase class [firebase.js]()
2. Gatsby Static page. [stats.js]()

### Firebase.js

With some help from the great [Gatsby community](https://github.com/gatsbyjs/gatsby/issues/6386) I managed to setup my Firebase class to use throughout the website. I had to make a small modification because I was getting a nasty *Duplicate App* error. I ended up only neeeding to check to make sure that the firebase app hadn't already been initialised. Pretty easy fix (after some Googling).

```javascript
if (!firebase.apps.length) {
  firebase.initializeApp({...})
}
```

From this point I was able to import my `Firebase` class and pull data from the Realtime database. Hurray!

### Stats.js

The stats page has one goal; Display the total number of coffees I've had in total. And what is hot currently in React world? Hooks! Which is exactly what I used to create this page.

I needed a few things for this to work. Some state and a way to accept incoming database changes and update the state. For this you use the `useState` and `useEffect` methods provided up React. Here is a **very** dumbed down version of the Stats page component.

```javascript
// ...imports

const StatsPage = () => {
  const [coffee, setCoffee] = useState(0)

  useEffect(() => {
    database.on('value', (data) => setCoffee(data))
  })

  return (
    <p>{ coffee.total }</p>
  )
}
```

The `useEffect` method will listen to changes to the realtime database and once a change is detected it will update the coffee state and the component will re-render to reflect the new total. Unfortunately, the data doesn't change that often to warrent the constant checking but if you decide the setup a similar project, use this approach and watch the magic happen.

## What I learnt

1. Firebase Cloud Functions are a lot easier than I thought and can be really powerful! Definitely going to explore this more.
2. React Hooks is pretty great for pulling in data from the Firebase Realtime Database.
3. Creating Actions and Dialogue Flows.
4. I may be drinking too many cups of coffee.

## Wrapping up

After this I did some additional styling changes to the Stats page to make it look good. Hopefully this article was a good insight on what it is like working with Google Actions. I had an absolute blast working with the technology and getting everything to talk to each other (I think that counts as a pun). If you have any question about the code or process please reach out to me over [Twitter](https://twitter.com/hurricane_int), I'd love to keep talking about this and improving my code.