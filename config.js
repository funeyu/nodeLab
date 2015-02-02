/**
*config
*/

var path = require('path');

var config = {

	name: 'funer',              //网站名称
	description: '傅鹤雨的网站',//网站描述
	keywords:'nodejs,node,express',
	//mongodb配置
	db: 'mongodb://127.0.0.1/funer',
	da_name: 'funer',
	//网站相关的设置
	session_secret:'fuheyu1989',
	auth_cookie_name:'funer',
	port:3000,

	list_topic_count:16,
	
	upload: {
      path: path.join(__dirname, 'public/upload/'),
      url: '/public/upload/'
	},
	nodes:{
		node0:{name:'Node',tip:
			['Node.js 资源汇总:https://cnodejs.org/topic/54128625351649283bcc5b30',
			'']
		},
		node1:{name:'express',tip:[
			'express 3.0到4.x的挖坑指南:http://www.tuicool.com/articles/B7rMz2Q',
			'类似的nodejs框架还有:<a href="https://github.com/primus/primus">Primus</a>'
			+'<a href="http://geddyjs.org/">Geddy</a><a href="http://locomotivejs.org/">Locomotive</a>'
			+'<a href="http://keystonejs.com/">KeystoneJS </a>......'
			]
		},
		node2:{name:'SocketIO',tip:[]},
		node3:{name:'Stylus',tip:[
			'Stylus - 富有表现力的、动态的、健壮的CSS',
			'stylus中文版参考文档之综述<a href="http://www.zhangxinxu.com/jq/stylus/">前去看看</a>'
			]},
		node4:{name:'重构',tip:[
			'重构方面的小贴士请到config.js中配置下......',
			'重构方面的小贴士请到config.js中配置下......'
		]},	
		node5:{name:'部署',tip:[
			'重构方面的小贴士请到config.js中配置下......',
			'重构方面的小贴士请到config.js中配置下......'
		]},
		node6:{name:'开源项目',tip:[
			'开源项目方面的小贴士请到config.js中配置下......',
			'开源项目方面的小贴士请到config.js中配置下......'
		]},
		node7:{name:'新手问题',tip:[
			'新手问题方面的小贴士请到config.js中配置下......',
			'新手问题方面的小贴士请到config.js中配置下......'
		]},
		node8:{name:'V8源码探究',tip:[
			'V8源码探究方面的小贴士请到config.js中配置下......',
			'V8源码探究方面的小贴士请到config.js中配置下......'
		]},
		node9:{name:'健康',tip:[
			'健康方面的小贴士请到config.js中配置下......',
			'健康方面的小贴士请到config.js中配置下......'
		]},
		node10:{name:'工具控',tip:[
			'工具控方面的小贴士请到config.js中配置下......',
			'工具控方面的小贴士请到config.js中配置下......'
		]},
		node11:{name:'求职',tip:[
			'求职方面的小贴士请到config.js中配置下......',
			'求职方面的小贴士请到config.js中配置下......'
		]},
		node12:{name:'招聘',tip:[
			'招聘方面的小贴士请到config.js中配置下......',
			'招聘方面的小贴士请到config.js中配置下......'
			]},
		node13:{name:'分享',tip:[
			'分享方面的小贴士请到config.js中配置下......',
			'分享方面的小贴士请到config.js中配置下......'
			]},
		node14:{name:'瞎扯淡',tip:[
			'瞎扯淡方面的小贴士请到config.js中配置下......',
			'瞎扯淡方面的小贴士请到config.js中配置下......'
			]},
		node15:{name:'其他',tip:[
			'其他方面的小贴士请到config.js中配置下......',
			'其他方面的小贴士请到config.js中配置下......'
			]},
		node16:{name:'书籍',tip:[
			'书籍方面的小贴士请到config.js中配置下......',
			'书籍方面的小贴士请到config.js中配置下......'
			]},
		node17:{name:'创业',tip:[
			'创业方面的小贴士请到config.js中配置下......',
			'创业方面的小贴士请到config.js中配置下......'
			]},
		node18:{name:'移民',tip:[
			'移民方面的小贴士请到config.js中配置下......',
			'移民方面的小贴士请到config.js中配置下......'
			]},
		node19:{name:'MongoDB',tip:[
			'MongoDB方面的小贴士请到config.js中配置下......',
			'MongoDB方面的小贴士请到config.js中配置下......'
			]},
		node20:{name:'Redis',tip:[
			'重构方面的小贴士请到config.js中配置下......',
			'重构方面的小贴士请到config.js中配置下......'
			]},
		node21:{name:'Git',tip:[
			'Redis方面的小贴士请到config.js中配置下......',
			'Redis方面的小贴士请到config.js中配置下......'
			]},
		node22:{name:'DataBase',tip:[
			'DataBase方面的小贴士请到config.js中配置下......',
			'DataBase方面的小贴士请到config.js中配置下......'
			]},
		node23:{name:'Linux',tip:[
			'Linux方面的小贴士请到config.js中配置下......',
			'Linux方面的小贴士请到config.js中配置下......'
			]},
		node24:{name:'Nginx',tip:[
			'Nginx方面的小贴士请到config.js中配置下......',
			'Nginx方面的小贴士请到config.js中配置下......'
			]},
		node25:{name:'CSS',tip:[
			'CSS方面的小贴士请到config.js中配置下......',
			'CSS方面的小贴士请到config.js中配置下......'
			]},
		node26:{name:'运维',tip:[
			'运维方面的小贴士请到config.js中配置下......',
			'运维方面的小贴士请到config.js中配置下......'
			]},
		node27:{name:'安全',tip:[
			'安全方面的小贴士请到config.js中配置下......',
			'安全方面的小贴士请到config.js中配置下......'
			]},
		node28:{name:'云服务',tip:[
			'云服务方面的小贴士请到config.js中配置下......',
			'云服务方面的小贴士请到config.js中配置下......'
			]},
		node29:{name:'GO',tip:[
			'GO方面的小贴士请到config.js中配置下......',
			'GO方面的小贴士请到config.js中配置下......'
			]},
		node30:{name:'Erlang',tip:[
			'Erlang方面的小贴士请到config.js中配置下......',
			'Erlang方面的小贴士请到config.js中配置下......'
			]},
		node31:{name:'Haskell',tip:[
			'Haskell方面的小贴士请到config.js中配置下......',
			'Haskell方面的小贴士请到config.js中配置下......'
			]},
		node32:{name:'Swift',tip:[
			'Swift方面的小贴士请到config.js中配置下......',
			'Swift方面的小贴士请到config.js中配置下......'
			]},
		node33:{name:'Java',tip:[
			'Java方面的小贴士请到config.js中配置下......',
			'Java方面的小贴士请到config.js中配置下......'
			]},
		node34:{name:'Javascript',tip:[
			'Javascript方面的小贴士请到config.js中配置下......',
			'Javascript方面的小贴士请到config.js中配置下......'
			]},
		node35:{name:'C',tip:[
			'C方面的小贴士请到config.js中配置下......',
			'C方面的小贴士请到config.js中配置下......'
			]},
		node36:{name:'Python',tip:[
			'Python方面的小贴士请到config.js中配置下......',
			'Python方面的小贴士请到config.js中配置下......'
			]},
		node37:{name:'公告',tip:[
			'公告方面的小贴士请到config.js中配置下......',
			'公告方面的小贴士请到config.js中配置下......'
			]},
		node38:{name:'反馈',tip:[
			'反馈方面的小贴士请到config.js中配置下......',
			'反馈方面的小贴士请到config.js中配置下......'
			]},
		node39:{name:'社区开发',tip:[
			'社区开发方面的小贴士请到config.js中配置下......',
			'社区开发方面的小贴士请到config.js中配置下......'
			]},
		node40:{name:'NoPoint',tip:[
			'NoPoint方面的小贴士请到config.js中配置下......',
			'NoPoint方面的小贴士请到config.js中配置下......'
			]}

	}
};
module.exports=config;