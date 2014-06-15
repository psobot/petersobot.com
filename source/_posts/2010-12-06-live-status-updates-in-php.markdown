--- 
layout: post
title: Live Status Updates with PHP
published: true
image: previews/live.png
---
If you have a personal website, and you use Twitter, there's a chance you already have a Twitter widget embedded in your site. Most people will opt for the default Twitter-provided (Javascript-based) widget, which does its job well, is relatively customizable, and is very easy to implement.

{% img /images/body/psobot_twitter.png [Such an old tweet...] %}

However, some people (like myself) are stubborn and would rather come up with their own custom solution that allows for *complete* customization. I wrote my own basic Twitter feed widget in PHP for the [latest rendition of my homepage][1].

{% img /images/body/myt.png [Well, GitHub is cool.]%}

This custom widget has complete PHP and CSS-based control over how you display the latest tweet. It fits the content into the exact dimensions you want, with a bare minimum of content, so you can style it exactly how you want. I've also set it up to automatically grab the geolocation data from the tweet, or to fall back to the client used to tweet if there's no geotag. You can also (by default) filter the latest tweets selectively - I've chosen to omit @replies and re-tweets, as personally, I'd rather have my own original tweets displayed prominently on my site.

I've made this widget open-source - [download it from github][2] if you'd like. You're free to use it wherever you want. There's only one PHP file to import, and only one function to call. It makes use of PHP's built-in SimpleXML module, to parse through Twitter's live RSS feed of your own tweets and extract the first one that's not an @reply or retweet.

Some future plans for the code:

 - Allow for local caching to reduce fetching from Twitter's rss feed
 - Find some way to allow for private twitter feeds (using their API perhaps?)
 - Offer a more flexible div structure
 - Add the Javascript necessary to load the widget with an Ajax request

{% img /images/body/lfm.png [Last.fm is super cool too.]%}

In addition, if anybody uses Last.fm and is interested in having a similar widget for last song scrobbled, I've created and open-sourced such a widget,&nbsp;[also available for download from github][3]. However, this widget requires an API key, so you'll need to [sign up for an API account][4] if you'd like to use it.

If you've got any comments or suggestions, feel free to leave a comment below.&nbsp;


  [1]: http://www.petersobot.com/
  [2]: http://github.com/psobot/phptwidget/
  [3]: http://github.com/psobot/phplatestsong
  [4]: http://www.last.fm/api/account
