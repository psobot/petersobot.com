--- 
layout: post
title: Macbook & Two Hard Drives
published: true
image: previews/hdd.jpg
---
I have a lot of media on my laptop. Roughly 140GB of music, 40GB of photos, 40GB of games, video and other random stuff on my internal drive alone.

{% img /images/body/media.png [That's my media folder, yup.]%}

Like any computer user, or lazy person, I suppose, I hate to wait. I want a faster internal drive.&nbsp;Of course, SSDs are the answer. They're also ridiculously expensive for the drive size I want. The simple solution: replace my Macbook's internal DVD drive with a second hard drive.

I foolishly missed an amazing deal on an SSD from Newegg.ca, so I went and bought an 80GB Intel X25-M from Future Shop instead. I then checked out eBay and bought a $20 hard drive "enclosure" of sorts. All I really needed was the proper connector, to bridge proper SATA to the odd variant of SATA (mini-SATA?) that the Macbook and most other laptops use internally for drive connections. I could have bought a cheap $1 connector for this, but the included enclosure holds the drive securely and prevents... bad things from happening. I think. (and hope.) Note: the adapter didn't come with the little ribbon cable you see on top in the photo. That was from the previous DVD drive in the Macbook.

{% img /images/body/ssd.jpeg [And that's my SSD!]%}

The adapter I found fits tightly into the space that the old DVD drive took up, and is missing one screw at the back unfortunately. A bit of an odd fit, but with the case on, everything is snug and nothing is under stress. (I don't think so, at least...)

Now, onto the software and speed aspect.

With two drives, even without an SSD, you can easily partition my system files and media. In preparation for my purchase of the SSD, I had moved all of my music, photos and movies and other large files to my secondary (non-boot) drive, and linked them all from their locations. To identify some of the largest files on my hard drive that I wanted to move, I used the wonderful Mac app [GrandPerspective][1].

{% img /images/body/grand.png [And that's my data layout!]%}

I basically moved all of the large blobs that stand out to my second drive, in an effort to cut down on the media and other large files that I don't really use all that often. For example, that huge orange blob in the top right of this screenshot is my iPhoto library. All of the tiny files at left happen to be my iTunes library, but that also got moved.

I tried using Finder's aliases to keep file links from my home folder to my new drive, but a lot of software doesn't follow them properly, for some odd reason. I then turned to the good old Terminal, and ran the **ln **command for every folder I wanted to relocate. After moving, say, ~/Music to my secondary drive and deleting the original, I would run:

 **ln -s /Volumes/Fry\ HD/Music ~/Music**

Now, most of this is unnecessary - I could have just as easily gone into iTunes, gone to Preferences &gt; Advanced &gt; Media Folder Location and changed it from there, but I wanted to keep things as consistent as possible.&nbsp;A handful of other programs though, like Steam, or some music software, have huge files that you can't just change a preference for. I ended up having to go through my /Library/Application Support and /Library/Audio folders to move over all of the huge sample packs I use. If you're not sure about the syntax of the **ln** command, it's pretty simple:

 **ln -s /absolute/path/to/new/location /old/location**

In experimenting with all of this, I opened iTunes several times to be faced with an empty library. The urge to panic in that situation is hard to resist, but the files are just misplaced somewhere on the drive, and it's easy to relocate them or link them for iTunes to find again.

A couple caveats of this solution:


 - My Time Machine backups had to be completely redone. The system didn't notice that the files I moved were the same files and folder structure but in different places. Time Machine proceeded to take an absurd amount of time to backup about 300GB of content all over again. Not a big deal, but some old backups were pushed off of the backup drive.
 - Little Snitch (an awesome firewall utility) forgot all of its preferences. That seems to happen whenever I swap drives...
 - I had to mess around with the **pmset**&nbsp;command to get some better battery life. The Intel SSD uses next to no power when running, so I configured my power settings to sleep the regular hard drive after only one minute of inactivity when running on battery. That way, I get an extra half hour or so of battery life at least.
 - As I set the hard drive to sleep after one minute, if I'm working solely off of the SSD, I have to wait a couple seconds for the regular drive to spin up if I open iTunes or try to access files on it. A worthwhile tradeoff, in my opinion.

After running this setup for a couple days so far, everything looks great. I'm sure it helps that my secondary drive is already a Seagate Momentus Hybrid drive (with 4GB of SSD-like cache) but everything is ridiculously fast. Apps are up and running from the dock before they have the chance to bounce once. Booting the machine, which I don't do often anyways, is down to about 5 seconds. The slowest part of the boot process is waiting for my secondary drive to spin up. I decided to force verbose boot all the time (by running&nbsp;**sudo nvram boot-args="-v"**) to see exactly how fast the system was booting, and it's ridiculous.

Of course, I can't read DVDs now. Oh well, big deal...

**Please note: if you're going to try this,**

**BACK EVERYTHING UP FIRST.**

**I AM NOT AT ALL LIABLE IF YOU SCREW UP YOUR LAPTOP OR LOSE DATA.**

**TL;DR:** SSDs are fast. I put one in my Macbook in place of the CD drive. Awesomeness ensued.


  [1]: http://grandperspectiv.sourceforge.net/
