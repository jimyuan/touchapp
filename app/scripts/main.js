+function($){ 
  "use strict";

  var Calendar={
    createNew:function(){
      var d=new Date();
      var calendar={
        today   : d.getDate(),
        date    : d.getDate(),
        month   : d.getMonth(),
        year    : d.getFullYear(),
        weekday : d.getDay(),
        mName   : "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",")
      };
      //每月天数
      calendar.mLenth=function(){
        var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (((this.year % 4 === 0) && (this.year % 100 !== 0)) || (this.year % 400 === 0)){
          monthDays[1] = 29;
        }
        return monthDays;
      };
      //年、月显示
      calendar.setYM=function(y,m){
        var yContent= $("#Calendar>h2");
        yContent.html(y).append(' <small>'+(m+1)+'月</small>');
      };
      //生成周视图，默认当日所在周，可传入与当日间隔的天数，生成新的周视图
      calendar.oneWeek=function(){
        var addDay  = arguments[0] || 0;
        var newDate = new Date(this.year, this.month, this.date+addDay);
        var year    = newDate.getFullYear(), month=newDate.getMonth(), date=newDate.getDate();
        var curDay  = newDate.getDay();
        var beginDay= date-curDay, endDay = date+6-curDay;
        var wContent= $("#Weekday"), weekend;

        this.setYM(year, month);
        wContent.html("");
        for(var i=beginDay; i<=endDay; i++){
          wContent.append('<li>'+new Date(year, month, i).getDate()+'</li>');
        }
        $("#Calendar").removeClass("monthView").addClass("weekView");

        //改变当前日期为日历所在日期
        this.year   = year;
        this.month  = month;
        this.date   = date;
      };
      //生成月视图，默认当月
      calendar.oneMonth=function(){
        // var year=this.year, month=this.month;
        var addMonth= arguments[0] || 0;
        var newDate = new Date(this.year, this.month+addMonth);
        var year    = newDate.getFullYear(), month=newDate.getMonth();
        var days    = this.mLenth()[month];
        var wkStart = newDate.getDay();
        var wkLast  = wkStart-1+(days%7);
        var weeks   = (days+wkStart+6-wkLast)/7;
        var beginDay= 1-wkStart, lastDay = days+6-wkLast;
        var wContent= $("#Weekday");

        this.setYM(year, month);
        wContent.html("");
        for(var i=beginDay; i<=lastDay; i++){
          (i<1 || i>days) ? wContent.append('<li class="notCurrent">'+new Date(year, month, i).getDate()+'</li>') : wContent.append('<li>'+i+'</li>');
        }
        $("#Calendar").removeClass("weekView").addClass("monthView");

        //改变当前日期为月历所在日期
        this.year   = year;
        this.month  = month;
      };
      //Calendar视图显示方法
      calendar.show=function(){
        var c=Calendar.createNew();
        $("#Zodiac").on("tap", function(){
          c.oneWeek();
          $("#Calendar").toggleClass('in');
        });
        $("#Calendar").on("tap", function(){
          $(this).hasClass("monthView") ? c.oneWeek() : c.oneMonth();
        }).on("swipeLeft", function(){
          $(this).hasClass("monthView") ? c.oneMonth(1) : null;
          $(this).hasClass("weekView")  ? c.oneWeek(7)  : null;
        }).on("swipeRight", function(){
          $(this).hasClass("monthView") ? c.oneMonth(-1) : null;
          $(this).hasClass("weekView")  ? c.oneWeek(-7)  : null;
        });
      };
      return calendar;
    }
  };
  var Zodiac={
    createNew:function(){
      var zodiac={};
      zodiac.init=function(){

      };
      return zodiac; 
    }
  };
  var init=function(){
    $("#Zodiac,#Calendar").on("touchmove", function(e){e.preventDefault();});
    var c=Calendar.createNew();
    c.show();
  }();

}(window.Quo);