var mongoose = require('mongoose');

// state information schema
// 
var votingCentreSchema = mongoose.Schema({
	'address':String,
	'longitude':String,
	'latitude':String,
	'lga':String,
	'ward':String,
	'description':String,
	'images':[String],
})


module.exports = mongoose.model('rvsgVoting',votingCentreSchema);