define(['State'], function(){
	var State = require('State');
	var login = {
		run: function(){
		  window.signin = function(){//这个是点击左上角的"登陆"
			  $('#bgmask1').show();
	          $('#logina').animate({top:'0'},500);
		 };
		 window.showNodes =function(){
	        $('#bgmask2').show();
	        $('#node-area').animate({top:'0'},500);
	      }
		  $('.loginform .logininput').focus(function(){
          	  $('#notice').html('');
      	  });
          $('#bgmask1').click(function(){
	          $(this).hide();
	          $('#logina').animate({top:'-500'},500);
	      });
	      $('#bgmask2').click(function(){
	          $(this).hide();
       		  $('#node-area').animate({top:'-500'},500);
	      });
	      $('#loginbutton').click(function(){
            var params= {
             name: $('#name').val(),
             password: $('#pass').val()
            };
            $.ajax({
	          data: params,
	          url : '/login',
	          type: 'post',
          	  //cache:false,
	          success: function(data){
	            if(data.mess==='s'){
	              State.setUser({login:'true',name:data.user.loginname,image:data.user.profile_image_url});
	              var inhtml = "<div id='nav-user'><img src='"+data.user.profile_image_url+"'/>"
	                             +"<div class='usermenu'>"
	                              +"<i class='tri'></i>"
	                                +"<ul>"
	                                  +"<li><a href='/user'>我的主页</a></li>"
	                                  +"<li><a href='/'>个人资料设置</a></li>"
	                                  +"<li><a href='/'>我的消息</a><em>"+data.count+"</em></li>"
	                                  +"<li class='publish'><a href='/post'>发布话题</a></li>"
	                                  +"<li><a href='/loginout'>安全退出</a></li>"
	                               +"</ul>"
	                            +"</div>"
	                          +"</div>";
	              $('.navright').append(inhtml);
	              $('#nav-login').hide();
	              $('.bgmask').click();
	            }else{
	              $('#notice').html('密码或者用户名错误');
	            }
	          }
            });
           });
		},
	}
	return login;
});
      