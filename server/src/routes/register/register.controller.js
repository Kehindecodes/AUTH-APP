const User = require('../../models/User');

async function registerUser(req, res) {
	try {
		const { name, email, password } = req.body;

		// Check if a user with the provided email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ error: 'Email already exists' });
		}

		// Create a new user
		const user = new User({ name, email, password });
		await user.save();

		// Return the newly created user
		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

module.exports = {
	registerUser,
};
