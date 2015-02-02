var mongoose = require('mongoose');
var Schema   =mongoose.Schema;
var ObjectId =Schema.ObjectId;
var config   =require('../config');
var _        =require('lodash');

var TopicSchema=new Schema({
	node: {type: String},                           //主题所在的节点名称
	node_cat:{type: String},						//主题的组别
	title:{type: String}, 
	content:{type: String}, 						//主题内容
	author_id:{type: ObjectId }, 
	author:{
		avatar:String,                              //作者的头像url
		name:String								    //作者的姓名
	},
	top:{type: Boolean, default: false},            //是否为置顶帖
	good:{type: Boolean, default: false},           //是否为精华帖
	//reply_ornot:{type: Boolean, default: false},  //是否有人回复
	reply_number:{type: Number, default: 0},
	visit_number:{type: Number, default: 0},
	create_at:{type: Date, default: Date.now},
	update_at:{type: Date},
	last_reply_id:{type: ObjectId},					 //最后回复人的id
	last_reply_name:{type: String},					 //最后回复人的name
	last_reply_at:{type: Date},
	watched_fellow:[{type: ObjectId}],               //关注的人们的id
	favored_fellow:[{type: ObjectId}]                //该文章的喜欢人数[这里为什么弄成数组不分表
													 //是基于该数组下的内容不会很多，不会给mongodb
													 //造成索引灾难]

});

TopicSchema.index({create_at: -1});                  //查看:"最新创建"  
TopicSchema.index({top: -1,last_reply_at: -1});      //查看:"默认"
TopicSchema.index({good: -1,last_reply_at: -1});     //查看:"优质帖子"
TopicSchema.index({reply_number: 1,create_at: -1});  //查看:"无人问津"
TopicSchema.index({author_id: 1,favor_fellow_number: -1});  //个人信息:"热门话题"
TopicSchema.index({node_cat:  1, create_at: -1});               //主题页面："该节点下的其他话题"
mongoose.model('Topic',TopicSchema);