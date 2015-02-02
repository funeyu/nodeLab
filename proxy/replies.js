var Reply = require('../models').Reply;
var Topic = require('../models').Topic; 

exports.getRepliesByTopicId=function(query, options, callback){
	Reply.find(query, null, options, callback);
}
exports.getCountByQuery = function(query, callback){
	Reply.count(query,callback);
}
//创建保存一条回复信息
exports.newAndSave=function(content, replerId, topicId, topicTitle, replyer_profile, replyerName, callback){
	var reply = new Reply();
	reply.content = content;
	reply.replyer_id = replerId;
	reply.topic_id = topicId;
	reply.topic_title = topicTitle;
	reply.replyer_profile = replyer_profile;
	reply.replyer_name = replyerName;
	reply.save(callback);
}
//更新文章的最近回复信息
exports.updateLastReply = function(topicId, replerId, replyName, callback){
	Topic.findOne({_id:topicId}, function(err,topic){
		if(err || !topic) return callback(err);
		topic.last_reply_id = replerId;   //回复人的id
		topic.last_reply_at = new Date();
		topic.last_reply_name = replyName;
		topic.reply_number += 1;
		topic.save(callback); 
	});
}
//根据条件查找
exports.searchByQuery = function(query, option, callback){
	Reply.find(query, null, option, function(err,replies){
		if(err) return callback(err);
		callback(null, replies);
	});
}




