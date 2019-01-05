var mongoose = require('mongoose');

// state information schema
// 
var newsSchema = mongoose.Schema({
	'title':String,
	'main_image':String,
	'author':String,
	'date_published':{type:Date,default:Date.now},
	'summary':String,
	'content':String,
	'video_url':[String],
	'images_url':[String],
	'id':String,
})


module.exports = mongoose.model('rvsgNews',newsSchema);