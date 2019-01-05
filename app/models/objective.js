var mongoose = require('mongoose');

// category is for Urban development or rural or health and all that.
// location is about the location
var objectiveSchema = mongoose.Schema({
	'ministryId':String,
	'objective':String,
	'description':String,
})


module.exports = mongoose.model('rvsgObjective',objectiveSchema)