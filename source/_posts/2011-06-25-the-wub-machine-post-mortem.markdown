--- 
layout: post
title: The Wub Machine, Postmortem
published: true
image: previews/wubgraph.jpg
---
[The Wub Machine][1], my fancy dubstep-remixing web app, unexpectedly launched last week. In the days that followed, I took a crash course in how to manage a heavily-used web service. Here's the first of many pretty graphs:

{% img /images/body/wub_firstweek.png [First week stats. Dem spikes.]%}

 1. **Uploads **(whenever a song was uploaded for remixing)
 2. **Processing**&nbsp;(***started/finished/failed***) (the analysis &amp; rendering of the remix)
 3. **Sharing**&nbsp;(sharing of a remix to SoundCloud)
 4. **Downloads**&nbsp;(when a user explicitly downloads their remix)

All of these actions are graphed separately, to provide a detailed look at what happened over the first week of running the Wub Machine.

So, what *did*&nbsp;I learn?

{% img /images/body/wub_reddit.png [Dat failure spike.]%}

 1. **Don't pretend to have capacity.** 

    - I didn't expect such massive server load, and as such, I assumed there would be no harm in allowing people to upload tracks when other tracks were being remixed. This ended up creating a never-ending queue of songs, and prevented anybody from effectively hearing a remix for what would have been a 16 hour wait. Those who did upload songs for remixing had to wait exorbitant amounts of time for their remixes to finish, and the service effectively ground to a halt. Instead, I should have implemented a system that forces users to wait until capacity is available. (And I did, afterwards. Currently, you can't upload a track if the site is currently working on one.)
    - I did make an emergency fix, though: the giant red spike you see on the graph above is the queue of 900 songs, all from eager Redditors, being cleared at once. The queue would have taken nearly 16 hours to process, and effectively caused the site to grind to a halt while still on the front page of [/r/Music][2]. A significant portion of the songs uploaded had been abandoned, and wouldn't have been heard, but were still stuck in the processing queue. Needless to say, the entire system could have used more load testing.


 2. **Test, test, and load test before pushing to production.** 

    - I had been testing on staging for about a week, on a low-powered server, with at most 5 songs processing at once. Had I tested the site in staging with heavier load, and accounted for very unexpected amounts of traffic, I would have been much better prepared for the initial spike.
    - I had prototyped the site using SQLite and with client-side polling to deliver progress updates, as it was simplest to develop. As soon as the front page of the Wub Machine was getting 40 pageviews/sec, SQLite crumbled in production, and PHP started using a ridiculous amount of resources due to the constant polling. It wasn't until many days later that I had time to migrate the database to MySQL and patch the progress indicator to use long polling.
    - I had planned to spend the Monday testing the site with load from Twitter, before posting it to Reddit. Someone decided to post to Reddit before I had anticipated, and I wasn't prepared to make the required changes. A lot of songs failed processing, a lot of bandwidth was used needlessly, and a lot of exposure was wasted with a site too busy to remix songs.

 3. **Expect users to abuse features.** 

    - I built the site with the ability to link to individual remixes. I provided a disclaimer letting people know the links would die after an hour, figuring that anybody who wanted to share a remix would post it to SoundCloud, or at least download it.* Not so.* Hundreds of people started sending around links, essentially turning the Wub Machine into a very bandwidth-heavy temporary remix-sharing site. Had I removed this feature from the start, I would have caused a minor inconvenience to approximately 5% of users, while saving me a ton of bandwidth and hassle.
    - Later in the week, when 4chan's [/mu/][3]&nbsp;discovered the site, I counted a couple hundred links to individual Wub Machine remixes in each threads. Obviously, 4chan is a more anonymous site, and very few people wanted to share via SoundCloud. I tried to lessen the impact of the links by forcing each remix to expire within 15 minutes, instead of 1 hour, which helped slightly. As soon as the traffic died down and the site dropped off of /mu/, I immediately disabled the link feature to save me bandwidth. (Had I disabled the feature while it was popular, I risked a backlash from 4chan... not something anybody wants. Ever.)


 4. **Buy more capacity than necessary.** 

    - I expected the Wub Machine to use a significant amount of bandwidth and tons of server load, but I could have still used more to deal with the unexpected spikes. I started by buying a Linode 512 to host the site, which worked for a while, then started to choke once it hit Reddit. That was quickly upgraded to a Linode 1024, which worked wonders for a while. 4chan drove a lot more traffic than expected, and after a week, I had used up 220GB of bandwidth.
    - After the initial traffic spike and exposure, I shut down my Linode, moved the site back to my Prgmr, and put an hourly limit on the number of songs that can be remixed. I'll probably still need to upgrade my server or increase its bandwidth next month. Who would have guessed that creating a cool web app costs money to keep running?
    - I also realized before even launching that making any money was a very slippery slope. I could have added Adsense to the site, and probably would have been able to recoup my server costs. However, I expected that if the site was ever seen by any record companies, making even one cent off of having people upload their music could be a massive legal liability. (Even though I delete uploads as soon as they're done remixing and don't keep remixes for more than 15 minutes, that wouldn't stop people from taking issue.) Besides, as long as I limit the capacity and keep the site on the VPS I already own, it costs me very little to run.

{% img /images/body/wub_4chan.png [Dem channers.]%}

So, there you have it.&nbsp;Final first-week stats: 15,793 uniques,&nbsp;46,062 pageviews, 1,950 Facebook likes,&nbsp;273,640 story impressions on Facebook, 139 tweets and&nbsp;8,808 songs remixed.

The Wub Machine's not dead, but it's slower, and during the first week, I learned a lot more than I'd ever expected to learn about scaling web services. Having a site go viral was quite an unexpected, thrilling, and crazy experience.


  [1]: http://the.wubmachine.com
  [2]: http://www.reddit.com/r/Music
  [3]: http://boards.4chan.org/mu/
