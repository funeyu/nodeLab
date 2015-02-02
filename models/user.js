var mongoose=require('mongoose');
var Schema  =mongoose.Schema;
var ObjectId=Schema.ObjectId;

var UserSchema=new Schema({
	loginname:{type: String},
	pass:{type: String},
	email:{type: String},
	url:{type: String},
	active:{type: Boolean, default:false},
	location:{type: String, default:'暂无'},
	profile_image_url:{type: String},
	sigature:{type: String, default:'用户很懒，什么也没说'},//用户签名
	rank:{type: Number, default:3},     		 			//级别：0-管理员，1-高级用户，2-普通用户，3-新手
	concerned_topics:[{topicId: ObjectId,topicTitle:String,topicNode:String}],
										 					//关注的文章id集合
	messageCount:{type: Number, default:0}  				//收到的信息数
});
UserSchema.index({name:1});
mongoose.model('User',UserSchema);