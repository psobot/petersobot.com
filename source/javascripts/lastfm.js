var lastfmdata = {  //  Do this through custom proxy instead, private API key.
      /*method: 'user.getrecenttracks',
      user: 'killercanuck',
      api_key: 'key_goes_here',
      limit: 1,
      format: 'json'*/
    }

function ISODateString(t) {
    d = new Date(t);
    function pad(n) { return n < 10 ? '0'+n : n; }
    return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+'T'
    + pad(d.getUTCHours())+':'
    + pad(d.getUTCMinutes())+':'
    + pad(d.getUTCSeconds())+'Z'
}

jQuery(document).ready(function(){
  lastfmtarget = jQuery("#lastfmtrack")
  if (lastfmtarget.length) {
      lastfmtarget.fadeIn();
      function error() {
          lastfmtarget.fadeOut(function(){
            lastfmtarget.html(
              "<span class='error'>Last.fm's not responding. Insert a good song here.</span>"
            );
            lastfmtarget.fadeIn();
          });
          jQuery("#lastfm").fadeOut(function(){
            jQuery("#lastfmtrack").css("background-image", "url(/images/music.png)");
            jQuery(this).fadeIn();
          });
      }
      jQuery.ajax({
        url: (!lastfmdata.api_key
                ? "http://petersobot.com/latestsong.json"
                : "http://ws.audioscrobbler.com/2.0/?callback=?"),
        method: 'get',
        data: lastfmdata,
        dataType: (!lastfmdata.api_key ? 'json' : 'jsonp'),
        timeout: 4000,
        success: function(data){
          if(data === false || data.error){
            error();
            return;
          }
          if (jQuery.isArray(data.recenttracks.track)) song = data.recenttracks.track[0];
          else song = data.recenttracks.track;

          date = "listening now";
          if(song.date) {
            date = "<time class='timeago' datetime='"+
                  ISODateString(song.date['uts']*1000)+
                  "'>"+song.date['#text']+"</time>";
          }

          pic = song.image[1]['#text'];

          r = "";
          if(pic != "")
            r += "<style type=\"text/css\">#lastfmtrack{background-image: url("+pic+")}</style>";
          else
            r += "<style type=\"text/css\">#lastfmtrack{background-image: url(/images/music.png)}</style>";
          r += "<a href=\""+song.url+"\">"+song.name+"</a><br />by "+song.artist['#text']+
                "<div id=\"lastfmtime\">"+date+"</div>";

          lastfmtarget.fadeOut(function(){
            lastfmtarget.html(r);
            jQuery("time.timeago", lastfmtarget).timeago();
            lastfmtarget.fadeIn();
          });
        },
        error: function(xhr, options, err){
          error()
        }
      });
  }
});


