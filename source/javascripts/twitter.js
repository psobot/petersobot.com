jQuery(document).ready(function(){
  twittertarget = jQuery("#twitterstatus")
  if (twittertarget.length) {
      twittertarget.fadeIn();
      function error() {
          twittertarget.fadeOut(function(){
            twittertarget.html(
              "<blockquote class='tweet'><span class='error'>Twitter's not responding. Insert a witty tweet here.</span></blockquote>"
            );
            $("#twitter blockquote").css("background-image", "url(/images/profile_n.jpg)")
            twittertarget.fadeIn();
          });
      }
      jQuery.ajax({
        url: "/latest_tweet.json",
        dataType: 'json',
        timeout: 2000,
        success: function(posts){
          if(!posts){
            error();
            return;
          }

          item = null;
          for(i = 0; i < posts.length; i++){
            post = posts[i];
            if(!post.in_reply_to_user_id && !post.retweeted) {
              item = post;
              break;
            }
          }

          tweet = item.text;
          window._tweet = item;

          //  Link all appropriate entities
          for (i = 0; i < item.entities.urls.length; i++) {
            url = item.entities.urls[i];
            tweet = tweet.replace(url.url,
                                  "<a href='" + url.expanded_url + "' target='_blank'>"
                                  + url.display_url + "</a>");
          }

          for (i = 0; i < item.entities.user_mentions.length; i++) {
            user_mention = item.entities.user_mentions[i];
            tweet = tweet.replace("@" + user_mention.screen_name,
                                  "<a href='https://twitter.com/" + user_mention.screen_name + "' target='_blank'>"
                                  + "@" + user_mention.screen_name + "</a>");
          }

          if (item.entities.media) {
            for (i = 0; i < item.entities.media.length; i++) {
              media = item.entities.media[i];
              tweet = tweet.replace(media.url,
                                    "<a class='dashed' href='" + media.media_url + "' target='_blank'>"
                                    + "(open photo)</a>");
            }
          }


          date = "<time class='timeago' datetime='"+item.created_at+"'>"+item.created_at+"</time>"

          loc_name = "?";
          if(item.place && item.place.full_name) {
            if (item.place.full_name.length > 20)
              loc_name = item.place.name;
            else
              loc_name = item.place.full_name;
          }

          loc = ""
          if(item.geo)
            loc = "<a href='http://maps.google.com/?q="+
                    encodeURIComponent(item.geo.coordinates[0]+","+item.geo.coordinates[1])+
                    "' target='_blank' >"+
                    loc_name+
                    "<img src='/images/pin.png' alt='geotagged' class='geotag'></a>";

          else if(item.place)
            loc = "<a href='http://twitter.com/places/"+
                    item.place.id+
                    "' target='_blank' >"+
                    loc_name+
                    "</a>";

          t = "<blockquote class='tweet'>"+tweet+"</blockquote>";

          if(loc != "")
            t += "<div id='twittertime'>tweeted "+date+" from "+loc+"</div>"; 
          else if(item.source != "")
            t += "<div id='twittertime'>tweeted "+date+" from "+item.source+"</div>";
          else
            t += "<div id='twittertime'>tweeted "+date+"</div>";

          twittertarget.fadeOut(function(){
            twittertarget.html(t);
            jQuery("time.timeago", twittertarget).timeago();
            twittertarget.fadeIn();
          });
          jQuery("#twitter").fadeOut(function(){
            $("#twitter blockquote").css("background-image", "url(/images/profile_n.jpg)")
            $(this).fadeIn();
          });
        },
        error: function(xhr, options, err){
          error()
        }
      });
  }
});
