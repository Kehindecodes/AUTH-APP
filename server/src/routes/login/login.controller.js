const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../../models/User');
const generateJwt = require('../../utils/generateJwt');
const { generateOTP, sendOTPViaEmail } = require('../../utils/otp');

function loginUser(req, res, next) {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err) {
			return res.status(500).json({ error: 'Internal Server Error' });
		}

		if (!user) {
			return res.status(401).json({
				message: info && info.message ? info.message : 'Authentication failed',
			});
		}

		req.logIn(user, (err) => {
			if (err) {
				return res.status(500).json({ error: 'Internal Server Error' });
			}

			const otp = generateOTP();
			req.session.otp = otp; // Store the OTP in the session
			req.session.user = user;
			console.log(user);
			console.log(otp);
			// send otp to user's address
			sendOTPViaEmail(user.email, otp);
			// Redirect the user to the OTP verification page
			res.json({ redirectTo: '/verify' });
		});
	})(req, res, next);
}

module.exports = {
	loginUser,
};
