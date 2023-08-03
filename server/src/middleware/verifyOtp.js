const { generateToken } = require('../utils/generateJwt');

function verifyOTP(req, res, next) {
	const enteredOTP = req.body.otp; // Get the entered OTP from the request body
	const storedOTP = req.session.otp; // Get the stored OTP from the session
	const user = req.session.user;
	console.log(enteredOTP);
	console.log(storedOTP);
	if (enteredOTP === storedOTP) {
		// OTP is valid, generate JWT token
		// Assuming the authenticated user is stored in req.user

		console.log('user successfully verified');

		return generateToken(res, user._id);
	} else {
		// Invalid OTP, display an error message
		return res.status(401).json({ message: 'Invalid OTP' });
	}
}

module.exports = {
	verifyOTP,
};
