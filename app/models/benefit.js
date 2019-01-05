var mongoose = require('mongoose');

// category is for Urban development or rural or health and all that.
// location is about the location
var benefitSchema = mongoose.Schema({
	'projectId':String,
	'title':String,
	'description':String,
})


module.exports = mongoose.model('rvsgBenefit',benefitSchema)