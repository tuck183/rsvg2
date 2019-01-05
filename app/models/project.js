var mongoose = require('mongoose');

// category is for Urban development or rural or health and all that.
// location is about the location
var projectSchema = mongoose.Schema({
	'ministry':String,
	'title':String,
	'category':String,
	'location':String,
	'description':String,
	'latitude':String,
	'longitude':String,
	'gains':String,
	'tags':[String],
	'projectId':String,
	'status':String,
})


module.exports = mongoose.model('rvsgProject',projectSchema)