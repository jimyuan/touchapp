+function($){ "use strict";
  var MakeSwipe={
    createNew: function(){
      var makeswipe={};

      var wh=window.innerHeight,//滑动单位长度
          b =  $("section"),      //滑动页
          w =  $("#wrap"),        //定长容器
          c =  $("#wrapContent"), //滑动页包裹
          curTop, 
          distY, startY;
      makeswipe.init=function(){
        b.style("height", wh+"px");
        w.style("height", wh+"px");
        c.style("height", wh*b.length+"px");
      }
      makeswipe.doSwipe=function(){
        var pageNum=0;
        this.init();
        c.on("touchstart", function(e){
          curTop=parseInt(c.style("margin-top"), 10);
          startY=e.pageY;
          // console.log(startY)
          $(this).removeClass('T');

        }).on("touchmove",function(e){
          distY=startY-e.pageY;
          console.log(distY)
          c.style("margin-top", curTop+distY*0.6+"px");

        }).on("touchend",function(){
          c.style("margin-top", -wh*pageNum+"px");
          $(this).addClass('T')

        }).on("swipeUp", function(e){
          if(pageNum<b.length-1){
            pageNum++;
            c.style("margin-top", -wh*pageNum+"px")
          }

        }).on("swipeDown", function(){
          if(pageNum>0){
            pageNum--;
            c.style("margin-top", -wh*pageNum+"px");
          }
        })
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