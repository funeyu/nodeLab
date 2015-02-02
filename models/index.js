var mongoose=require('mongoose');
var config=require('../config');

mongoose.connect(config.db,function(err){
	if(err){
		console.error('error');
		process.exit(1);
	}
});

require('./user');
require('./topic');
require('./message');
require('./reply');
exports.User=mongoose.model('User');
exports.Topic=mongoose.model('Topic');
exports.Message=mongoose.model('Message');
exports.Reply=mongoose.model('Reply');