+function($){ "use strict";
  $(".rightNow").on("tap", function(e) {
    _gaq.push(['_trackEvent', 'Page', 'click', '立即购买']);
  });

  $(".goApply").on("tap", function(e) {
    e.preventDefault();
    var _href = $(this).attr("href");
    _gaq.push(['_trackEvent', 'Page', 'click', '申领试用']);
    window.setTimeout(function(){
      window.location.href = _href;
    },200);
  });
  
  $(".applyOK").on("tap", function(e) {
    _gaq.push(['_trackEvent', 'Page', 'click', '确认申领']);
  });

  $(".distImg").on("hold", function(e) {
    _gaq.push(['_trackEvent', 'Page', 'click', '保存图片']);
  });
}(window.Quo);