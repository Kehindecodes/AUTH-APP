const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const registerUserRouter = require('./routes/register/register.route');
const loginUserRouter = require('./routes/login/login.route');
const authRoutes = require('./routes/auth');
const editProfileRouter = require('./routes/profile/profile.router');
const forgotPasswordRouter = require('./routes/forgot-password/forgotPassword.route');
const resetPasswordRouter = require('./routes/reset-password/resetPassword.route');
const User = require('./models/User');
const {
	JWTStrategy,
	googleStrategy,
	gitHubStrategy,
	facebookStrategy,
	localStrategy,
} = require('./passport-config');
const otpRouter = require('./routes/otpVerification');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY;

passport.use(localStrategy);
passport.use(JWTStrategy);
passport.use(googleStrategy);
passport.use(gitHubStrategy);
passport.use(facebookStrategy);

// save the session to the cookie
passport.serializeUser((user, done) => {
	done(null, user._id);
});

// read the session from the cookie
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

const app = express();
// app.use(cors());
app.use(
	cors({
		origin: 'http://127.0.0.1:5173', // Add other allowed origins if necessary
		credentials: true,
	}),
);

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./public'));
app.use(express.json());
app.use(
	session({
		secret: process.env.COOKIE_KEY_2,
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

// const verifyToken = (req, res, next) => {
// 	// Retrieve the token from the server-side variable
// 	const token = req.session.token;
// 	console.log(token);

// 	if (!token) {
// 		return res.status(401).json({ message: 'Unauthorized' });
// 	}

// 	try {
// 		// Verify and decode the token
// 		const decodedToken = jwt.verify(token, secretKey);
// 		console.log(decodedToken);

// 		// Attach the decoded token to the request object
// 		req.user = decodedToken;
// 		console.log(req.user);

// 		next();
// 	} catch (err) {
// 		// Handle any error that occurs during token verification
// 		console.error(err);
// 		res.status(401).json({ message: 'Invalid token' });
// 	}
// };

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
// function checkLoggedIn(req, res, next) {
// 	// check if user is authenticated
// 	const isLoggedIn = req.isAuthenticated() && req.user;
// 	console.log(req.isAuthenticated());
// 	if (!isLoggedIn) {
// 		return res.status(401).json({
// 			error: 'You must log in',
// 		});
// 	}
// 	next();
// }

// routes
app.use('/auth/register', registerUserRouter);
app.use('/auth/login', loginUserRouter);
app.use('/auth', authRoutes);
app.use('/profile', ensureAuthenticated, editProfileRouter);
app.use('/reset-password', resetPasswordRouter);
app.use('/forgot-password', forgotPasswordRouter);
app.use('/verify', otpRouter);
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
	// res.render('index', { title: 'auth App', user: req.user });
});
module.exports = app;
