const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../../models/User');
const { generateOTP, sendOTPViaEmail } = require('../../middleware/otp');

function loginUser(req, res, next) {
	passport.authenticate(
		'local',
		{ session: false },
		(err, authenticatedUser, info) => {
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
			console.log(user);
			const otp = generateOTP();
			req.session.otp = otp; // Store the OTP in the session
			req.session.user = user;
			console.log(otp);
			// send otp to user's address
			sendOTPViaEmail(user.email, otp);
			// Redirect the user to the OTP verification page
			res.json({ redirectTo: '/verify' });
		},
	)(req, res, next);
}

function verifyOTP(req, res, next) {
	const enteredOTP = req.body.otp; // Get the entered OTP from the request body
	const storedOTP = req.session.otp; // Get the stored OTP from the session
	const user = req.session.user;
	console.log(enteredOTP);
	console.log(storedOTP);
	if (enteredOTP === storedOTP) {
		// OTP is valid, generate JWT token
		// Assuming the authenticated user is stored in req.user
		console.log(user);
		const payload = { sub: user._id };
		const secretKey = process.env.JWT_SECRET_KEY;
		const token = jwt.sign(payload, secretKey, {
			expiresIn: '1h',
		});

		// Send the token back to the client
		res.json({ token });
	} else {
		// Invalid OTP, display an error message
		res.status(401).json({ message: 'Invalid OTP' });
	}
}

module.exports = {
	loginUser,
	verifyOTP,
};
