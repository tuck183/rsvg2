var mongoose = require('mongoose');

// media content schema for random media like videos
// category can be picture, video, pdf, audio, word docs,
var mediaSchema = mongoose.Schema({
	'tag':String,
	'title':String,
	'url':String,
	'poster':String,
	'category':String,
	'type':String,
	'description':String,
	'date_added':{type:Date, default:Date.now},
	'media_id':String,
})


module.exports = mongoose.model('rvsgMedia',mediaSchema);