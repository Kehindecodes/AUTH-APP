const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('./models/User');
require('dotenv').config();
const { Strategy, ExtractJwt } = passportJWT;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const options = {
	secretOrKey: process.env.JWT_SECRET_KEY,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const GOOGLE_AUTH_OPTIONS = {
	callbackURL: '/auth/google/callback',
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	scope: ['profile', 'email'],
};

const strategy = new Strategy(options, (payload, done) => {
	User.findById(payload.sub)
		.then((user) => {
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		})
		.catch((err) => done(err, false));
});

function verifyCallback(accessToken, refreshToken, profile, done) {
	console.log('Google profile', profile);
	// Generate JWT token
	const payload = {
		sub: profile.id,
		email: profile.emails[0].value,
		// Add any other relevant user data to the payload
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: '1h',
	});
	done(null, profile);
	return token;
}

const googleStrategy = new GoogleStrategy(GOOGLE_AUTH_OPTIONS, verifyCallback);
module.exports = { strategy, googleStrategy };
