+function($){ 
  "use strict";
  var Lunar={
    createNew:function(){
      var lunar={
        lunarInfo : [0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0],
        tinfo  : [0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758],
        zodiac : ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
        gan    : ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],
        zhi    : ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],
        slr    : ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
      };

      //=== 返回天干地支 eg: 0=甲子, 23=丁亥
      lunar.cyclical=function(n){
        return (this.gan[n%10]+this.zhi[n%12]);
      };

      //=== 返回传入年份农历总天数
      lunar.countDays=function(y){
        var i, sum = 348;
        for(i=0x8000; i>0x8; i>>=1) {
          sum += (this.lunarInfo[y-1900] & i)? 1: 0;
        }
        return(sum+this.leapDays(y));
      };

      //=== 返回农历y年闰月的天数
      lunar.leapDays=function(y){
        if(this.leapMonth(y)) {
          return((this.lunarInfo[y-1900] & 0x10000)? 30: 29);
        }
        else return 0;
      };

      //=== 返回农历y年闰哪个月 1-12, 没闰传回 0
      lunar.leapMonth=function(y) { 
        return(this.lunarInfo[y-1900] & 0xf);
      };

      //=== 返回农历y年m月的总天数
      lunar.monthDays=function(y,m) {
        return((this.lunarInfo[y-1900] & (0x10000>>m))? 30: 29);
      };

      //=== 返回当天节气，没有则返回空值
      lunar.solarTerm=function(objDate){
        var now= objDate;
        var SY = now.getFullYear(), SM = now.getMonth(), SD = now.getDate();
        var t1 = new Date((31556925974.7*(SY-1900)+this.tinfo[SM*2+1]*60000)+Date.UTC(1900,0,6,2,5));
        var t2 = t1.getUTCDate();
        var term;
        (t2===SD) ? term = this.slr[SM*2+1] : t2;
        t1 = new Date((31556925974.7*(SY-1900)+this.tinfo[SM*2]*60000)+Date.UTC(1900,0,6,2,5))
        t2= t1.getUTCDate()
        if (t2===SD) {
          term = this.slr[SM*2];
        }
        return term || "";
      };

      //=== 农历核心方法,根据传入阳历，返回阴历lc对象
      //=== lc属性：year, month, day, yearcyl, moncyl, daycyl, isleap
      lunar.core=function(objDate){
        var i, leap = 0, temp = 0, lc={}, basedate = new Date(1900,0,31);
        var offset  = (objDate - basedate)/86400000;

        lc.daycyl = offset + 40; 
        lc.moncyl = 14;

        for(i=1900; i<2050 && offset>0; i++) {
          temp = this.countDays(i);
          offset -= temp;
          lc.moncyl += 12;
        }

        if(offset<0) {
          offset += temp;
          i--;
          lc.moncyl -= 12;
        }

        lc.year = i;
        lc.yearcyl = i-1864;

        leap = this.leapMonth(i); //闰哪个月
        lc.isleap = false;

        for(i=1; i<13 && offset>0; i++) {   
          //闰月
          if(leap>0 && i===(leap+1) && lc.isleap===false) {
            --i;
            lc.isleap = true;
            temp = this.leapDays(lc.year);
          }
          else {
            temp = this.monthDays(lc.year, i);
          }
          //解除闰月
          if(lc.isleap===true && i===(leap+1)) {
            lc.isleap = false;
          }
          offset -= temp;
          if(lc.isleap === false) {
            lc.moncyl ++;
          }
        }    
        if(offset===0 && leap>0 && i===leap+1){
          if(lc.isleap){
            lc.isleap = false;
          }
          else {
            lc.isleap = true;
            --i;
            --lc.moncyl;
          }
        }
        if(offset<0){
          offset += temp;
          --i;
          --lc.moncyl;
        }
        lc.month = i;
        lc.day = Math.floor(offset + 1);
        return lc;
      };

      //=== 根据传入月日返回农历值
      lunar.lunarDay=function(m, d){      
        var nstr1 = ['日','一','二','三','四','五','六','七','八','九','十'];
        var nstr2 = ['初','十','廿','卅','　'];      
        var mon="", day="", ld;

        //农历月份定制显示
        (m>10) ? (mon = '十'+nstr1[m-10]+"月") : (mon = nstr1[m]+"月");
        (mon==="一月")   ? (mon = "正月") : mon;
        (mon==="十二月") ? (mon = "腊月") : mon;

        //农历日期定制显示
        switch (ld) {      
          case 10 :
            day = '初十'; break;
          case 20 :
            day = '二十'; break;
          case 30 :
            day = '三十'; break;
          default :
            day = nstr2[Math.floor(d/10)] + nstr1[d%10];
        }
        return [mon, day];
      };

      lunar.solar2lunar=function(sdobj){
        var now= sdobj;
        var SY = now.getFullYear(), SM = now.getMonth(), SD = now.getDate();
        var lc = this.core(sdobj);
        var tt = this.lunarDay(lc.month,lc.day);      //农历月日
        var gz = this.cyclical(lc.yearcyl%60)+"年";   //天干地支
        var sx = "生肖："+this.zodiac[lc.yearcyl%12];  //农历生肖

        document.body.innerHTML=SY+"年"+(SM+1)+"月"+SD+"日 农历"+tt[0]+tt[1]+" "+gz+" "+sx;
      };

      return lunar;
    }
  };
  var l=Lunar.createNew();
  l.solar2lunar(new Date(2014,0,31));
  console.log(l.solarTerm(new Date(2014,9,23)))
}(window.Quo);