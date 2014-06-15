--- 
layout: post
title: Rewriting in C++ for Fun, Speed and Masochism
published: true
image: previews/fireworks.jpg
---

A couple months ago, I posted [a blog post explaining my use for low-quality
smartphone photos][1]. It involved a smart image cropping algorithm written by
[Michael Macias][2], using ImageMagick and written in Ruby. I've actually used
the algorithm quite a bit in preparing new photos for my homepage - although
there's one major problem - it's amazingly slow. Take a look at the kind of processing it does:

![The most interesting part of Grand Central Station.](../../images/body/crop_01.jpg)

On large JPEGs from my own photo library, like the one above, this Ruby script takes roughly 2 seconds to perform a smart 124px square crop on the most interesting part of the
image:

    Matched 9 images.
    Originals/2012/NYC/IMG_7054.JPG => ./18.jpg in 1801.717ms
    Originals/2012/NYC/IMG_7055.JPG => ./19.jpg in 1856.692ms
    Originals/2012/NYC/IMG_7052.JPG => ./20.jpg in 1787.717ms
    Originals/2012/NYC/IMG_7059.JPG => ./21.jpg in 1727.487ms
    Originals/2012/NYC/IMG_7057.JPG => ./22.jpg in 1716.977ms
    Originals/2012/NYC/IMG_7056.JPG => ./23.jpg in 1692.648ms
    Originals/2012/NYC/IMG_7058.JPG => ./24.jpg in 1887.043ms
    Originals/2012/NYC/IMG_7051.JPG => ./25.jpg in 1977.311ms

As I often run this algorithm on entire folders of images at once, I decided to
experiment and reimplement the entire program in C++. As a developer that works
primarily with Python and Ruby, I've always felt a small amount of guilt for
incurring the crazy performance overhead of interpreted and heavily dynamic
languages. (A friend of mine working in the hardware industry recently got
*angry* over the fact that he was working to make chips faster, while us
developers then "throw away" the speed gains by running interpreted languages!)

Trying libjpeg
---

While the original Ruby script took maybe 2 hours to write, [my straight port to C++][6] took more than 10! Most of this time was spent navigating the API of
`libjpeg`, fumbling with pointers and buffer arithmetic, and hunting down type
casting errors that subtly caused inaccurate results. However, check out the speed gains:

    Thumbnailing 9 images...
    Processing Originals/2012/NYC/IMG_7051.JPG... 63ms.
    Processing Originals/2012/NYC/IMG_7052.JPG... 41ms.
    Processing Originals/2012/NYC/IMG_7053.JPG... 5ms.
    Processing Originals/2012/NYC/IMG_7054.JPG... 33ms.
    Processing Originals/2012/NYC/IMG_7055.JPG... 36ms.
    Processing Originals/2012/NYC/IMG_7056.JPG... 31ms.
    Processing Originals/2012/NYC/IMG_7057.JPG... 35ms.
    Processing Originals/2012/NYC/IMG_7058.JPG... 30ms.
    Processing Originals/2012/NYC/IMG_7059.JPG... 34ms.

The same
sample images that took ~2 seconds to process in Ruby take, on average, 35ms to process in
C++. That's a speed up of **more than 50x**. This happens to line up roughly
with [the popular language benchmarks][3] that put Ruby at ~45x slower than
gcc-compiled C++, despite the fact that a lot of the work is done by RMagick. (I should point out that these programs are not exactly identical - the `libjpeg` version makes some small feature concessions in the name of speed. Their output is nearly identical, however.)

![The most interesting part of… somewhere in NYC.](../../images/body/crop_02.jpg)

What's also interesting is the cost in developer time and code quantity. The
original Ruby script was ~80 lines, give or take comments - while my C++ port is
~350 lines. In this one isolated, little-optimized, amateur test, C++ took **4x** the
code and **5x** the development time to deliver **50x** the performance.

Trying Magick++
---

However, this joyous speed boost was short-lived. I soon discovered that my `libjpeg`-based solution was quite buggy. Most cameras nowadays don't rotate the raw image from the sensor before encoding to JPEG, preferring a lossless "orientation" flag in the EXIF data instead, forcing the decoding library to parse this to display the image upright. Unfortunately, `libjpeg` doesn't contain any built-in facilities to "right" an image with such a tag, and doing so manually is extremely difficult. In addition, I hadn't written any custom image scaling code, so I depended on a `libjpeg` flag to scale down the input image by a power of two before decoding.

Faced with this insurmountable rotation bug, and after spending another 8 hours trying to fix it, I decided to [yet again rewrite the solution][7] using [Magick++][4], ImageMagick's C++ client library. Without further ado, the benchmarks:

    Thumbnailing 9 images...
    Processing Originals/2012/NYC/IMG_7051.JPG... 340.717ms.
    Processing Originals/2012/NYC/IMG_7052.JPG... 287.965ms.
    Processing Originals/2012/NYC/IMG_7053.JPG... 94.133ms.
    Processing Originals/2012/NYC/IMG_7054.JPG... 279.776ms.
    Processing Originals/2012/NYC/IMG_7055.JPG... 286.434ms.
    Processing Originals/2012/NYC/IMG_7056.JPG... 281.245ms.
    Processing Originals/2012/NYC/IMG_7057.JPG... 289.052ms.
    Processing Originals/2012/NYC/IMG_7058.JPG... 280.193ms.
    Processing Originals/2012/NYC/IMG_7059.JPG... 283.7ms.
    
For numerous reasons here (Magick++ overhead, image pre-scaling, orientation correction) the Magick++-using code falls right in the middle in terms of performance. It's **~8 times slower** than using `libjpeg` directly, but much more correct and still **more than 5 times as fast** as the equivalent Ruby code.

![The most interesting part of fireworks at English Bay in Vancouver.](../../images/body/crop_04.jpg)

This final version of the program took about 2 hours to put together, with most of that time spent searching for auto-orientation code (eventually pulling it out of Magick's [Mogrify][5] command-line tool) and optimizing for speed.

The Value of Abstractions
---

When given the right amount of abstraction - in this case, a fast C++ library - writing the code to be adequately fast was trivial. Using old-school C-style library integration, on the other hand, ended with me wasting hours making little to no progress. The resulting program was indeed much faster, but questionably worth the time and frustration. (My head still hurts from getting `improper call to jpeg library in state xyz` errors repeatedly, only to find zero helpful documentation on each error state.) Using a low-level library simply requires *more* knowledge and more mental state than any commonly used high-level language. (Of course, this sounds obvious.)

This brings up an important point on the state of popular (and slow) languages today. When acceptable speeds are measured in seconds rather than in milliseconds, it makes perfect sense to write slow and inefficient code quickly. Every time a Rubyist runs `gem install`, they're abstracting away the low level implementation details in favour of a simple interface that helps them solve their problem faster. Amortizing the cost of running the program over its runtime, rather than its development time, is logical considering the absurdly high price of a professional software developer.

  [1]: /blog/a-use-for-smartphone-photos/
  [2]: https://github.com/zaeleus
  [3]: http://shootout.alioth.debian.org/u32q/benchmark.php?test=all&lang=yarv&lang2=gpp
  [4]: http://www.imagemagick.org/Magick++/
  [5]: http://www.imagemagick.org/script/mogrify.php
  [6]: https://github.com/psobot/smartcrop/blob/master/fastcrop.cpp
  [7]: https://github.com/psobot/smartcrop/blob/master/smartcrop.cpp
