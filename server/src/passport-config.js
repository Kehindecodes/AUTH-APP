const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('./models/User');
require('dotenv').config();
const { Strategy, ExtractJwt } = passportJWT;
const options = {
	secretOrKey: process.env.JWT_SECRET_KEY,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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

module.exports = strategy;
