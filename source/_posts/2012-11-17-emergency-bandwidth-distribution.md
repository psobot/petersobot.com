--- 
layout: post
title: Emergency Bandwidth Distribution
published: true
image: previews/emergencybandwidth.jpg
---

Late last week, I officially launched [forever.fm][1], an infinite, beatmatched radio stream powered by SoundCloud. This morning, I was happy to discover that it had been featured in [Hack A Day][2] - one of my favourite hack-centric blogs. However, such exposure resulted in one small issue:

![Ow, my wallet!](../../images/body/forever_linode_spike.png)

That's 25% of my little 512MB Linode's monthly bandwidth allotment being used up in 6 hours. With Linode (as of this writing) charging $0.10/GB for bandwidth (allotted or through overages), that huge server load could get very expensive, very fast. (At that rate, each listener would cost me roughly $0.25 per day of constant listening. Not viable for a free service!)

So, this afternoon, I was faced with a dilemma. How do I quickly and easily make it cheaper for me to host the site at peak times? A tried and true CDN would be a good solution, but even simple CDNs like [Amazon CloudFront][3] would cost more than my existing Linode. (Such systems are generally made for scaling to multiple petabytes, while I'm looking at *maybe* 1TB tops.)

Instead of going for a large, expensive CDN, I decided to make my own small one. Currently, it contains exactly two nodes: the original forever.fm streaming server, and the hugely overpowered VPS I use to serve [the Wub Machine][4], my other major music hack.

This "CDN" is simple: I've added [a single Python script][5] to forever.fm that acts as a basic "relay" server. Each relay has a copy of the repo, although it runs `python -m forever.relay start` rather than `python -m forever.server start`. Each relay listens to the stream from the "root" url and re-broadcasts it to *n* users. Then, each time a user requests a new stream from the root, the logic is simple:

    if len(self.listeners) > config.relay_limit:
 	    self.redirect(random.choice(config.relays))

I've got more features to add to the relay system - namely, each relay should be able to send back statistics about number of listeners, user agents, and more back to the central server for logging and live status monitoring. Relays could also be smart and stop listening to the "source" stream if nobody is listening to them - preventing additional bandwidth usage. However, with this very simple star pattern, the single stream can be efficiently broadcast to hundreds (if not thousands) of listeners.

As always, the code is available [on github][6].


  [1]: http://forever.fm
  [2]: http://hackaday.com/2012/11/17/forever-fm-infinite-beat-matched-music/
  [3]: http://aws.amazon.com/cloudfront/#pricing
  [4]: http://the.wubmachine.com
  [5]: https://github.com/psobot/foreverfm/blob/master/forever/relay.py
  [6]: https://github.com/psobot/foreverfm/commit/ef3afe8f97a3b4e8f0196db8fd6b21916b6a832f
