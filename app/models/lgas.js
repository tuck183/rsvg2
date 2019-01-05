var mongoose = require('mongoose');

// category is for Urban development or rural or health and all that.
// location is about the location
var lgaSchema = mongoose.Schema({
	'name':String,
	'description':String,
	'chairman':Object,
	'images':Array,
})


module.exports = mongoose.model('rvsgLGA',lgaSchema)