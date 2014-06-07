var User = require('../models/user'),
	mongoose = require('mongoose');

module.exports = function(app,passport) {
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.sendfile('./public/partials/login.html');
	});


	app.post('/user/login', passport.authenticate('local-login', {
		successRedirect : '/calendar', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));


	app.post('/user/signup',  passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});	
};

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}
