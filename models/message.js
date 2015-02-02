var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.ObjectId;

var MessageSchema=new Schema({
	content_type:{tyoe: String},  //'a'为回复帖子消息,'e'为私信消息
	content:{type: String},       
	receiver_id:{type: ObjectId}, //接收人的id
	//sender_id:{type: ObjectId}, //发送人的id   \ 
	//                                             两者可以存放于content中,相关链接markdown拼接
	//sender:{type: String},      //发送人的name /
	has_read:{type: Boolean, default:false},
	created_at:{type: Date, default:Date.now}
});
MessageSchema.index({receiver_id:1, created_at:-1});
mongoose.model('Message',MessageSchema);