var mongoose = require('mongoose');

// category is for Urban development or rural or health and all that.
// location is about the location
var highlightSchema = mongoose.Schema({
	'ministryId':String,
	'title':String,
	'description':String,
	'video_url':String,
	'video_poster':String,
})


module.exports = mongoose.model('rvsgHighlight',highlightSchema)