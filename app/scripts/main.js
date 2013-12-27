+function($){ "use strict";
  var Calendar={
    createNew:function(){
      var d=new Date();
      var calendar={
        today   : d.getDate(),
        weekday : d.getDay(),
        month   : d.getMonth(),
        year    : d.getFullYear()
      };
      calendar.newDate=function(day){
        var n = new Date(this.year, this.month, this.today+day);
        return {
          date    : n.getDate(),
          weekday : n.getDay(),
          month   : n.getMonth(),
          year    : n.getFullYear()
        }
      };
      calendar.showWeek=function(day){
        var wk=$("#Weekday");
        var weekday=this.weekday;
        var nDate=this.newDate;
        wk.empty();

        $([0,1,2,3,4,5,6]).each(function(){
          wk.append('<li>'+c.newDate(weekday-this)+'</li>');
        });

      };
      return calendar;
    }
  }
  var Zodiac={
    createNew:function(){
      var zodiac={};
      zodiac.init=function(){

      };
      return zodiac; 
    }
  }
  var init=function(){
    var c=Calendar.createNew();
    // console.log(c.year)
    c.showWeek();
    
  }();

}(window.Quo);