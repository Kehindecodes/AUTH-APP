const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const OTPAuth = require('otpauth');
const { base32 } = require('hi-base32');

async function registerUser(req, res) {
	try {
		const { email, password } = req.body;

		// Check if a user with the provided email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ error: 'Email already exists' });
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		function generateRandomId() {
			const randomId = Math.floor(Math.random() * 1000000); // Adjust the range as needed
			return randomId;
		}

		const user = new User({
			_id: generateRandomId(),
			email,
			password: hash,
			// secretKey: generateSecretKey(),
		});

		await user.save();
		console.log('user is registered successfully');
		res.json({ redirectTo: '/login' });
		// res.status(201).json({
		// 	message: 'User successfully created',
		// 	user,
		// 	token,
		// });

		//   };
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

module.exports = {
	registerUser,
};
