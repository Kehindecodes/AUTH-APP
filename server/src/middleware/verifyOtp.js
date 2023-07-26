const { generateToken } = require('../utils/generateJwt');

function verifyOTP(req, res, next) {
	const enteredOTP = req.body.theOTP; // Get the entered OTP from the request body
	const storedOTP = req.session.otp; // Get the stored OTP from the session
	const user = req.session.user;
	console.log(enteredOTP);
	console.log(storedOTP);
	if (enteredOTP === storedOTP) {
		// OTP is valid, generate JWT token
		// Assuming the authenticated user is stored in req.user
		generateToken(res, user._id);

		// const payload = { sub: user._id };
		// const secretKey = process.env.JWT_SECRET_KEY;
		// const token = jwt.sign(payload, secretKey, {
		// 	expiresIn: '1h',
		// });

		console.log('user successfully verified');
		next();
	} else {
		// Invalid OTP, display an error message
		res.status(401).json({ message: 'Invalid OTP' });
	}
}

module.exports = {
	verifyOTP,
};
