+function($){ "use strict";
  var MakeSwipe={
    createNew: function(){
      var makeswipe={
        b   :  $("section"),      //滑动页
        w   :  $("#wrap"),        //定长容器
        c   :  $("#wrapContent"), //滑动页包裹
        swp :  0                  //滑动页次
      };
      makeswipe.init=function(){
        this.b.style("height", window.innerHeight+"px");
        this.w.style("height", this.b.height()+"px");
        this.c.style("height", this.b.height()*this.b.length+"px");
      }
      makeswipe.doSwipe=function(){
        var c=this.c;
        this.init();
        c.on("swiping", function(e){
          c.style("margin-top", e.currentTouch.y+"px");
        }).on("swipeUp", function(e){
          console.log(e);
        });
      }

      return makeswipe;
    }
  };

  var ms=MakeSwipe.createNew();
  ms.doSwipe();
  /*b.style("height", window.innerHeight+"px");
  w.style("height", b.height()+"px");
  c.style("height", b.height()*l+"px");

  c.on("swipeUp", function(e){
    console.log(e.type);
  })*/

}(window.Quo);