const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const session = require('express-session');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const registerUserRouter = require('./routes/register/register.route');
const loginUserRouter = require('./routes/login/login.route');
const authRoutes = require('./routes/auth');
const editProfileRouter = require('./routes/profile/profile.router');

const {
	strategy,
	googleStrategy,
	gitHubStrategy,
	facebookStrategy,
} = require('./passport-config');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY;
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
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(
	session({
		secret: process.env.COOKIE_KEY_1,
		resave: false,
		saveUninitialized: false,
	}),
);
// Passport middleware setup
app.use(passport.initialize());

app.use(passport.session());

// serve a static file
// app.use(express.static(path.join(__dirname, '..', 'public')));

// function checkLoggedIn(req, res, next) {
// 	// check if user is authenticated
// 	console.log(req.user);
// 	const isLoggedIn = req.isAuthenticated() && req.user;

// 	if (!isLoggedIn) {
// 		return res.status(401).json({
// 			error: 'You must log in',
// 		});
// 	}
// 	next();
// }

// function ensureAuthenticated(req, res, next) {
// 	passport.authenticate('jwt', {
// 		session: false,
// 	})(req, res, next);
// }
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		passport.authenticate('jwt', {
			session: false,
		})(req, res, next);
	}
}

// routes
app.use('/auth/register', registerUserRouter);
app.use('/auth/login', loginUserRouter);
app.use('/auth', authRoutes);
app.use('/profile/edit', ensureAuthenticated, editProfileRouter);
app.get('/profile', ensureAuthenticated, (req, res) => {
	res.send(`welcome ${req.user.name}`);
	console.log(req.user._id);
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
	// res.sendFile(path.join(__dirname, '../public', 'index.html'));
	res.render('index', { title: 'auth App', user: req.user });
});
module.exports = app;
