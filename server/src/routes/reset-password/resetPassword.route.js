const express = require('express');

const {
	showResetPasswordPage,
	resetPassword,
} = require('./resetPassword.controller');

const resetPasswordRouter = express.Router();

// Route for handling the password reset page
resetPasswordRouter.get('/', showResetPasswordPage);
resetPasswordRouter.post('/', resetPassword);

module.exports = resetPasswordRouter;
