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