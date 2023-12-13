const User = require('../../models/User');
require('dotenv').config();

async function registerUser(req, res) {
	try {
		const { email, password } = req.body;

		// check if email was provided
		if (!email) {
			return res.status(400).json({ error: 'Email is required' });
		}

		// check if password was provided
		if (!password) {
			return res.status(400).json({ error: 'Password is required' });
		}

		// Check if a user with the provided email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ error: 'Email already exists' });
		}


		function generateRandomId() {
			const randomId = Math.floor(Math.random() * 1000000); // Adjust the range as needed
			return randomId;
		}

		const user = new User({
			_id: generateRandomId(),
			email,
			password: password,
			// secretKey: generateSecretKey(),
		});

		await user.save();
		// console.log('user is registered successfully');
		// res.json({ redirectTo: '/login' });
		res.status(201).json({
			message: 'User successfully created',
			user
		});

		//   };
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

module.exports = {
	registerUser,
};

