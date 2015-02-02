
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.ObjectId;

var ReplySchema=new Schema({
	content: {type: String},
	replyer_id:{type: ObjectId},    //个人信息最近回帖：根据其user_id去查询
	replyer_name:{type: String},    //回帖人的姓名
	topic_id: {type: ObjectId}, 
	replyer_profile: {type: String},//回复人的头像url
	topic_title:{type: String},     //topic_id与topic_title作为最近回帖展示的主题信息
								    //topic_title:回复的话题title,topic_id:回复的话题id
	create_at:{type: Date, default: Date.now}
});

ReplySchema.index({replyer_id: 1},{create_at: 1});
ReplySchema.index({topic_id: 1});

mongoose.model('Reply',ReplySchema);