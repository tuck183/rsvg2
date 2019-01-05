var mongoose = require('mongoose');

var complaintSchema = mongoose.Schema({
	'name':String,
	'agency':String,
	'email':String,
	'phone':String,
	'location':String,
	'id':String,
	'complaint':String
})


module.exports = mongoose.model('rvsgComplaint',complaintSchema)