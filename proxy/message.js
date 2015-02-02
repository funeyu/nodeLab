var Message = require('../models').Message;
var User = require('./user');

//拼接content内容:<a href="/user?id=*****">user.loginname</a>
//               在话题<a href="**">topic.title</a>回复了你的回帖：blabla
exports.sendMessage = function(name, type, content, callback){
	User.getUserByLoginName(name, function(err, user){
		var message = new Message();
		message.content = content;
		message.content_type = type;
		message.receiver_id = user._id;
		message.save(callback);
	});
}
//用户查询收到的消息,同时将message设置为'已读'
exports.getMessagesByID = function(id, callback){
	Message.find({receiver_id:id}, function(err,messages){
		if(err) return;
		if(messages){
			messages.forEach(function(message){
				if(message.has_read==false){
					message.has_read = true;       //消息由"未读"置"已读"并保存
					message.save(function(){});
				}
			});
			callback(null,messages);
		}
		
	});
}
//查询用户未读的消息数
exports.getMessagesNumber = function(id, callback){
	Message.count({receiver_id:id, has_read:false}, function(err,count){
		callback(err, count);
	});
}
//根据receiver_id清除消息
exports.clearMessages = function(id ,callback){
	Message.remove({receiver_id:id}, callback);
}

