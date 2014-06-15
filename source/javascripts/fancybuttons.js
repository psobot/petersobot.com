jQuery(document).ready(function(){
  jQuery(document).on('pjax:beforeSend', function(e) {
    jQuery('.active').removeClass('active');
  });
  jQuery(document).on('pjax:complete', function(e) {
    jQuery(e.relatedTarget).addClass('active');
  });
});
