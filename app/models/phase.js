var mongoose = require('mongoose');

// category is for Urban development or rural or health and all that.
// location is about the location
var phaseSchema = mongoose.Schema({
	'projectId':String,
	'phase':String,
	'description':String,
	'images':[String],
})


module.exports = mongoose.model('rvsgPhase',phaseSchema)