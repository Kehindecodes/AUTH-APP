const express = require('express');
const passport = require('passport');

const githubRouter = express.Router();

githubRouter.get('/', passport.authenticate('github'));

githubRouter.get(
	'/callback',
	passport.authenticate('github', {
		successRedirect: '/dashboard',
		failureRedirect: '/failure',
		session: true,
	}),
);

module.exports = githubRouter;
