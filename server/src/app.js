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
const User = require('./models/User');
const {
	JWTStrategy,
	googleStrategy,
	gitHubStrategy,
	facebookStrategy,
	localStrategy,
} = require('./passport-config');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY;

passport.use(localStrategy);
passport.use(JWTStrategy);
passport.use(googleStrategy);
passport.use(gitHubStrategy);
passport.use(facebookStrategy);

// save the session to the cookie
passport.serializeUser((user, done) => {
	done(null, user);
});

// read the session from the cookie

passport.deserializeUser((user, done) => {
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
app.use(express.urlencoded({ extended: false }));
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
// 	if (req.isAuthenticated()) {
// 		return next();
// 	} else {
// 		passport.authenticate('jwt', {
// 			session: false,
// 		})(req, res, next);
// 	}
// }
const verifyToken = (req, res, next) => {
	// Retrieve the token from the server-side variable
	const token = req.session.token;
	console.log(token);

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		// Verify and decode the token
		const decodedToken = jwt.verify(token, secretKey);
		console.log(decodedToken);

		// Attach the decoded token to the request object
		req.user = decodedToken;
		console.log(req.user);

		next();
	} catch (err) {
		// Handle any error that occurs during token verification
		console.error(err);
		res.status(401).json({ message: 'Invalid token' });
	}
};

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		passport.authenticate('jwt', { session: false })(req, res, () => {
			// Call verifyToken middleware after the passport.authenticate callback
			console.log(req.user);
			next();
		});
	}
}
function checkLoggedIn(req, res, next) {
	// check if user is authenticated
	const isLoggedIn = req.isAuthenticated() && req.user;
	console.log(req.isAuthenticated());
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
app.use('/profile', ensureAuthenticated, editProfileRouter);

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
