var Topic = require('../proxy/topic');
var Reply = require('../proxy/replies');
var Message = require('../proxy/message');
var User = require('../proxy/user');
var EventProxy =require('eventproxy');

//用户主页
exports.user = function(req, res, next){
	var proxy = new EventProxy();
	proxy.all('user','topics','answers', function(user, topics,answers){
		return res.render('user/user',{
			topics:topics,
			ouser:user,
			userid:user._id,
			answers:answers,
			collects: user.concerned_topics
		});
	});

	var id = req.query.id;
	User.getUserById(id, function(err, user){
		if(user) proxy.emit('user', user);
		else{

		}
	});
	var query = {};
	query.author_id = id;
	Topic.getTopicsByQuery(query, {limit:10,sort:'-create_at'}, function(err, topics){
		if(topics) proxy.emit('topics', topics);
		else{

		}
	});
	var rquery = {};
	rquery.replyer_id = id;
	Reply.searchByQuery(rquery,{limit:6,sort:'-create_at'}, function(err,answers){
		if(answers)proxy.emit('answers',answers);
	});

}

//用户主页 "最近回帖" 取出10条
exports.answers = function(req, res, next){
	var userid = req.query.id;
	var query = {};
	query.replyer_id = userid;
	Reply.searchByQuery(query,{limit:10,sort:'-create_at'}, function(err,answers){
		return res.render('user/answers',{
			answers:answers,
			id : userid
		});
	});
}
exports.message = function(req, res, next){
	if(req.session.user){
		Message.getMessagesByID(req.session.user._id, function(err, messages){
			return res.render('user/messages',{
				messages:messages,
			});
		});
	}

};

exports.collect = function(req, res, next){
	var userid = req.query.id;
	User.getUserById(userid, function(err, user){
		if(user){
			return res.render('user/collect', {
				collects: user.concerned_topics,
				id: userid
			});
		}
	});
}

//查看我的消息
exports.myOwnMessage = function(req, res, next){
	if(req.session.user){
		var id = req.session.user._id;
		Message.getMessagesByID(id, function(err, replies){
			return res.render('user/messages', {
				messages:replies
			});
		});
	}else{
		return res.redirect('/');
	}
}
//清空消息
exports.clear = function(req, res, next){
	if(req.session.user){
		var id = req.session.user._id;
		Message.clearMessages(id, function(err){
			if(err) return ;
			else{
				res.redirect('/');
			}
		});
	}else{
		return res.redirect('/');
	}
}
//个人资料设置
exports.setProfile = function(req, res, next){
	if(req.session.user){
		var id = req.session.user._id;
		User.getUserById(id, function(err, user){
			if(user){
				return res.render('user/edit',{
					user:user
				});
			}
		});
	}
}
//个人资料设置的提交
exports.edit = function(req, res, next){
	if(req.session.user){
		var id = req.session.user._id;
		User.getUserById(id, function(err, user){
			if(user){
				user.profile_image_url = 'http://q1.qlogo.cn/g?b=qq&nk='+req.body.headerimage+'&s=100';
				user.email=req.body.email;
				user.sigature = req.body.signture;
				user.location = req.body.address;
				user.loginname = req.body.name;
				user.password = req.body.password;
				user.save(function(err, user){
					req.session.user = user;
					return res.redirect('/');
				});							//保存更新

			}else{
				return res.redirect('/');
			}	
		});
	}else{
		return res.redirect('/');
	}
}