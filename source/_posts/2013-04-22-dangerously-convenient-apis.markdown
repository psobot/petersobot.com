--- 
layout: post
title: Dangerously Convenient APIs
published: true
image: previews/pyconca.jpg

---

The modern trend of providing an API for everything is wonderful. With minimal effort, any developer with an internet connection can programmatically access a wealth of data and powerful functionality. Without APIs, many hackathons wouldn’t exist, and many new developers would languish in frustration instead of participating in the best part of software development - **building fun stuff**.

However, all of this convenience comes at a cost. Often, that cost is literal, if an API provider decides to charge for access. This is the entire business model of many companies, and there are now even companies that provide API-monetization-as-a-service. This has created a kind of purely digital marketplace, by literally allowing people to buy access to data and functions. (This is a Good Thing™, as it encourages competition and variety in the API market, and reduces time-to-ship for many developers.)

Many of these monetized APIs are providing access to something inherently proprietary - an enormous dataset, neural network, or advanced algorithm. A problem arises when these APIs provide access to something open. Imagine an API that provides access to datasets that are completely public and free, or an API that performs simple operations on provided data. For an extreme example, imagine an API that implements strlen() - the simple, common task of finding the length of a string.

<p></p>
---
<p></p>

Imagine a group of young, new programmers building the next cool app. They need to find the lengths of their strings, as you do. As C is hard to learn, and reading documentation would take too much time, they instead outsource their character-counting to api.strlen.com. (The venue of the hackathon has great wi-fi, so the additional network overhead is not a big deal.) They launch the app to much fanfare, pitch it, then win first prize at their Startup Weekend.

Months later, thousands of people are using their hot new app. They’re soaking in the TechCrunch coverage and brainstorming monetization ideas when, suddenly, their app stops working. They trace the error down to one call - to api.strlen.com - and finally see:

    >HTTP/1.1 429 Too Many Requests

It’s 11pm on a Saturday night. The folks that run strlen.com are nowhere to be found.

<p></p>
---
<p></p>

Monday morning rolls around, and our favourite team of programmers has barely slept. Their star app has been down all weekend. Finally, they get an email back from support@strlen.com:

>Congratulations on the TechCrunch coverage! Unfortunately, you’ve way exceeded our rate limit (in fact, we had to put a rate limit in place just because of your app) and we need to chat. We’re now charging $0.0001 per character counted with our string length API. Let me know if you’re interested in upgrading your free account and I can get you set up!
>
>
> -Bjørn, CEO, strlen.com

The team runs the numbers to find that, with the new rates, every additional user of the app would lose them a ridiculous amount of money every day. But, hey - they just had a great chat with an angel - and they might be getting some financing soon. They send Bjørn their details and get set up with a paid account. The app starts working again. Their users are happy, TechCrunch comes by for another interview, and the team’s reason for sleeplessness goes from “anxiety” back to “coding.”

<p></p>
---
<p></p>

It’s been a month since our team - now incorporated as Blue Blanket, Inc. - signed up for their paid strlen.com account. Software engineers are expensive, and while they’ve considered hiring somebody to write their own version of the strlen.com API, they’re really not sure where to start. Their fancy new analytics dashboard shows increasing numbers, minute over minute, until - all at once - the graphs go dead. The app is down again, and once again, it’s due to strlen.com. The team points their web browsers angrily at api.strlen.com, only to find:

    >HTTP/1.1 410 Gone
    
The homepage of strlen.com has an even bleaker message:

> Dear friends,
> 
> We at strlen.com are very proud to announce that we’ve been acquired by Standard Library Incorporated. It’s been a wild ride counting characters for you over the past six months, but we’re excited to move on and solve hard new problems with the great people at stdlib.
All API endpoints will be disabled, effective immediately.
>
>
> -Bjørn, VP String at stdlib.com


Our trusty team’s app stays down for the better part of a month while they scrounge up a handful of competent engineers to recreate the missing functionality. Once back online, their app is all but forgotten. TechCrunch runs an article a year later - “What ever happened to Blue Blanket?” - that places the blame on a power struggle between the co-founders.

<p></p>
---
<p></p>

Obviously, implementing strlen as a paid API is an absurd example, but there are real APIs out there that are not much different. If you depend on an external service for your app’s core functionality, that’s okay. But if you can feasibly replicate the API yourself, then relying on the external service is a source of **extremely risky technical debt**. Your debtors (in this case, the API providers) could demand immediate repayment at any time by rate limiting or shutting down.

Don’t let your app be crippled by someone else’s acquisition.

<p></p>
---
<p></p>

Thanks to [Zameer Manji](http://zmanji.com) for proofreading this post.