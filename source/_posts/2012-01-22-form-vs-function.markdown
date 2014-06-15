--- 
layout: post
title: The middle ground between form and function
published: true
image: previews/lndrme_small.jpg
---
I've noticed a distinct trend in all of my recent work. Not all of it is useful, and not all of it is feature-complete - but it all&nbsp;places a lot of importance on form over function. Let me give an example:

{% img /images/body/lndrme.png [launder me, get it?]%}

Earlier this month, I put together a quick site called [lndr.me][1], which tracks the usage of laundry machines at VeloCity, my student residence at the University of Waterloo. It's simple and email-driven. Residents can email [washer@lndr.me][2] to say that they're using a washer, and they'll get an email back in ~30 minutes to remind them that their clothes are done. Other residents can also check the site and see if the machines are occupied.

It's an exceedingly simple idea, with very little code required on the backend. (It's a Rails app with ~300 lines of ruby.) I've even made an API to allow other residents to make apps out of it, or link in hardware sensors with Arduinos and ethernet shields.

However, before I even had the idea fleshed out, or the implementation decided on, I did a mockup. I opened Photoshop, drew some icons, found a simple colour scheme, searched for a viable domain name, and scribbled a UX flow into my Moleskine before ever typing `rails new app`.

This simple (some call it cute) design was my starting point. I added some things along the way - animation on the waves in the washing machine to show it's running, or a slightly-shaking dryer icon to show the same - but most of the product was finished before I started writing code. I essentially&nbsp;**started from the user's perspective and then built inwards**.

Now, some people will surely think this is obvious. "Of course you wait for designs first before starting implementation, that's just obvious!" you yell. In the client-and-project-driven world of software contracting, that's absolutely true. Specs must be finalized, and designs (or at least mockups) finished before the product is built.

A lot of other people, though, are confused by this. "It's only a side project, who cares how it looks?" you might say. Or "I'm not a designer, I'm a coder." I've heard both of those far too often to dismiss.

**Your product's user experience is just as important as what it does.**&nbsp;Most apps do things that are marginally useful - track laundry, wake you up in the morning, play music, or give you directions. Would you use a music player that required a screwdriver to change songs? What about a map that gave directions in a series of JSON-encoded latitude and longitude coordinates, to then be decoded by the user? Of course not.

Products are successful, useful, and a joy to use if they have great user experience. A lot of hackers and coders nowadays don't realize how important this is.

Let me give another example:

{% img /images/body/ninjaquote.png [launder me, get it?] %}

[Ninjaquote][3] is a site created by [Scott Greenlay][4], [Jinny Kim][5] and myself in 24 hours (21:15, to be exact) during the recent Facebook hackathon at the University of Waterloo. Its goal is simple: it takes two of your Facebook friends, and finds something one of them said in the past, and quizzes you on it. The game is exceedingly simple, and has another dead-simple user experience.


 1. Click to authorize the app to view your Facebook account.
 2. Receive quote.
 3. Click answer.
 4. See if you were correct.
 5. Goto step 2.

This simple UX, coupled with a good domain name and great mascot, makes the site a pleasure to use. So simple to use, in fact, that it won the hackathon.

This confused me at first. Other entries were far more technically complex - [Hachi][6]&nbsp;was an in-browser collaborative code editor built in Node.js and Socket.IO. [FriendMozaic][7]&nbsp;did some image processing to make your profile picture a mosaic of friends' pictures. [PrivacyVeil][8] used some crazy OpenCV processing to detect faces behind you while you work, and pop up an Excel spreadsheet to cover your Reddit browsing.

Our winning entry was effectively ~1000 lines of Javascript, CSS3 and HTML5. Nothing fancy, nothing new - just a working, effective, and addictive user experience. Having the minimum number of features wasn't a hinderance, as we had design to make the site appealing anyways.

**tl;dr: Find the middle ground between form and function. It's much more valuable than either extreme.**


  [1]: http://lndr.me
  [2]: mailto:washer@lndr.me
  [3]: http://ninjaquote.com
  [4]: http://greenlay.net
  [5]: http://kimyounjin.com
  [6]: http://hachiapp.com
  [7]: http://friendmozaic.com/
  [8]: http://privacyveil.heroku.com/
