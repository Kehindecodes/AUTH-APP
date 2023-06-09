const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('./models/User');
require('dotenv').config();
const { Strategy, ExtractJwt } = passportJWT;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const GitHubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

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
	// const payload = {
	// 	sub: profile.id,
	// 	email: profile.emails[0].value,
	// 	// Add any other relevant user data to the payload
	// };

	// const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
	// 	expiresIn: '1h',
	// });
	done(null, profile);
	// return token;
}

const googleStrategy = new GoogleStrategy(GOOGLE_AUTH_OPTIONS, verifyCallback);

const gitHubStrategy = new GitHubStrategy(
	{
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: '/auth/github/callback',
	},
	(accessToken, refreshToken, profile, done) => {
		console.log('Google profile', profile);
		done(null, profile);
	},
);

const facebookStrategy = new FacebookStrategy(
	{
		clientID: process.env.FB_APP_ID,
		clientSecret: process.env.FB_APP_SECRET,
		callbackURL: '/auth/facebook/callback',
		profileFields: ['id', 'displayName', 'email'],
	},
	function (accessToken, refreshToken, profile, done) {
		console.log(`facebook user:${profile}`);
		// Handle the user profile data returned by Facebook
		// and create or authenticate the user in your system
		// You can access the user profile data using `profile` object
		// Call `done` with the user object or an error if something goes wrong
		// For example:
		// User.findOrCreate({ facebookId: profile.id }, function (err, user) {
		//   return done(err, user);
		// });
		done(null, profile);
	},
);
module.exports = { strategy, googleStrategy, gitHubStrategy, facebookStrategy };
