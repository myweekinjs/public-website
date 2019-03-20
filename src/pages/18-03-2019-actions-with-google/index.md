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