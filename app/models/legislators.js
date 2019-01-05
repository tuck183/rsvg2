var mongoose = require('mongoose');

var legislatorSchema = mongoose.Schema({
	'name':String,
	'position':String,
	'images':[String],
	'constituency':String,
	'profile':String,
})


module.exports = mongoose.model('rvsgLegislator',legislatorSchema)