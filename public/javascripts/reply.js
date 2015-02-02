define(function(){
	var reply= function(State){
		$('.response li i').click(function(){
          if(State.getLogin()){
              var floor = $(this).parent().parent().parent(). attr("id");
  	          floor = floor.match(/\d+/g);
  	          var replyer_name = $(this).parent().find('.replyer_name').html();

  	          $('#doReply_area').html('#'+floor+'楼'+'@'+replyer_name+':\r\n');
            }else{
              alert('请登陆后在评论');
            }
        	});
        
        $('.response li .font14 a').click(function(){
          var id= $(this).attr('href');
          $(''+id).addClass('light').siblings().removeClass('light');
        });

        var likeoption = $('#like-bottom em').attr('id');
        $('#like-bottom em').click(function(){
          if(State.getLogin()){
            var params = {id:$('#topic_id').val()};
            params.option = likeoption;
            var bcon = $(this).parent().find('b');
            var self = $(this);
            $.ajax({
            data: params,
            url : '/praise',
            type: 'get',
            success: function(data){
              if(data.data==='success'){
                switch(likeoption){
                  case 'add':
                  {
                    likeoption = 'clear';
                    self.addClass('activeIcon');
                    var c=$('#likes').html()*1 + 1;
                    $('#likes').html(c);
                    bcon.html('取消喜欢');
                  }
                  break;
                  case 'clear':
                  {
                    likeoption = 'add';
                    self.removeClass('activeIcon');
                    var c=$('#likes').html()*1 - 1;
                    $('#likes').html(c);
                    bcon.html('喜欢');
                  }
                  break;
                }
              }else{
                alert(data.data);
              }
            }
          });
        }else{
          alert('请登陆后在喜欢吧');
        }
      });
    $('#collect-bottom em').click(function(){
      var collectOption = $('#collect-bottom em').attr('id');
      if(State.getLogin()){ 
        var params = {};
          params.option = collectOption;
          params.node = $('#topic_node').val();
          params.title = $('#topic_title').val();
          params.id = $('#topic_id').val();

          var bcon = $(this).parent().find('b');
          var self = $(this);
          $.ajax({
            data: params,
            url : '/collect',
            type: 'get',
            success: function(data){
              if(data.data==='success'){
                switch(collectOption){
                  case 'add':
                  {
                    collectOption = 'clear';
                    self.addClass('activeIcon');
                    bcon.html('取消收藏');
                  }
                  break;
                  case 'clear':
                  {
                    collectOption = 'add';
                    self.removeClass('activeIcon');
                    bcon.html('收藏');
                  }
                  break;
                }
              }else{
                alert(data.data);
              }
            }
          });
        }else{
          alert("请登陆后再收藏吧！！！")
        }
        
    });

  $('#reply_form').submit(function(){
    if(!State.getLogin()){
      signin();
      return false;
    }
  });
	}
	return reply;
});