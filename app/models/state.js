var mongoose = require('mongoose');

// state information schema
// 
var stateSchema = mongoose.Schema({
	'sections':[{
		'images':[String],
		'title':String,
		'description':String
	}],
	'video_url':String,
})


module.exports = mongoose.model('rvsgState',stateSchema);