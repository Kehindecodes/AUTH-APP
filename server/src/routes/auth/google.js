const express = require('express');
const passport = require('passport');

const googleRouter = express.Router();

googleRouter.get(
	'/',
	passport.authenticate('google', {
		// data that we need from google
		scope: ['profile', 'email'],
	}),
);

googleRouter.get(
	'/callback',
	passport.authenticate('google', {
		failureRedirect: '/failure',
		successRedirect: '/profile',
		session: true,
	}),
	(req, res) => {
		console.log('Google called us back');
	},
);

module.exports = googleRouter;
