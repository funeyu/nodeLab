var Message =require('../proxy/message');
exports.flash = function(req, res, next){
	if(req.session && req.session.user){
		var user = req.session.user;
		Message.getMessagesNumber(req.session.user._id, function(err, number){
			user.messageCount = number;
			res.locals.user = req.session.user = user;
			next();
		});
	}else{
		next();
	}
	
}