// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var port  	 = process.env.PORT || 8080; 				// set the port
var mongoose = require('mongoose'); 					// mongoose for mongodb
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var flash = require('connect-flash');

var database = require('./config/database'); 			// load the database config
var secret = require('./config/secret');


// configuration ===============================================================
mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io
require('./config/passport')(passport); // pass passport for configuration

 	app.use(morgan());						// pull information from html in POST;
	app.use(cookieParser());
	app.use(bodyParser());
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	//app.use(express.logger('dev')); 						// log every request to the console
		
	
//	app.use(express.methodOverride()); 						// simulate DELETE and PUT

	app.use(expressSession({secret : secret.secretToken})); //session secret
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());


require('./app/routes/login.js')(app,passport);	
console.log(passport);
// // routes ======================================================================
// require('./app/routes/navigation')(app,passport);
// require('./app/routes/technician.js')(app,passport);
// require('./app/routes/appointment.js')(app,passport);
// require('./app/routes/jobtype.js')(app,passport);
// require('./app/routes/status.js')(app,passport);
// require('./app/routes/client.js')(app,passport);



// app.get('/partials/:name', function(req,res,next) {
// 	if (!req.params.name) {
// 		next();
// 		return;
// 	}
// 	res.sendfile('./public/partials/' + req.params.name ); // load the single view file (angular will handle the page changes on the front-end)
// });
		
// app.get('*',function(req,res) {
	// res.sendfile('./public/index.html');
// });

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port); 