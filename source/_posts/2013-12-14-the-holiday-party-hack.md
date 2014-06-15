--- 
layout: post
title: The Holiday Party Hack
published: true
image: previews/holiday.jpg

---

For this year's holiday party at [The Working Group](http://twg.ca), I helped build something special to spice up the party - a live, music-synced slideshow of the evening, powered by a nearby photo booth. Take a photo with your friends and loved ones, then see it show up on the big screen seconds later.

[![photobooth.jpg](https://d23f6h5jpj26xu.cloudfront.net/bvipn7c3djtktg_small.jpg)](http://img.svbtle.com/bvipn7c3djtktg.jpg)

The Hardware
---

To take the photos, we mounted a [Canon Rebel T2i](http://www.amazon.com/Canon-T2i-Processor-3-0-inch-18-55mm/dp/B0035FZJHQ) with an [Eye-Fi card](www.eye.fi) on a tripod in front of a great backdrop. A generous serving of props was provided for people to play with, and the room was well lit. 

Also significant - the photo booth had a glass wall on one side, making it easy for partygoers to notice the fun to be had inside, while still allowing for a little bit of separation from the cacophony outside.

[![outside.jpg](https://d23f6h5jpj26xu.cloudfront.net/b2is9svrpny0g_small.jpg)](http://img.svbtle.com/b2is9svrpny0g.jpg)

Finally, to allow partygoers to trigger their photos themselves without needing someone behind the camera, [Brian Gilham](http://twitter.com/bgilham) and I built a huge, industrial-looking remote with a massive green button. In reality, we just wrapped the camera's tiny remote in a larger enclosure and physically lined up the remote's button with the plunger of a larger button.

[![button.jpg](https://d23f6h5jpj26xu.cloudfront.net/r6tn2fqjxhwehq_small.jpg)](http://img.svbtle.com/r6tn2fqjxhwehq.jpg)

The Eye-Fi card in the camera synced its photos automatically with a nearby Macbook Pro.

The Software
---

To get the photos on the screen, a ridiculous number of steps were used. [Hazel](http://www.noodlesoft.com/hazel.php), running on the Macbook Pro, copied the photos from the Eye-Fi card's folder into a dedicated folder in Dropbox. A Node.js app running on a Rackspace cloud server connected to the Dropbox API and received real-time updates whenever new photos were placed in the Dropbox folder. This app downloaded the high-res photos from Dropbox, used [Imagemagick](http://www.imagemagick.org/script/index.php) to crop, scale, and rotate them appropriately, and streamed them down to all connected browsers.

A Macbook Pro connected to the projector ran a client-side JavaScript app and received real-time photo updates via [Socket.io](http://socket.io). This app also used the Web Audio API to run [BeatDetektor](https://github.com/cjcliffe/beatdetektor/tree/master), an open source JS beat detection library, on the audio received by the laptop's microphone. Finally, [Scott Schiller](http://www.schillmania.com/)'s 2003-era [snowstorm.js](http://www.schillmania.com/projects/snowstorm/) library provided the wonderfully tacky snow falling in-browser.

This complicated chain of events made it super simple to build the software - by piecing together pre-made components like Dropbox, Hazel, and BeatDetektor, most of the work was already done. Some extra functionality even came for free - for example, by sharing the Dropbox folder with select people at the party, candid photos could be uploaded from people's phones directly to the projector screen.

The Results
---

By the end of the night, more than 350 photos - 1.5GB of data - had been processed by the hack and made it to the big screen. At one point, so many photos were taken in quick succession that the server load spiked to 38 and crashed hard - bringing with it [forever.fm](http://forever.fm), my "infinite" radio station. Despite the small technical hiccups, the hack turned out wonderfully and was a huge success.

<p></p>
---
<p></p>

Huge thanks go out to [Chris Mudiappahpillai](https://twitter.com/mud), [Brian Gilham](https://twitter.com/bgilham), [Derek Watson](https://twitter.com/dcwca) and [Shiera Aryev](https://twitter.com/saryev) and many more for making the hack - and the evening - a resounding success.