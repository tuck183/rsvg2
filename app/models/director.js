var mongoose = require('mongoose');

// category is for Urban development or rural or health and all that.
// location is about the location
var directorSchema = mongoose.Schema({
	'ministryId':String,
	'name':String,
	'designation':String,
	'image_url':String,
})


module.exports = mongoose.model('rvsgDirector',directorSchema)