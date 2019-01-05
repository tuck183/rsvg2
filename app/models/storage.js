var mongoose = require('mongoose');

// media content schema for random media like videos
// category can be picture, video, pdf, audio
var storageSchema = mongoose.Schema({
	'category':String,
	'storage_id':String,
	'file_name':String,
	'date_added':{type:Date, default:Date.now},
})


module.exports = mongoose.model('rvsgStorage',storageSchema);