--- 
layout: post
title: A Use for Smartphone Photos
published: true
image: previews/frontpage.jpg
---

As a smartphone user, I take a lot of photos. Since I bought an iPhone 4 nearly
two years ago, I've taken just over 6,000 photos with it. 47GB of memories. On
average, 10 photos per day, every day, often of nothing in particular.

These photos aren't good enough, or meaningful enough to anyone else, to post
on Flickr. [500px][1] would scoff at them. The few people on Facebook that would
recognize the people, places and events in the photos wouldn't see the point.
They're tiny fragments of my life, and that's about it.

{% img /images/body/homepage_example.jpg My homepage, when this was written. %}

Instead of forcing these thousands of photos to stay hidden in my iPhoto
library, I found an outlet for them - my homepage. Crudely modelled after the
stellar [TED.com][2] landing page, it's supplied by a random set of hundreds of
images, all of which I've taken, and until now, hand-cropped and hand-selected.

[Michael Macias][5], in [a submission][6] to a [Codebrawl][7] last November, came up
with a brilliantly simple method of content-aware image cropping. By measuring
the greyscale entropy of a window as it slides over an image, the
highest-interest thumbnail can be determined automatically. I took this solution,
modified it (faster, uses ImageMagick, etc.), and hacked together a quick Ruby
script.

{% gist 2440571 %}

This script automatically chooses 50 random images from a given path (or shell
glob) and crops them to their most "interesting" thumbnails. The thumbnails are
scaled to size, and saved in incrementing order in the destination folder. It's
highly optimized for my personal workflow, but it does seem to work quite
well. For example, take the following shot of [Zameer Manji][8]:

{% img /images/body/crop_zam.jpg [That's Zameer. Yup.] %}

The original photo was poorly exposed, had no clear subject, and was, well,
*weird*. After automatically cropping it down to a tiny thumbnail, it fits in
nicely on my homepage as an artsy shot of a bike rack in the daylight.

Only one thing left to do: take more photos.

  [1]: http://500px.com
  [2]: http://ted.com
  [3]: http://posterous.com
  [4]: http://octopress.org
  [5]: https://github.com/zaeleus
  [6]: https://gist.github.com/a54cd41137b678935c91
  [7]: http://codebrawl.com/contests/content-aware-image-cropping-with-chunkypng
  [8]: http://zameermanji.com
