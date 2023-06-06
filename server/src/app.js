const express = require('express');
const app = express();
const registerUserRouter = require('./routes/register/register.route');
const loginUserRouter = require('./routes/login/login.route');

// app.use(
// 	cors({
// 		origin: 'http://localhost:3000',
// 	}),
// );
// app.use(morgan('combined'));
app.use(express.json());
// serve a static file
// app.use(express.static(path.join(__dirname, '..', 'public')));

// app.use('/v1', api);
// routes
app.use('/register', registerUserRouter);
app.use('/login', loginUserRouter);
// app.use('/launches', launchesRouter);

app.get('/', (req, res) => {
	// res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
	res.send('welcome to the auth app wow');
});
module.exports = app;
