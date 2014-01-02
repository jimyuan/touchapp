+function($){ 
  "use strict";
  var Bwing={
    createNew: function(){
      var bwing = {};
      bwing.img = $("#Bwing");

      bwing.zoom=function(){
        var img = this.img;
        img.on("zoomIn", function(){
          $(this).addClass("zoomin");
        });
      };
      return bwing;
    }
  };
  var bw=Bwing.createNew();
  bw.zoom();
}(window.Quo);