// Import necessary modules
const express = require('express');
const { verifyOTP } = require('../middleware/verifyOtp');

const otpRouter = express.Router();

// GET route for the OTP verification page
otpRouter.get('/', (req, res) => {
	res.render('verify'); // Render the OTP verification page
});
// POST route to handle OTP verification
otpRouter.post('/', verifyOTP, (req, res) => {
	res.redirect('/profile'); // Render the OTP verification page
});

module.exports = otpRouter;
