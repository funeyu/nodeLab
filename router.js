var express=require('express');
var site=require('./controllers/site');
var sign=require('./controllers/sign');
var topic=require('./controllers/topic');
var reply=require('./controllers/reply');
var load =require('./common/load');
var user = require('./controllers/user');

var router=express.Router();
router.get('/signup',function(req, res){
	return res.render('sign/register');
});       							      //注册用户
router.post('/register',sign.register);   //注册提交
router.post('/login', sign.login);        //用户登录
router.get('/loginout', sign.loginout);   //用户登出
router.get('/user', user.user);			  //用户主页
router.get('/user-message', user.message); //查看自己的消息
router.get('/user-answers', user.answers); //查看用户页面"回帖"
router.get('/user-collect', user.collect); //查看用户页面"收藏"
router.get('/myOwnMessage', user.myOwnMessage); //查看用户"个人消息"
router.get('/setProfile', user.setProfile);     //个人资料设置
router.get('/clear', user.clear);				//清除所有的个人消息
router.post('/edit', user.edit);				//编辑用户的内容

router.get('/',site.index);     	      //主页面
router.get('/topic',topic.show);          //主题页的展示
router.get('/node',site.node);			  //主题页的标签页面显示
router.get('/praise',topic.praise);       //喜欢操作
router.get('/collect',topic.collect);     //收藏操作

router.get('/post',function(req,res){
	if(req.session.user)return res.render('user/post');
	res.redirect('/');
});
router.post('/post',topic.save);         //新建主题
router.post('/loadPic',load.loadPic);    //上传图片
router.post('/doReply', reply.add);      //帖子回复

module.exports=router;