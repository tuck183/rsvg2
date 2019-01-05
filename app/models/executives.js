var mongoose = require('mongoose');



var executivesSchema = mongoose.Schema({
	'name':String,
	'position':String,
	'images':[String],
	'profile':String,
	'ministry':String,
})


module.exports = mongoose.model('rvsgExecutive',executivesSchema)