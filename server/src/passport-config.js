const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();
const { Strategy, ExtractJwt } = passportJWT;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const GitHubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

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

const localStrategy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},
	async (email, password, done) => {
		try {
			const user = await User.findOne({ email });

			if (!user) {
				return done(null, false, {
					message: 'User not found',
				});
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) {
				return done(null, false, {
					message: 'Incorrect password',
				});
			}

			return done(null, user);
		} catch (error) {
			return done(error);
		}
	},
);

const JWTStrategy = new Strategy(options, (payload, done) => {
	User.findById(payload.sub)
		.then((user) => {
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		})
		.catch((err) => done(err, false));
});
// Function to handle social login strategy
function handleSocialLogin(accessToken, refreshToken, profile, done) {
	console.log('profile', profile);
	console.log('your access  token:', accessToken);
	const { id, displayName, emails, photos } = profile;
	// Check if the user already exists in the database
	User.findOne({ _id: id })
		.then((existingUser) => {
			if (existingUser) {
				// User already exists, return the existing user
				return done(null, existingUser);
			} else {
				// Generate a random password
				const randomPassword = Math.random().toString(36).slice(-8);

				// Hash the password using bcrypt
				bcrypt.hash(randomPassword, 10, (err, hashedPassword) => {
					if (err) {
						// Handle hashing error
						return done(err, false);
					}

					// Create a new user document
					const newUser = new User({
						_id: id,
						name: displayName,
						email: emails[0].value,
						password: hashedPassword,
						profileImage: photos[0]?.value, // Optional: Save profile picture URL
					});

					// Save the user document to the database
					newUser
						.save()
						.then((user) => {
							// Handle successful save
							done(null, user);
						})
						.catch((err) => {
							// Handle save error
							done(err, false);
						});
				});
			}
		})
		.catch((err) => {
			// Handle database query error
			done(err, false);
		});
}

const googleStrategy = new GoogleStrategy(
	GOOGLE_AUTH_OPTIONS,
	handleSocialLogin,
);

const gitHubStrategy = new GitHubStrategy(
	{
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: '/auth/github/callback',
	},
	function (accessToken, refreshToken, profile, done) {
		console.log(' github profile', profile);
		console.log('your access  token:', accessToken);
		const { id, name, avatar_url, bio } = profile._json;
		// Check if the user already exists in the database
		User.findOne({ _id: id })
			.then((existingUser) => {
				if (existingUser) {
					// User already exists, return the existing user
					return done(null, existingUser);
				} else {
					// Generate a random password
					const randomPassword = Math.random().toString(36).slice(-8);

					// Hash the password using bcrypt
					bcrypt.hash(randomPassword, 10, (err, hashedPassword) => {
						if (err) {
							// Handle hashing error
							return done(err, false);
						}

						// Create a new user document
						const newUser = new User({
							_id: id,
							name: name,
							password: hashedPassword,
							profileImage: avatar_url,
							bio: bio,
							// Optional: Save profile picture URL
						});

						// Save the user document to the database
						newUser
							.save()
							.then((user) => {
								// Handle successful save
								done(null, user);
							})
							.catch((err) => {
								// Handle save error
								done(err, false);
							});
					});
				}
			})
			.catch((err) => {
				// Handle database query error
				done(err, false);
			});
	},
);

const facebookStrategy = new FacebookStrategy(
	{
		clientID: process.env.FB_APP_ID,
		clientSecret: process.env.FB_APP_SECRET,
		callbackURL: '/auth/facebook/callback',
		profileFields: ['id', 'displayName', 'email', 'picture'],
		scope: ['email'],
	},
	handleSocialLogin,
);
module.exports = {
	localStrategy,
	JWTStrategy,
	googleStrategy,
	gitHubStrategy,
	facebookStrategy,
};
