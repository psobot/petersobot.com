--- 
layout: post
title: OhLife and Online Privacy
published: true
image: previews/ohlife.png
---
[OhLife][1] is a brilliant site that emails you nightly and lets you keep a journal through email. I've been using the site for many months now, and it's been immensely useful in spurring me to keep a journal. Not that I've read over the entries yet, but when I have a free moment, it'd be interesting to reflect.

{% img /images/body/ohlife.png [Beautiful service.]%}

As awesome as this service is (and it really is), I slowly realized there's no need for me to email all of my journal entries to a third party. With a physical journal, you'd probably keep it very private, and not leave it with anybody at any time - why not do the same for a digital journal? To keep the same functionality though, I still wanted an online, email-based solution.

Enter ***OhJournal***. (Yes, the name is a blatant ripoff of OhLife. Shush, you.)

By putting a 20-odd line PHP script on a cronjob every day at 8pm and a simple Gmail filter, I can replicate the basic functionality of OhLife without using a third party.

{% img /images/body/daily.png [Uggh, PHP.]%}

Every day at 8pm, my server automatically sends me an email reminding me to write a journal entry. The reply-to field is automatically filled with my Gmail address, but with a tag on the end, so my response gets caught by Gmail's filter and goes into the proper folder, properly labelled. It's a *very* simple system, really.

{% img /images/body/gmail.png [I love Gmail filters.]%}

As is my style lately, [the source code is available on github][2]. Feel free to download it and set it up yourself - but be careful to change the email addresses! I don't want to be receiving anybody's errant journal entries...


  [1]: http://www.ohlife.com/
  [2]: http://github.com/psobot/ohjournal
