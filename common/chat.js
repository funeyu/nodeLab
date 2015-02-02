var socketIO=require('socket.io');
var _ = require('lodash');


var talkers_online={};    //单机情况下:存储线上socket信息;
						  //多机情况下:应该存储在redis之类的数据库里

var Chat= function(io){
	io.on('connection',function(socket){

		talkers_online[socket.id]={'socket':socket};
		//给每个在线转发消息
		socket.on('client:news',function(data){
			broadCast(socket.id,data);
		});

		socket.on('disconnect',function(){
			disconnect(socket.id);
		});
	});
};

function disconnect(key){
	delete talkers_online[key];
	//这里还可以广播给其他人：XX退出了
	//
};


function broadCast(id,data){
    _.forEach(talkers_online,function(onliner){
	  if(onliner.socket.id!==id){
	  	console.log(data);
	  	onliner.socket.emit('server:news',data);
	  }
   });
}

module.exports=Chat;