var EventProxy=require('eventproxy');

var Topic=require('../models').Topic;
var User =require('./user');
var Reply=require('../models').Reply;
var _    =require('lodash');

//根据id去获取主题的详细信息
exports.getTopicById=function(id ,callback){
	Topic.findOne({_id: id}, function(err,topic){
		if(err || !topic){
			return callback(err);
		}
		topic.visit_number++;    //浏览次数+1
		topic.save(callback);
	});
}

//author:{avatar:XXXXX,name:XXXXX}
exports.newAndSave=function(node, node_cat, title,content,authorId,author,callback){
	var topic =new Topic();
	topic.node=node;
	topic.node_cat=node_cat;
	topic.title=title;
	topic.content=content;
	topic.author_id=authorId;
	topic.author=author;
	topic.save(callback);
}
//根据查询条件获取主题
exports.getTopicsByQuery=function(query,option,callback){
	Topic.find(query,null,option,function(err,docs){  //nodeclub:'_id'????
		if(err){
			return callback(err);
		}
		callback(null,docs)
	});
}
//根据查询条件获取总数
exports.getCountByQuery = function(query, callback){
	Topic.count(query,callback);
}
//点'喜欢' 与'取消喜欢'
exports.commitPraise = function(query, opt, callback){
	Topic.findOne({_id: query.id} ,function(err,topic){
		if(topic){
			if(opt==='add') {
				if(topic.favored_fellow.length == 4)topic.good = true;
				topic.favored_fellow.push(query.user_id);       	//喜欢人数超过5个就自动设置为精华帖
			}
			else{
				if(topic.favored_fellow.length == 5)topic.good = false;
				topic.favored_fellow.pull(query.user_id);
			}
			topic.save(callback(err));
		}
	});
}
//点击'收藏' 与 '取消收藏'：先在topic表里跟新watched_fellow,然后在
exports.commitCollect = function(query, opt, callback){
	Topic.findOne({_id:query.id}, function(err, topic){
		if(topic){
			if(opt==='add'){
				topic.watched_fellow.push(query.user_id);
			}else{
				topic.watched_fellow.pull(query.user_id);
			}
			topic.save(callback(err));
		}
	});
}
