var validator = require('validator');
var _ = require('lodash');
var at=require('../common/at');
var Eventproxy = require('eventproxy');
var Reply = require('../proxy').Reply;

//添加回复
exports.add = function(req, res, next){
	var topicId = req.body.topicId;
	var content = req.body.content;
	var topicNode =req.body.topicNode;
	var topicTitle = req.body.topicTitle;   	   
	var con = validator.trim(content);
	var replyerId= req.session.user._id;
	var replyer_profile =req.session.user.profile_image_url;
	var replyerName= req.session.user.loginname;
	var attached ={topicTitle:topicTitle, topicNode: topicNode, topicId: topicId,
					replyerId:replyerId,replyerName:replyerName,replyer_profile:replyer_profile};
	var proxy = new Eventproxy();
	//发送给改该文章作者消息:XXX回复了你的帖子XXX；
	//发送给该文章的关注者消息：你关注的帖子XXX有XXX的回复XXX
	proxy.all('topic','reply', function(topicId){
	  return res.redirect('/topic?id='+topicId+'&node_cat='+topicNode);
	});

	Reply.updateLastReply(topicId, replyerId, replyerName, function(err){
		if(err)return;
		proxy.emit('topic',topicId);     
	});
	
	at.digest(content, attached, function(err, con){
		Reply.newAndSave(con, replyerId, topicId, topicTitle, replyer_profile,replyerName, function(err){
		  if(err)return;
		  proxy.emit('reply');        
		});
	});
}