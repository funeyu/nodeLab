var User=require('../proxy').User;
var Topic=require('../proxy').Topic;
var Reply=require('../proxy').Reply;
var cache=require('memory-cache');
var eventproxy=require('eventproxy');
var config=require('../config');
var limit = config.list_topic_count;

//主页面的主动缓存
function doCache(){

	//all:'默认',good:'优质帖子',nocares:'无人问津',latest:'最新创建',jobs:'招聘';
	['all','good','nocares','latest','jobs'].forEach(function(tab){
		var options = { skip: 0*limit,limit:limit };
		var query ={};
		optionsFormat(options , query , tab);
		//根据查询条件作为缓存的key值
		var cacheKey=JSON.stringify(query) + JSON.stringify(options);
		Topic.getTopicsByQuery(query,options,function(err,topics){
			if(err){
				return;	
			}
			cache.put(cacheKey,topics,8*1000000);

			console.log(cacheKey);
		});
	});
}

setInterval(doCache, 10*1000);
doCache();
//主页面的第几页内容缓存
exports.index = function(req, res, next){
	var proxy = new eventproxy();
	proxy.fail(next); 
	var page = parseInt(req.query.page,10)|| 1;
	page = page > 0 ? page :1;
	var tab =req.query.tab || req.session.tab || 'all';
	req.session.tab = tab;
	var query = {};
	var options = {skip:(page - 1)* limit,limit:limit };
	optionsFormat(options,query,tab);
	var cacheKey = JSON.stringify(query) + JSON.stringify(options);
	cache.get(cacheKey,function(err,topics){
		if(topics){
			return proxy.emit('topics',topics);
		}
		else{
			Topic.getTopicsByQuery(query,options,function(err,topics){
				if(err){
					return;
				}
				else{
					//cache.put(cacheKey,topics,1000*60);//缓存1分钟
					proxy.emit('topics',topics);
					console.log('cache:'+cacheKey);
				}
			});
		}
	});
	//获取网站运行状况
	cache.get('states',function(err,states){
		if(states){
			proxy.emit('states',states);
		}
		else{
			var ep=new eventproxy();
			ep.fail(next);
			ep.all('users','topics','replies',function(users, topics, replies){
				var states={
					users:users,
					topics:topics,
					replies:replies,
				};
				proxy.emit('states',states);
				cache.put('states', states, 60*1000);     //缓存1分钟
			});

			Reply.getCountByQuery({},function(err,rcount){
				ep.emit('replies',rcount);
			});
			Topic.getCountByQuery({},function(err,tcount){
				ep.emit('topics',tcount);
			});
			User.getCountByQuery({},function(err,ucount){
				ep.emit('users',ucount);
			});
		}
	});

	//获取分页的页数
	var pagesKey=JSON.stringify(query) + 'pages';
	cache.get(pagesKey,function(err,topic_count){
		if(topic_count){
			proxy.emit('topic_count',topic_count);
		}
		else{
			Topic.getCountByQuery(query,function(err, topics_count){
				cache.put(pagesKey, topics_count, 60*1000);
				proxy.emit('topic_count', topics_count);
			}); 
		}
	});	

	proxy.all('topics', 'states', 'topic_count', function(topics, states, topic_count){
		return res.render('site/index',{
			topics: topics,
			states: states,
			topic_count:  topic_count,
			current_page:page,
			tab  :  tab,
			nav  : 'index',
			page_type:'index',
			node_cat  :'',      //小hack,作为和node页面公用pag采取的措施
		});
	});
}

//根据tag查询所有的相关主题，分页显示
exports.node = function(req, res, next){
	var page = parseInt(req.query.page,10)|| 1;
	var node_cat  = req.query.node_cat;
	var query= {};
	query.node_cat=node_cat;
	var node = 'node';
	if(node_cat=='node12') node = 'job';
	var options = {skip:(page - 1)* limit,limit:limit,sort:'-top -last_reply_at'};
	var proxy = new eventproxy();
	var pagesKey=JSON.stringify(query) + 'pages';//缓存节点页面主题页数
	proxy.all('topics', 'topics_count', function(topics, topics_count){
		return res.render('site/node',{
			topics: topics,
			current_page:page,
			nav: node,
			topic_count:topics_count,
			tips:config.nodes[node_cat].tip,
			node:config.nodes[node_cat].name,
			page_type:'node',
			node_cat:node_cat
		});
	});
	cache.get(pagesKey,function(err,topic_count){
		if(topic_count){
			proxy.emit('topics_count',topic_count);
		}
		else{
			Topic.getCountByQuery(query,function(err, topics_count){
				cache.put(pagesKey, topics_count, 60*1000);
				proxy.emit('topics_count', topics_count);
			}); 
		}
	});

	Topic.getTopicsByQuery(query, options, function(err,topics){
		if(err) return ;
		proxy.emit('topics', topics);
	});
};


function optionsFormat(options,query,tab){
	switch(tab){
		case 'all':
		  options.sort = '-top -last_reply_at';
		  break;

		case 'good':
		  options.sort = '-good -last_reply_at';
		  query.good = true;
		  break;

		case 'nocares':
		  options.sort = '-reply_number -create_at';
		  query.reply_number=0;
		  break;

		case 'latest':
		  options.sort='-create_at';
		  break;

		case 'jobs':
		  options.sort='-create_at';
		  query.node='jobs';
		  break;
	}
}
