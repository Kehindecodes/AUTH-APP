const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = require('./models/User');
require('dotenv').config();

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET_KEY,
};

const strategy = new JwtStrategy(options, (payload, done) => {
	User.findOne(payload.sub)
		.then((user) => {
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		})
		.catch((err) => done(err, false));
});

module.exports = strategy;
