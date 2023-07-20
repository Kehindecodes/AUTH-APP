const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../../models/User');
const { generateOTP, sendOTPViaEmail } = require('../../middleware/otp');

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

function verifyOTP(req, res, next) {
	const enteredOTP = req.body.theOTP; // Get the entered OTP from the request body
	const storedOTP = req.session.otp; // Get the stored OTP from the session
	const user = req.session.user;
	console.log(enteredOTP);
	console.log(storedOTP);
	if (enteredOTP === storedOTP) {
		// OTP is valid, generate JWT token
		// Assuming the authenticated user is stored in req.user
		const payload = { sub: user._id };
		const secretKey = process.env.JWT_SECRET_KEY;
		const token = jwt.sign(payload, secretKey, {
			expiresIn: '1h',
		});

		console.log('user successfully verified');
		// Send the token back to the client
		res.json({ token: token });
	} else {
		// Invalid OTP, display an error message
		res.status(401).json({ message: 'Invalid OTP' });
	}
}

module.exports = {
	loginUser,
	verifyOTP,
};
