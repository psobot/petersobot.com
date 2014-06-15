---
layout: post
title: Text Knockout with Canvas
published: true
image: previews/knockout.jpg
---

Recently, I've been working on a complete visual overhaul of my own website and
blog. Instead of the huge, bold lines of my previous site (resembling my [old
resume][1]), I decided to start fresh with a much smaller, simpler, and subtler
design. After fooling around in Photoshop for a while, I came up with the
header:

![Look above.](../../images/body/newheader.png)

Rather than being *decisive* and choosing on a single colour to define the site,
I decided to let the colour of the background dictate the main colour of the
site at any given time. As my old design featured hundreds of random thumbnails
on its homepage, I opted to use those exact same thumbnails - just blown up,
blurred, and very colourful, as the randomly-chosen backdrop for each page.

To accomplish the text knockout effect in the site's header, I simply used a
transparent PNG, as it's lighter to bake in the font to a PNG than embed Proxima
Nova. However, I also wanted to knock out each `h1` and `h2` in the body of each
blog post. To do so, I turned to HTML5 canvas.

### Titles that look like this, punching out to the background!

Canvas has a number of different compositing modes that allow Photoshop-style
blending tricks, although somewhat less complex.

To reproduce Photoshop's *knockout* effect, I simply turned to the
`destination-out` compositing mode:

    ctx.globalCompositeOperation = 'destination-out'

However, it wasn't quite that simple. To allow smooth fallback for older
browsers (or even browsers like Safari that don't fully support compositing
modes) I wanted to dynamically swap each tag with a canvas tag after each page
load. To replicate the style of each tag, I turned to a very useful function I
hadn't used before: `getComputedStyle`. To get every single style on any tag, I
had to simply run:

    style = document.defaultView.getComputedStyle(this.element, "")
    //  style.paddingTop, style.paddingBottom, etc...

Thus, on `document.ready`, all I had to do was:

 - Find the computed styles of each tag to be replaced
 - Create a new `<canvas>` element with the same outer width and height
 - Apply the original styles to a new `<canvas>` element
 - Move the padding of the element to inside its 'width' (breaking the box
   model)
 - Set the compositing mode to `destination-out`
 - Draw the text on the canvas
 - Swap the original element for the new canvas

## Et voilà, it works and looks awesome. (...in some browsers.)

As always, code is on Github:

{% gist 4311375 300 %}

  [1]: http://petersobot.com/resume/
