define(function(){
  var floater = {
    head: $("#headNav"),
    scroll: $(window),
    done:false,

    float:function(){
      var self = this;
      this.scroll.scroll(function(){
       var headH=self.scroll.scrollTop();
       if(headH>=40){
           if(!self.down){
             self.down =true;
             self.head.addClass('n_down');
           }
        }else{
           if(self.down){
            self.down = false;
            self.head.removeClass('n_down');
           }
        }
      });
    }
  }
  return floater;
});