const User = require('../../models/User');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {
	try {
		const { name, email, password } = req.body;

		// Check if a user with the provided email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ error: 'Email already exists' });
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const user = new User({ name, email, password: hash });
		await user.save();

		res.status(201).json({
			message: 'User successfully created',
			user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

module.exports = {
	registerUser,
};
