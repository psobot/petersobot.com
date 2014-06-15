--- 
layout: post
title: The Wub Machine, Revisited
published: true
image: previews/wub2.jpg
---
[The Wub Machine][1] was a great little auto-remixer project - some audio hackery in Python to make a neat script. Unfortunately, I can probably count on one hand the number of people who *actually* downloaded the script and tried it on their own songs. So, I decided to [make it into a web app][2]. (tl;dr: [go try out the site now][3]!)&nbsp;

{% img /images/body/wub_2.png [Oh, Paul Gilbert...]%}

moreI opened up my trusty Photoshop, cranked out some multicoloured waves and set "The Wub Machine" in beautiful [Proxima Nova][4]. Then I set about the immense task of actually implementing the remixer on the web.

I'd go into the technical impressiveness of the system, and how it's brilliant and took me months to come up with... but it's really not. It's **one big hack**.

I ended up using:


 - **PHP** to serve the front-end, as well as serve the AJAX progress updates and interface with SoundCloud
 - **Python**&nbsp;to power and tie together all of the processing on the back-end
 - **[the Echo Nest Remix API][5]&nbsp;**to do the heavy lifting, audio analysis and beat detection
 - **[FFMPEG][6]** to decode &amp; encode the MP3s
 - **[Mutagen][7] and [PIL][8]**&nbsp;to rewrite the MP3's metadata, extract artwork, overlay a graphic and put it back in to the final MP3
 - **[Beanstalkd][9]&nbsp;**to queue processing jobs and&nbsp;connect PHP to Python
 - **SQLite3**&nbsp;for logging and some queue intelligence
 - **HTML5 Audio**, used for a beautiful HTML5 player (taken from the [extremely impressive Neutron Creations blog][10])
 - **Flash**&nbsp;for the fallback player on older browsers
 - **Javascript and jQuery**&nbsp;to hold&nbsp;together the *very rickety* frontend
 - **CSS3** animations, for the moving waves at the top of the page
 - **the [SoundCloud API][11]**&nbsp;for sharing tracks (without putting me at risk of nasty legal issues or pushing storage constraints)

I did have to make a couple changes to the original algorithm, though:


 - I realized that audio volume is a nonlinear curve, so I had to account for that and create a new mixing algorithm. The volume of the original track vs. the wubwubs is now almost always about 50%.
 - I went back into my dubstep template in Logic Pro and added different types of [TransitionFX][12]&nbsp;samples to the intro and the wubs - booms, splashes and such. Although I'm still not happy with certain parts of the template, it'll have to do for now. I'm not a dubstep producer - [I'm a rock/metal/electronica/jazz guy][13]. (for now!)
 - I made the algorithm as deterministic as possible. The remixer is essentially a function (depending on the analysis I get back from the Echo Nest) so if you put in the same song, you should get the exact same remix.
 - I improved the loudness calculation algorithms, fixed some stupidly-inefficient bugs, killed off a statistically-improbable-but-still-possible infinite loop, added logging, error handling, and progress indicators.

Since my blog post about the initial hack, it's taken me&nbsp;3 weeks to assemble this web front end. That said, there's probably still tons of bugs - it only accepts MP3s at the moment, and it's probably somewhat unstable. If I push it too hard, or post it to Reddit or Hacker News, my shiny new Linode will probably spontaneously combust. Be gentle!

[Go try out the Wub Machine][14], share your tracks on SoundCloud, and enjoy!

&nbsp;


  [1]: http://blog.petersobot.com/the-wub-machine
  [2]: http://the.wubmachine.com
  [3]: http://the.wubmachine.com
  [4]: http://www.ms-studio.com/FontSales/proximanova.html
  [5]: http://code.google.com/p/echo-nest-remix/
  [6]: http://www.ffmpeg.org/
  [7]: http://code.google.com/p/mutagen/
  [8]: http://www.pythonware.com/products/pil/
  [9]: http://kr.github.com/beanstalkd/
  [10]: http://neutroncreations.com/blog/building-a-custom-html5-audio-player-with-jquery/
  [11]: http://soundcloud.com/api
  [12]: http://blog.bronto-scorpio-music.com/?p=134
  [13]: http://music.petersobot.com
  [14]: http://the.wubmachine.com
