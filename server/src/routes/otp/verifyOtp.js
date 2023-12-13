// const { generateToken } = require('../utils/generateJwt');
const User = require('../../models/User');

 async function verifyOTP(req, res, next) {
	const {email,otp} = req.body
	const enteredOTP = otp; // Get the entered OTP from the request body
	const user = await User.findOne({ email });
    const storedOTP =  user.otp.otp 
	console.log(enteredOTP);
	console.log(storedOTP);

if (!otp) {
		return res.status(400).json({ message: 'OTP is required' });
	}
	if (enteredOTP === storedOTP) {
		// console.log('user successfully verified');
		return res.status(200).json({message:'user successfully verified'})
	} else {
		// Invalid OTP, display an error message
		return res.status(401).json({ message: 'Invalid OTP' });
	}
}

module.exports = {
	verifyOTP,
};
