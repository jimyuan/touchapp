+function($){ "use strict";
  var Gravity={
    createNew:function(){
      var gravity={};
      gravity.start=function(){
        // var x1=0,y1=x1,x2=x1,y2=x1;
        var distX, distY, faceUp=-1;
        if(window.DeviceMotionEvent !== undefined){
          $(window).on("devicemotion", function(e){
            distX = e.accelerationIncludingGravity.x;
            distY = e.accelerationIncludingGravity.y;
            if (e.accelerationIncludingGravity.z > 0) { 
              faceUp = +1; 
            }
            distX=Math.round(distX/9.8*-90);
            distY=Math.round((distY+9.8)/9.8*90*faceUp);
           var rotation = "rotate(" + distX + "deg) rotate3d(1,0,0, " + (distY) + "deg)";
            document.getElementById("no1").style.webkitTransform = rotation;  
          });

          /*window.setInterval(function(){
            var no1=$("#no1")[0];
            no1.style.top=100+distX*10+"px";
            no1.style.left=60+distY*10+"px";
            console.log(distX, distY);
          }, 50);*/
        }
        else{
          console.log("破浏览器，滚！");
        }
      };
      return gravity;
    }
  };
  var g=Gravity.createNew();
  g.start();
}(window.Quo);