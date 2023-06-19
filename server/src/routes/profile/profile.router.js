const express = require('express');

const { editProfile } = require('./profile.controller');

const editProfileRouter = express.Router();

editProfileRouter.get('/', (req, res) => {
	console.log(req.user);
	res.render('profile', { user: req.user });
	// res.send(`welcome ${req.user.name}`);
	// console.log(req.user._id);
});

editProfileRouter.post('/edit', editProfile);
editProfileRouter.get('/edit', (req, res) => {
	res.render('edit', { user: req.user });
});

module.exports = editProfileRouter;
