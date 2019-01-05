var mongoose = require('mongoose');

var judgesSchema = mongoose.Schema({
	'name':String,
	'position':String,
	'image':String,
	'profile':String,
	'jurisdiction':String,
	'court':String,

})


module.exports = mongoose.model('rvsgJudges',judgesSchema)