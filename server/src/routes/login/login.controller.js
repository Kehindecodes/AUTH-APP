const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../../models/User');

function loginUser(req, res, next) {
	passport.authenticate(
		'local',
		{ session: false },
		(err, authenticatedUser, info) => {
			console.log(authenticatedUser);
			if (err) {
				return res.status(500).json({ error: 'Internal Server Error' });
			}

			if (!authenticatedUser) {
				return res.status(401).json({
					message:
						info && info.message ? info.message : 'Authentication failed',
				});
			}

			const user = authenticatedUser; // Assign the authenticated user to the `user` variable

			const payload = { sub: user._id };
			const secretKey = process.env.JWT_SECRET_KEY;
			const token = jwt.sign(payload, secretKey, {
				expiresIn: '1h',
			});

			// Store the token in a server-side variable
			req.session.token = token;
			console.log(req.session.token);
			// Redirect the user to the desired page upon successful authentication
			res.redirect('/profile');
		},
	)(req, res, next);
}

module.exports = {
	loginUser,
};
