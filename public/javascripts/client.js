define(['socket.io'],function(io){
		var Client = function(config,State){
		this.config = config;
		this.state = State;
		this.start = function(){
			this.socket = io.connect(this.config.host,{
				'force new connection':true,
				reconnect: true
			});

			this.socket.on('server:news',function(data){
				var content=
				"<li>"
	              +"<img src='"+data.image+"'/>"
	              +"<span><a href=''>"+data.name+":</a>"
	              +data.data
	              +"</span>"
	              +"<span class='time'>"
	              +data.time
	              +"</span>"
	              +"<br  clear='all' />"
	            +"</li>"
				$('.talk-content').append(content);
				$('.talk-content').animate({"scrollTop":$(".talk-content")[0].scrollHeight+20},"slow");
			});
			this.turned=true;
		};

		this.sendMessage=function(){
			if(this.state.getLogin()){
			var date =new Date();
	        var time =date.getHours()+':'+date.getMinutes();
	        var image = this.state.getUser().image;
	        var name = this.state.getUser().name;
	        var message=$('#spitid');
	        var data = message.val();
	        var content=
	            "<li>"
	              +"<img src='"+image+"'/>"
	              +"<span><a href=''>"+name+":</a>"
	              +data
	              +"</span>"
	              +"<span class='time'>"
	              +time
	              +"</span>"
	              +"<br  clear='all' />"
	            +"</li>"
	        $('.talk-content').append(content);
	        $('.talk-content').animate({"scrollTop":$(".talk-content")[0].scrollHeight+20},"slow");
			this.socket.emit('client:news',{
				data:data,
				image:image,
				name:name,
				time:time
			});
			message.val('');
			}
			else{
				signin();
			}
		};
		
		this.disconnect=function(){
			this.socket.disconnect();
			delete this.socket;
			this.turned=false;

		}
	};
	Client.prototype.boot = function(){
		this.start();
		var self =this;
		$('#sbutton').click(function(){
       	  self.sendMessage();
      	});
  	    $('#switchId').click(function(){
  	    	$('#pannelId').toggleClass('dark');
		    if(self.turned){
		      $('#plug').removeClass('icon-toggle-on');
			  $('#plug').addClass('icon-toggle-off');
		      self.disconnect();
		      $('.send').animate({bottom:-60});
		     }
		    else{
		    	$('#plug').removeClass('icon-toggle-off');
			   $('#plug').addClass('icon-toggle-on');
		      self.start();
		       $('.send').animate({bottom:0});
		    }
        });
	}
	return Client;
	
});
