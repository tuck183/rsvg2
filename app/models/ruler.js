var mongoose = require('mongoose');

// category is for Urban development or rural or health and all that.
// location is about the location
var rulerSchema = mongoose.Schema({
	'name':String,
	'title':String,
	'image_url':String,
	'kingdom':String,
})


module.exports = mongoose.model('rvsgRuler',rulerSchema)