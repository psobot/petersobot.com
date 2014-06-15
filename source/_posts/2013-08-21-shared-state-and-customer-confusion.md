--- 
layout: post
title: Shared State and Customer Confusion
published: true
image: previews/wat.png

---

tl;dr: Be very careful when declaring class-level variables in Python, and think very carefully about putting mutable state into a class-level variable. 

Let's go back to the good old days of writing web applications in **PHP** for a paragraph or two. When running PHP under Apache or nginx, every HTTP request resulted in a **clean interpreter** with completely new state. Developers had to explicitly ask for state to be shared - through the `$_SESSION` global, by persisting state on disk, or by saving state to some backing data store. This made developing applications amazingly simple. A PHP page was something like a pure function, producing consistent, predictable output based on the state of the underlying data store.

Now, consider this little bit of Python code:

    class PatternRemixer(Remixer):
        _samplecache = {}
        
        def remix(song):
            # do some stuff
            for key in song:
                if key not in self._samplecache:
                    self._samplecache[key] = self.render_audio()
                self.output(self._samplecache[key])
                
                
Any experienced Pythonista should notice the grievous error in this class - on the second line, no less. Here we have a `_samplecache` variable being initialized to an empty dictionary. While this itself is fine, what's **not** fine is the fact that this variable is being used as a mutable cache. That's because the variable is declared in the **class' scope**, making it **common to all classes**.

Consider the following bit of code:

    def remix_songs(songs):    
        song0       = PatternRemixer().remix(songs[0])
        
        #    Let's reset the cache here
        PatternRemixer._samplecache = {}
        
        song1       = PatternRemixer().remix(songs[1])
        song0_again = PatternRemixer().remix(songs[0])
        assert song0 == song0_again
       
This function will throw an `AssertionError` - `song0` is not equal to `song0_again`! Even though in the previous snippet we refer to `self._samplecache`, we're really accessing `PatternRemixer._samplecache` instead - the global variable used by all instances. Since this cache only gets cleared after using it once, our `song0_again` variable actually contains data from `songs[1]`, when it really shouldn't.

This can be quite a difficult bug to track down, as the problem only manifests itself when one Python interpreter accepts multiple requests. In a distributed system, each request might go to a different box - and possibly a different Python interpreter running on that box, making it very difficult to figure out where the stale data is coming from. Worse yet - if each interpreter is restarted after a certain number of requests, the stale data will not always show itself.

This results in confused emails from customers at all hours of the night, and is generally a Very Bad Thing™.