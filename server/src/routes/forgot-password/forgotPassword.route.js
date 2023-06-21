const express = require('express');

const { sendPasswordResetEmail } = require('./forgotPassword.controller');

const forgotPasswordRouter = express.Router();

// Route for initiating the password reset
forgotPasswordRouter.post('/', sendPasswordResetEmail);
forgotPasswordRouter.get('/', (req, res) => {
	res.render('forgotPassword');
});

module.exports = forgotPasswordRouter;
