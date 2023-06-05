const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');

const app = express();

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
// app.use('/planets', planetsRouter);
// app.use('/launches', launchesRouter);

app.get('/', (req, res) => {
	// res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
	res.send('welcome to the auth app wow');
});
module.exports = app;
