var mongoose = require('mongoose');

// category is for Urban development or rural or health and all that.
// location is about the location
var beforeSchema = mongoose.Schema({
	'projectId':String,
	'name':String,
	'description':String,
	'images_url':[String],
})


module.exports = mongoose.model('rvsgBefore',beforeSchema)