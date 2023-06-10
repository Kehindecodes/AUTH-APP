const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const session = require('express-session');
// const cookieParser = require('cookie-parser');
const registerUserRouter = require('./routes/register/register.route');
const loginUserRouter = require('./routes/login/login.route');
const authRoutes = require('./routes/auth');
const {
	strategy,
	googleStrategy,
	gitHubStrategy,
	facebookStrategy,
} = require('./passport-config');
require('dotenv').config();

passport.use(strategy);
passport.use(googleStrategy);
passport.use(gitHubStrategy);
passport.use(facebookStrategy);

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

app.use(
	session({
		secret: process.env.COOKIE_KEY_1,
		resave: false,
		saveUninitialized: false,
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
app.use('/auth', authRoutes);

app.get('/dashboard', checkLoggedIn, (req, res) => {
	res.send(`welcome to your dashboard`);
});
app.get('/failure', (req, res) => {
	return res.send('failed to log in!');
});
app.get('/logout', (req, res) => {
	return res.send('you are logged out');
});

app.get('/auth/logout', (req, res) => {
	req.logout(function (err) {
		if (err) {
			// Handle any potential errors
			console.error(err);
		}
		res.redirect('/logout');
	});
});
app.get('/', (req, res) => {
	// res.send('I dey work jare');
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
module.exports = app;
