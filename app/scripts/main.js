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
      };
      makeswipe.doSwipe=function(){
        var pageNum=0;
        this.init();
        c.on("touchstart", function(e){
          curTop=parseInt(c.style("margin-top"), 10);
          startY=e.pageY;
          $(this).removeClass('T');

        }).on("touchmove",function(e){
          e.preventDefault();
          distY=e.pageY-startY;
          c.style("margin-top", curTop+distY*0.6+"px");

        }).on("touchend",function(){
          c.style("margin-top", -wh*pageNum+"px");
          $(this).addClass('T');

        }).on("swipeUp", function(e){
          if(pageNum<b.length-1){
            pageNum++;
            c.style("margin-top", -wh*pageNum+"px");
          }

        }).on("swipeDown", function(){
          if(pageNum>0){
            pageNum--;
            c.style("margin-top", -wh*pageNum+"px");
          }
        });
      };

      return makeswipe;
    }
  };

  var ms=MakeSwipe.createNew();
  ms.doSwipe();

  var MakeApply={
    createNew:function(){
      var makeapply={};
      var dealer={"北京":["北京百盛","北京华联新光百货","北京双安","北京庄胜崇光","汉光百货(原北京中友百货)"],"常州":["常州百货"],"成都":["成都王府井百货","成都王府井百货2店","成都伊势丹"],"大连":["大连麦凯乐"],"福州":["福州中城大洋"],"广州":["广州百货"],"贵阳":["贵阳国贸"],"哈尔滨":["哈尔滨远大购物中心"],"杭州":["杭州银泰百货"],"合肥":["合肥商之都"],"济南":["济南银座百货"],"昆明":["昆明百盛","昆明金格汇都店"],"南京":["南京大洋","南京金鹰百货"],"宁波":["宁波银泰百货"],"青岛":["青岛海信广场"],"上海":["上海八佰伴","上海东方商厦南东店","上海淮海百盛","上海梅龙镇伊势丹","上海徐家汇太平洋"],"深圳":["深圳茂业百货","深圳天虹商场"],"沈阳":["沈阳中兴商场","沈阳卓展"],"石家庄":["石家庄北国"],"苏州":["苏州泰华"],"太原":["太原王府井"],"天津":["天津伊势丹"],"温州":["温州开太","温州银泰"],"无锡":["无锡三阳百盛"],"武汉":["武汉广场","武汉群光"],"西安":["西安金花","西安金花 高新店"],"徐州":["徐州金鹰"],"长春":["长春欧亚","长春卓展"],"长沙":["长沙平和堂"],"郑州":["郑州丹尼斯"],"重庆":["重庆世纪新都","重庆太平洋"]};
      makeapply.addr=function(){
        var s1=$("#spaForm select[name=city]"),
            s2=$("#spaForm select[name=counter]"),
            submit=$(".applyOK");
        for(var i in dealer){
          s1.append('<option value="'+i+'">'+i+'</option>');
        }
        s1.on("change", function(){
          var v=dealer[s1.val()];
          s2.html("");
          s2[0].disabled=false;
          $(v).each(function(){
            s2.append('<option value="'+this+'">'+this+'</option>');
          });
        });
        submit.on("tap", function(e){
          e.preventDefault();
          var url="../m/apply.ashx",
              param={city:s1.val(), counter:s2.val()};
          $.post(url, param, function(data){
            if(data.result==="failed"){
              return false;
            }
            else{
              // alert(data.message);
              window.location.href=data.message;
            }
          },"json");
        });
      };
      return makeapply;
    }
  };
  var apy=MakeApply.createNew();
  apy.addr();
}(window.Quo);