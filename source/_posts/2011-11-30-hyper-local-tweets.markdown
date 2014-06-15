--- 
layout: post
title: "\"The Street Preacher\" - A Hyper-Local Twitter Bot"
published: true
image: previews/yonge.jpg
---
I walk through Yonge & Dundas Square in Toronto every day.

{% img /images/body/yonge_dundas.jpeg [So. Many. People.]%}

That intersection, which some call Toronto's equivalent of Times Square, has a large number of street preachers. Loud, startling, obnoxious people that yell warnings of doom or urge repentance. Silly people.

I decided to use [Twitter's real-time streaming API][1] to make an extremely specific location-based Twitter bot. The purpose? To respond to you if you tweet near the street preachers at Yonge &amp; Dundas, with similar messages. Call it art, or a statement about society, or making fun of those preachers, whatever - I call it a fun technical and social experiment.

Using [an excellent ArsTechnica article][2] as a guide, I created a quick Python script that watches the Twitter stream for a given area, and replies to tweets in a very specific location. (&plusmn;10 meters or so, by my guess.) If you're one of the lucky few to tweet within those bounds, you'll get a reply from @yonge_dundas:

{% img /images/body/godalmighty.png [GOD ALMIGHTY!]%}

A day later, I decided to clean up the script (rewrite it in Ruby, too) and open-source it. Well, here it is, in a quick Github gist:

{% gist 1413715 300 %}

Feel free to fork it, repurpose it, and do whatever! (Just keep my name at the top, if you please.)

  [1]: https://dev.twitter.com/docs/streaming-api
  [2]: http://arstechnica.com/open-source/guides/2010/04/tutorial-use-twitters-new-real-time-stream-api-in-python.ars/2
