var validator = require('validator');
var Topic = require('../proxy').Topic;
var Reply = require('../proxy').Reply;
var EventProxy = require('eventproxy');
var User = require('../proxy').User;
var remarkable=require('remarkable');
var _=require('lodash');
var config=require('../config');

var md=new remarkable({
	html:        false,
	xhtmlOut:    false,
	breaks:      false,
	langPrefix:  true,
	linkify:     false,
	typographer: false,
	highlight:   function(/*str,,lang*/){return '';}
});
//添加主题
exports.save=function(req, res, next){
	 var node_cat=validator.trim(req.body.node);
	 node_cat=validator.escape(node_cat);
	 var node = config.nodes[node_cat].name;
	 var title=validator.trim(req.body.title);
	 title=validator.escape(title);
	 var content=validator.trim(req.body.content);

	 var author={};
	 author.avatar= req.session.user.profile_image_url;
	 author.name= req.session.user.loginname;
	 var id=req.session.user._id;
	 //node：主题的节点,node_cat: 主题的节点组,title:主题的标题,content:主题的内容,id:主题作者的_id...
	 Topic.newAndSave(node, node_cat, title, content, id ,author,function(err,topic){
 		if(err){
 			return next(err);
 		}
 		return res.redirect('/topic?id='+topic._id+'&node='+node_cat);
	 });

};

//获取主题页面信息："主题内容" ,  "回复内容" 与 "同节点下的其他话题"
exports.show=function(req, res, next){
	var id=req.query.id;
	var node_cat= req.query.node_cat;
	var proxy =new EventProxy();
	proxy.all('topic', 'replies', 'others', function(topic, replies, others){
		if(topic) topic.content = md.render(topic.content);
		res.render('site/topic',{
			topic:  topic,
			replies:replies,
			others: others,
			tip:config.nodes[topic.node_cat].tip
		});
	});
	Topic.getTopicById(id,function(err,topic){
		if(req.session.user){
			for(var i=0; i<topic.favored_fellow.length; i++){
				if(topic.favored_fellow[i] == req.session.user._id){
					topic.favored = true;
					break;
				}
			}
			for(var i=0; i<topic.watched_fellow.length; i++){
				if(topic.watched_fellow[i] == req.session.user._id){
					topic.concerned = true;
					break;
				}
			}
		}
		proxy.emit('topic',topic);
	});
	var options = {sort:'create_at'};
	var query = {};
	query.topic_id = id;
	Reply.getRepliesByTopicId(query, options, function(err,replies){
		replies.forEach(function(reply){
			reply.content = md.render(reply.content);
		});
		proxy.emit('replies', replies);
	});
	var opt = {limit:8, sort:'-create_at'};
	var query2 = {};
	query2.node_cat= node_cat;
	query2._id = {$ne: id};
	Topic.getTopicsByQuery(query2, opt, function(err,others){
	   proxy.emit('others', others);
	});
};
//点击喜欢 与取消喜欢
exports.praise = function(req, res, next){
	var id = req.query.id;
	var user_id = req.session.user._id;
	var option = req.query.option;
	Topic.commitPraise({id:id , user_id:user_id}, option, function(err){
			if(err) return res.json({data:'failure'});
			else return res.json({data:'success'});
		});
	//return res.render('common/notify',{data:'操作受限,没有该权限或者是未登陆'});
}
//点击收藏 与取消收藏
exports.collect = function(req, res, next){
	var id = req.query.id;
	var topic_node = req.query.node;
	var topic_title = req.query.title;
	var topic_id = req.query.id;
	var user_id = req.session.user._id;
	var option = req.query.option;
	var proxy = new EventProxy();
	proxy.all('topic','user', function(){
		return res.json({data:'success'});
	});
	Topic.commitCollect({id:id , user_id:user_id}, option, function(err){
		if(err) return res.json({data:'failure'});
		else proxy.emit('topic');
	});
	User.getUserById(user_id, function(err, user){
		if(err) return res.json({data:'failure'});
		if(option='add'){
			user.concerned_topics.push({topicId:topic_id,topicTitle:topic_title,topicNode:topic_node});
		}else{
			user.concerned_topics.pull({topicId:topic_id,topicTitle:topic_title,topicNode:topic_node});
		}	
		user.save(function(err){
			if(err) return res.json({data:'failure'});
			proxy.emit('user');
		});
	});

}
