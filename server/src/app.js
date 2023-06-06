const express = require('express');
const passport = require('passport');
const registerUserRouter = require('./routes/register/register.route');
const loginUserRouter = require('./routes/login/login.route');
const strategy = require('./passport-config');

const app = express();
// Passport middleware setup
app.use(passport.initialize());
passport.use(strategy);
// app.use(morgan('combined'));
app.use(express.json());
// serve a static file
// app.use(express.static(path.join(__dirname, '..', 'public')));

// app.use('/v1', api);
// routes
app.use('/register', registerUserRouter);
app.use('/login', loginUserRouter);
// app.use('/launches', launchesRouter);
app.get(
	'/protected-route',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// Access is granted if the authentication is successful
		res.json({ message: 'Access granted!' });
	},
);
app.get('/', (req, res) => {
	// res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
	res.send('welcome to the auth app wow');
});
module.exports = app;
