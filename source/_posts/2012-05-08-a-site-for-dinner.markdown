--- 
layout: post
title: A Site For Dinner
published: true
image: previews/potatoes.jpg
---

I like to make small, single-serving sites - frivolous sites with only one
page, and one purpose. They're intended to be dead-simple to use, fun to play
with, and somewhat silly. I've made a [couple][1] [in][2] [the past][3], both
alone and with others, often thinking of the idea over dinner and then
implementing it in the hours (or days) that follow. Last night, I decided to
make another single-serving site - and to make it [open-source][14], to show
others how simple it is to do.

Enter *[A Meal for Me][4]*. Roughly 200 lines of code for a fun site that now
helps me be more adventurous in the kitchen. (Grab [the source on GitHub!][14])

{% img /images/body/amealforme.png That could make a tasty meal... %}

Development took a couple hours, and was simple enough:

1. Have dinner.
1. Google for "Recipe API."
2. Get an API key.
3. Layout a simple page in HAML.
4. Style with SASS.
5. Wire it up to the API, and use some basic jQuery to munge the data.
6. Apply a [Google Web Font][15] and [subtle background pattern][10] to make
   things look good.
7. Apply API caching in Nginx.
8. Sleep.

To save time (and lines of code), the site is nearly 100% in-browser.  It makes
use of the wonderful [Punchfork][5] recipe API to grab data, then simply formats
the resulting recipe cleanly and simply, providing an image of the meal and a
link to instructions.

The site also makes use of [HAML][6], [SASS][7] and [CoffeeScript][8], rather
than HTML, CSS and JavaScript. This saved a significant amount of development
time, and allowed me to use third-party style mixins like [Bourbon][9]. Images
are sparse - the only .png files are the favicon, Punchfork reference, and the
background, which was graciously taken from [SubtlePatterns][10]. [Google Web
Fonts][15] also came in handy here, providing a well-suited font after roughly
60 seconds of searching.

To tie it all together are two non-browser components - a [Rakefile][11] and an
nginx config. The Rakefile allows me to easily compile the HAML, SASS and
CoffeeScript before deployment, and also fetches the required mixins (Bourbon).
It could very easily be extended to watch the files during development, making
the [feedback loop][12] much quicker.

The nginx config, on the other hand, serves two purposes: to cache queries to
the Punchfork API, and to hide my private API key. As their API is rate-limited,
I cache every query for 24 hours to make best use of the data I get. I also
hard-code my API key in the nginx config, to prevent others from reading it from
the client-side code and using it. All of this is quite simple to do with the
proxy_pass and proxy_cache directives:

{% gist 2641616 %}

Although I haven't load-tested or browser-tested the site, I'm done. Its mission
was to provide an evening's worth of learning and challenge. Now, it can
hopefully help some others learn how to as well - and if nothing else, it'll
help me learn how to cook more things.

* * * 

*Note*: I've definitely made some errors in the code. If you find any, or even
just have any suggestions or comments, please do [get in touch][13].

  [1]: http://petersobot.com/howhipster
  [2]: http://fbimg.petersobot.com
  [3]: http://ninjaquote.com
  [4]: http://amealfor.me
  [5]: http://punchfork.com
  [6]: http://haml-lang.com
  [7]: http://sass-lang.com
  [8]: http://coffeescript.org
  [9]: http://thoughtbot.com/bourbon
  [10]: http://subtlepatterns.com
  [11]: https://github.com/psobot/amealforme/blob/master/Rakefile
  [12]: http://vimeo.com/36579366
  [13]: mailto:contact@petersobot.com
  [14]: http://github.com/psobot/amealforme
  [15]: http://www.google.com/webfonts
