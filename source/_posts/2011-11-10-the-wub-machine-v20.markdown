--- 
layout: post
title: More Lessons from The Wub Machine
published: true
image: previews/steview.jpg
---
Four months ago, I released the Wub Machine, an online Dubstep remixing web app. It hit Reddit for a couple days, got popular on 4chan, and has since remixed nearly 24,000 songs. About a month ago, at the wonderful [Music Hack Day Montr&eacute;al][1], I wrote and released an Electro-House remixer to complement the Dubstep one. It sounds kinda awesome - here's Stevie Wonder, remixed:

{% soundcloud tracks 24183782 %}

Since then, I've polished up a completely new framework for the Wub Machine - nearly everything about the site has been rewritten since its first release. The first version was held together with duct tape, PHP and prayers, which resulted in some catastrophic failures when the site was initially launched. I've sinced rebuilt it in 100% Python, load tested, and added features.


Instead of talking about the code ([which I do over on GitHub][4]), I have a better story - being featured on the immensely popular VSauce channel on YouTube. I got a seven-second mention (and the thumbnail of the video!) and on Tuesday night, when the video first went up, all hell broke loose. My little [Prgmr][5] server couldn't keep up with the 15,000 visits in 3 hours, and the load has kept up steadily ever since.more


A day later, I've flirted with Amazon EC2 and other hosting solutions, migrated databases back and forth, jumped up and down and watched live Google Analytics for far too long. I moved the site to a new host (not Linode, although they're awesome) and finally, it can handle the load.

So, what lessons have I learned from *this* surge in Wub Machine usage?

 - **Be prepared to scale on-demand.** I should have built the site on some sort of scalable, EC2 or Heroku-based architecture that I can instantly increase capacity with. As it is now, I had to scramble to find a faster web host that I could deploy onto, wait for DNS to switch over, clone the database, etc. Ideally, I could have integrated the site with EC2 to detect surges in popularity and spin up a new worker instance. Alas, that costs money and I'm cheap.     

   - **Know your options for scaling, too.**&nbsp;I didn't realize I could have spun up instances running the same code, and just proxied with a cookie via one master Nginx machine. Either way, there's a number of ways I could have scaled up, and I didn't consider some of the most popular options, only because I hadn't heard of them.


 - **You never know who your next audience will be.**&nbsp;I had previously prepared the site for Reddit, HN, Evolver.fm, etc: sites with a more tech-savvy audience. YouTube, on the other hand, is one of the most accessible sites on the internet. My latest surge in users has come from what seems to be teenagers and your average, casual YouTube user. (the kind with a four-digit number on the end of their username.)              

   - Why is that important? Well... Reddit, Hacker News and other similarly** technical audiences respond badly to advertising**. I had left off ads from the site for a number of reasons, one being they wouldn't be very effective. As soon as I saw YouTube flocking to the site... I figured they'd be slightly more interested. And so far, they have been. Very much so. I think I'll leave the ads in place. (The site can finally pay for itself!)


 - **Know how to jump ship.**&nbsp;In the past couple hours, as I've been trying to make the site faster, I've literally set up the site on 3 different servers. It saved me a ton of time to have an installer script that (mostly) worked. All I need to do now is make that automatic, and I can do something like a Capistrano deploy to add capacity.              

   - **...and know how to take your data with you!**&nbsp;I forgot about my DB at one point, which caused a couple conflicts, and now my statistics are missing about 100 remixes. Not a big deal, but still - have some plan in place to flip databases over instead of copying them. Or something.


 - **People will get fed up and leave.**&nbsp;I have a handy statistics page now that shows me (in real-time!) the activity on the site. I can see as people upload a track, how it progresses, if it fails, why it failed, etc. I can also see clearly when people upload a track, don't want to wait, and close their browser. Although that can sometimes happen due to an overloaded server, more than half of the people who visited during this spike turned away after seeing that they'd have to wait. Perhaps something to try to avoid, but that ties in to my next point...
 - **Care about your users... just enough.**&nbsp;That sounds *incredibly*&nbsp;callous, so I need to clarify myself here. Any website owner should absolutely care about their users. User experience is, in my books, the most important thing to work on. However, if your app goes viral and/or reaches a very wide, very diverse audience, you have to balance that care for UX with your own needs and sanity. I've recieved a handful of emails so far from ordinary people, demanding that I get the site running faster, or that I add feature X and feature Y. Not suggestions, demands!              

   - If you can provide a working app, and do your best to keep it working and user-friendly, then you'll still never hit 100% in all of your metrics. **There will always be people who have a bad experience on the site**, if only because of their own personal situation. (i.e.: browser, connection, or internet literacy) I usually try to go the extra mile and make what I'm working on close to perfect, but at some point, it becomes futile.

So, what's next for the Wub Machine? I'm not sure. I still consider the algorithm a bit of a hack, although it sounds distinctive and kinda cool now. I'm planning a YouTube remixer, but that's technically challenging. There are some small technical problems I can try to fix as well, and I can continue to improve the code base and open source the changes. And of course, I need to keep it running. Otherwise... statistics!

**Wub Machine Statistics (as of November 10, 2011):**


 - 637,568&nbsp;**Facebook story impressions**
 - 208,792 **total site pageviews**
 - 64,673 **total unique visitors**
 - 29,801&nbsp;**total songs uploaded**
 - 1,956 **hours of music remixed (82&nbsp;*days* worth!)**
 - 85% **of tracks remixed successfully**
 - 1,143&nbsp;**remixes shared to SoundCloud**
 - **Most commonly-remixed artists:**
   1. **The Beatles**
   2. **Daft Punk**
   3. **Adele**
   4. **Deadmau5**
   5. **Skrillex**
   6. **Gorillaz**
   7. **Blink-182**
   8. **Led Zeppelin**
   9. **Radiohead**
   10. **Deerhunter** (oddly, only the song "[Helicopter][6]")
 

  [1]: http://montreal.musichackday.org/2011/
  [2]: http://soundcloud.com/peter-sobot/i-wish-wub-machine-electro
  [3]: http://soundcloud.com/peter-sobot
  [4]: https://github.com/psobot/wub-machine#readme
  [5]: http://prgmr.com
  [6]: http://www.youtube.com/watch?v=G5RzpPrOd-4
