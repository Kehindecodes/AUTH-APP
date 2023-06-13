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

function checkLoggedInWithToken(req, res, next) {
	// Check if the JWT token is present
	const token = req.headers.authorization;
	console.log(token);
	if (!token) {
		return res.status(401).json({ error: 'You must log in' });
	}

	try {
		// Verify and decode the JWT token
		const decoded = jwt.verify(token, secretKey);
		// Assuming the JWT payload contains the user ID
		const userId = decoded.sub;

		console.log(decoded);
		// Initialize req.user as an object and attach the user ID
		req.user = { id: userId };

		// Continue to the next middleware or route handler
		next();
	} catch (error) {
		// Handle invalid JWT or expired token
		return res.status(401).json({ error: 'Invalid or expired token' });
	}
}
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(401).json({ error: 'Unauthorized' });
}
// routes
app.use('/auth/register', registerUserRouter);
app.use('/auth/login', loginUserRouter);
app.use('/auth', authRoutes);
app.use(
	'/dashboard/profile',
	passport.authenticate('jwt', { session: false }),
	editProfileRouter,
);
app.get(
	'/dashboard',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.send(`welcome ${req.user.name}`);
	},
);

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
