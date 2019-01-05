var mongoose = require('mongoose');

// category is for Urban development or rural or health and all that.
// location is about the location
var departmentSchema = mongoose.Schema({
	'ministryId':String,
	'name':String,
})


module.exports = mongoose.model('rvsgDepartment',departmentSchema)