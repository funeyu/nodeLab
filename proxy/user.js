var models=require('../models');
var User=models.User;

exports.getUserByLoginName=function(loginName,callback){
	User.findOne({'loginname':loginName},callback);
}
exports.getUserByNameAndPass=function(loginName, passWord, callback){
	User.findOne({'loginname':loginName, 'pass':passWord},callback);
}

exports.getUserById=function(id,callback){
	User.findOne({_id:id},callback);
}

exports.newAndSave=function(loginname,pass,callback){
	var user=new User();
	user.loginname=loginname;
	user.pass=pass;
	user.email=loginname+'@qq.com';
	user.profile_image_url='http://q1.qlogo.cn/g?b=qq&nk='+loginname+'&s=100';
	user.save(callback);//这一句注意其用意
}
exports.getUserByQuery=function(query,opt,callback){
	User.find(query,'',opt,callback);
}

exports.getCountByQuery=function(query,callback){
	User.count(query, callback);
}
