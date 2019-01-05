var mongoose = require('mongoose');

// url - is the ministry URL
// directors - the four other key people in the ministry apart from the commissioner
// about - profile of the ministry

// images - would be used for the parallax effect
// videos - short video to highlight the ministry's work

var ministrySchema = mongoose.Schema({
	'ministry':String,
	'about':String,
	'vision':String,
	'mission':String,
	'images':[String],
	'url':String,
})


module.exports = mongoose.model('rvsgMinistry',ministrySchema)