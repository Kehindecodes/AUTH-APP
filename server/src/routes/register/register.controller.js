const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

		function generateRandomId() {
			const randomId = Math.floor(Math.random() * 1000000); // Adjust the range as needed
			return randomId;
		}
		const user = new User({
			_id: generateRandomId(),
			name,
			email,
			password: hash,
		});
		const payload = { sub: user._id };
		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: '1h',
		});

		await user.save();

		res.status(201).json({
			message: 'User successfully created',
			user,
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

module.exports = {
	registerUser,
};
