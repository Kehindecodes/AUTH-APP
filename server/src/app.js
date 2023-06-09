const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
// const cookieParser = require('cookie-parser');
const registerUserRouter = require('./routes/register/register.route');
const loginUserRouter = require('./routes/login/login.route');
const strategy = require('./passport-config');
require('dotenv').config();

passport.use(strategy);

// save the session to the cookie
passport.serializeUser((user, done) => {
	done(null, user);
});

// read the session from the cookie
passport.deserializeUser((user, done) => {
	// User.findById(id).then(user=>{
	// 	done(null, user)
	// })
	done(null, user);
});
const app = express();

// app.use(cookieParser());
app.use(
	cookieSession({
		name: 'session',
		maxAge: 24 * 60 * 60 * 1000,
		// sign cookies with these keys
		keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
	}),
);
app.use(express.json());
// Passport middleware setup
app.use(passport.initialize());
app.use(passport.session());

// serve a static file
// app.use(express.static(path.join(__dirname, '..', 'public')));

function checkLoggedIn(req, res, next) {
	// check if user is authenticated
	console.log(req.user);
	const isLoggedIn = req.isAuthenticated() && req.user;

	if (!isLoggedIn) {
		return res.status(401).json({
			error: 'You must log in',
		});
	}
	next();
}
// routes
app.use('/auth/register', registerUserRouter);
app.use('/auth/login', loginUserRouter);

app.get(
	'/dashboard',
	passport.authenticate('jwt', {
		session: false,
		failureRedirect: '/auth/login',
	}),
	(req, res) => {
		res.send(`welcome to your dashboard`);
	},
);
app.get('/', (req, res) => {
	// res.send('I dey work jare');
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
module.exports = app;
