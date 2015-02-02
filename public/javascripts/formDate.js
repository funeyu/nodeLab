define(function(){
  var interval ={
    bindElments: function(elements,attr){
      this.elements = elements;
      return this;
    },
    Interval: function(){
      var self = this;
      $(this.elements).each(function(index){
        $(this).html(self.dateInterval(Date.parse($(this).attr('data-info').replace(/-/gi,"/"))));
      });
    }  
  };
  interval.dateInterval = function(time){
      var minutes, hours, days;
      time = time/1000;
      var timeNow = parseInt(new Date().getTime()/1000);
      var diff;
      d = timeNow - time;
      days = parseInt(d/86400);
      hours = parseInt(d/3600);
      minutes = parseInt(d/60);
      if(days>0 && days<30){       
        return days+"天前";       
      }
      if(days<=0 && hours>0){       
        return hours+"小时前";       
      }
      if(hours<=0 && minutes>0){       
        return minutes+"分钟前";       
      }
      if(hours<=0 && minutes<=0){
        return "刚刚";
      }else{       
        var s = new Date(time*1000);       
        // s.getFullYear()+"年";
        return (s.getMonth()+1)+"月"+s.getDate()+"日";       
      }
    }
    return interval;
});