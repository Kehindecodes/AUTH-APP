const express = require('express');
const passport = require('passport');
const facebookRouter = express.Router();

// Facebook Authentication Route
facebookRouter.get('/', passport.authenticate('facebook'));

// Facebook Callback Route
facebookRouter.get(
	'/callback',
	passport.authenticate('facebook', {
		successRedirect: '/profile',
		failureRedirect: '/failure',
	}),
);

module.exports = facebookRouter;
