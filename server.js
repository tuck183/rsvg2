var express = require('express');
var app = express();
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var path = require('path')
var port     = process.env.PORT || 8000;
var passport = require('passport');
var vhost = require('vhost');
mongoose.connect(process.env.dbUrl || 'mongodb://ajahso4:CRUCIBLE96ajah@ds163494.mlab.com:63494/iamvocal')
require('./config/passport.js')(passport);
// set up our express application
var mainApp = require('./app/router.js')(app,passport,mongoose); // load our routes and pass in our app and fully configured passport
var adminApp = require('./app/admin.js')(app,passport,mongoose);
app.use(express.static('public'))
app.use(morgan('dev')); // log every request to the console

app.set('view engine', 'ejs'); // set up ejs for templating


// required for passport
app.use(cookieParser('a_garden_and_a_river')); // read cookies (needed for auth)
app.use(session({ secret: 'a_garden_and_a_river', resave:true, saveUninitialized:false})); // session secret
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



app.use(vhost('localhost',mainApp));
app.use(vhost('admin.localhost',adminApp));

/*
app.use(vhost('rvsg.herokuapp.com', mainApp));
app.use(vhost('admin.mesh-lab.xyz', adminApp));
app.use(vhost('www.mesh-lab.xyz', mainApp));
*/
//Handle 404
app.use(function(req, res) {
	
});
  

// Handle 500
app.use(function(req, res) {
	
});


// launch ======================================================================
app.listen( port);
console.log('The magic happens on port ' + port);