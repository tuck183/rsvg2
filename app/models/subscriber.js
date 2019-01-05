var mongoose = require('mongoose');


var newsletterSubscriberSchema = mongoose.Schema({
	'email':String,
	'date_joined':{type:Date, default:Date.now},
	'emails_received':{type:Number, default:0},
})


module.exports = mongoose.model('rvsgNewsletterSubscriber',newsletterSubscriberSchema)