
var validator = require('validator');
var eventproxy = require('eventproxy');
var config = require('../config');
var User = require('../proxy').User;
var Message = require('../proxy').Message;
var utility = require('utility');

/**
*用户注册的页面Controller
*/
exports.register=function(req,res,next){
	var loginname=validator.trim(req.body.name).toLowerCase();
	var pass=validator.trim(req.body.password);

	User.newAndSave(loginname,pass,function(err,user){
		if(err) return next(err);
		req.session.user = user;
		res.redirect('/');
	});
}

//用户登录 登陆只能通过ajax登陆
exports.login = function(req, res, next){
	var name= validator.trim(req.body.name).toLowerCase();
	var pass= validator.trim(req.body.password);
	User.getUserByNameAndPass(name, pass, function(err,user){
		if(user){
			Message.getMessagesNumber(user._id, function(err, count){              //获取未读消息数
				user.messageCount = count;
				req.session.user = user;
				res.json({mess:'s',
					  user:user,
					  count:count
				});
			});
		}else{
			res.json({mess:'f'});
		}
		
	});
}
//用户登出
exports.loginout = function(req, res, next){
	res.clearCookie(config.name, { path: '/' });
	res.session = null;
	return res.redirect('/');
}