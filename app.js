/**
*node app:运行改网站
*/
var config=require('./config');
var path=require('path');
var express=require('express');
var session=require('express-session');
var MongoStore = require('connect-mongo')(session);
var compress = require('compression');
var bodyParser=require('body-parser');
var busboy = require('connect-busboy');
var router=require('./router');
var Chat=require('./common/chat');
var local = require('./middlewares/locals').flash;

//静态文件目录
var staticDir=path.join(__dirname,'/public');

var app=express();

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','html');
app.engine('html',require('ejs-mate'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('method-override')());
app.use(require('cookie-parser')(config.session_secret));
app.use(compress());

app.use(session({
	name:config.auth_cookie_name,
	secret:config.session_secret,	
	store:new MongoStore({
		url:config.db
	}),
	cookie:{path: '/', maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true}, //cookie 有效期30天,
	resave:true,
	saveUninitialized:true,
}));
app.use('/public',express.static(staticDir));
app.use(local);

app.use(busboy({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
}));
var server = app.listen(config.port, function () {
  console.log("NodeClub listening on port %d in %s mode", config.port);
  console.log("God bless love....");
  console.log("You can debug your app with http://" + config.hostname + ':' + config.port);
});

//routes
app.use('/',router);

var io=require('socket.io')(server);
Chat(io);

module.exports = app;