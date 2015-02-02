var Message = require('../proxy').Message;
/*
*@attached:
*@text    :发送消息的主体
*/
exports.digest = function(text, attached, callback){
	var con = handleContent(text, attached);
	if(con){
		var content = handleAttached(con.content, attached);
		Message.sendMessage(con.atwho, 'a', content ,callback(null,con.content));
	}else{
		callback(null, text);
	}
	
}
//私信
exports.email = function(sender, receiver, content, callback){
	var con = '<p><a href="/user?id='+sender.id+'"><img src="'+sender.image+'"/></a>'
			+'私信你说：</p><p>'+content+'</p>';
	Message.sendMessage(receiver, 'e',con, callback);
}

var handleContent = function(text, attached){
	var regex = '\#\d*楼';
	var floor = text.match(/\#\d*楼/g);
	if(floor){
		var atwho = text.match(/\@[a-z0-9A-Z]+\:/g)[0];
		atwho = atwho.match(/[a-z0-9A-Z]+/g)[0];
		// if(atwho==attached.replyerName)
		// throw new error("/不允许给自己的帖子回帖");   //给自己的回帖 抛出异常
		var floorNumber = floor[0].match(/\d+/g);
		text = text.replace(new RegExp(floor,'g'),'['+floor+'](#reply'+floorNumber+')');
		//var atwho = text.match(/(?=\@)[a-z0-9A-Z]+(?=:)/g);不能用逆序环视
		return {content: text,atwho: atwho};
	}else{
		return null;
	}
	
}
var handleAttached =function(text, attached){
	return '<p><a href="/user?id='+attached.replyerId+'"><img src="'+attached.replyer_profile+'"></a>'
			+'在帖子'+'<a href=/topic?id='+attached.topicId+'&node_cat='+attached.topicNode
			+'>'+attached.topicTitle+'</a>回复你说：</p><p>'+text+'</p>';
}