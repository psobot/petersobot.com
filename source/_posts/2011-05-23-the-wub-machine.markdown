--- 
layout: post
title: The Wub Machine
published: true
image: previews/wub.jpg
---
**UPDATE:**&nbsp;I turned the Wub Machine into a website. Go and&nbsp;[remix your own tracks!][1]

**I like dubstep.**

There, I said it!

{% youtube LaIZ0mUJzr0 %}

That massive bassline, two-step beat and killer rhythm has some odd allure that I can't resist - and I'm typically a fan of rock, metal and prog!

I'm also a huge fan of the Echo Nest and their brilliant [Remix API][2]. In their words, the Remix API is an "internet synthesizer" - quite true. I can send off an mp3, and get back extremely detailed beat, timbre and pitch information within seconds. Some people have already used this to [make any song swing][3], [put a donk on any song][4], and much, much more.

For the first [SE Hack Day][5], I decided to use the Remix API to **automagically add dubstep** to any song.

{% soundcloud playlists 805784 %}

Now, as you may be able to tell from the samples above, this isn't quite ready yet. In fact, it's extremely rough. Even the code looks horrifically ugly. (And yes, you can download it, fork it, and edit it freely - [it's open sourced on GitHub][8].) I have a lot of work left to make the results sound passable.

Technically, I'm not really doing anything too complicated:

 - I used Logic Pro and Native Instruments' new [Reaktor][9] synth to make some dirty, dirty wub basslines at the proper dubstep tempo (140 bpm) and mangled my own kick and snare samples. I then rendered 8 bars of this pattern, in two different variants, in every key of one octave.
 - Using Python and the Echo Nest Remix API, I get an analysis of each track's bars, beats, pitches, timbres and more. I still need to make some better use of this information, as right now, a lot of songs end up being detected and used improperly. (an 8th or 16th note off, ruining the beat)
 - Using the Echo Nest Remix API's Dirac time-stretching abilities, I take the input song, bar-by-bar, and alter the tempo to be exactly 140bpm. Then, for each "section" of the song (as defined by, again, the API's analysis) I do 16 bars of dubstep with a repeating 8-bar pattern of either beats, bars or tatums (notes) from the original song.
 - For the dubstep backing, I take whatever key the API tells me the song is in, and just choose the corresponding backing file from the ones I've prerendered.
 - For the intro, I have a pre-rendered intro with some noise sweeps. I then use a bit of brute-force audio manipulation to play a build-up pattern before the initial "drop" after 8 bars.

I'm taking a ton of suggestions on how to improve the script - adding variables for time till drop, allowing overrides if the API mis-identifies the key or tempo, and allowing a different choice of beat, bar or tatum for sampling the original song. There's obviously tons of work left to do, and I plan to improve it whenever I get the chance.

Let me know what you think below in the comments, leave some suggestions, and check out [the code on GitHub][10] if you're interested!

**UPDATE:** I built a web interface and a very nice-looking site around the basic algorithm. Go and [remix your own tracks!][11]

&nbsp;

P.S: When I said I like dubstep, I meant I *really do* like dubstep. When I'm not [making my own music][12], I also enjoy drumming to dubstep:

{% youtube vts0-CXmiK8 %}

  [1]: http://the.wubmachine.com
  [2]: http://code.google.com/p/echo-nest-remix/
  [3]: http://musicmachinery.com/2010/05/21/the-swinger/
  [4]: http://www.donkdj.com/
  [5]: http://www.sehackday.com/
  [6]: http://soundcloud.com/peter-sobot/sets/the-wub-machine
  [7]: http://soundcloud.com/peter-sobot
  [8]: https://github.com/psobot/wub-machine
  [9]: http://www.native-instruments.com/en/products/producer/powered-by-reaktor/razor/
  [10]: https://github.com/psobot/wub-machine
  [11]: http://the.wubmachine.com
  [12]: http://music.petersobot.com
