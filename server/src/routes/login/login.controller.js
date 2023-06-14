const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const util = require('util');
const compareAsync = util.promisify(bcrypt.compare);

async function loginUser(req, res) {
	try {
		const { email, password } = req.body;

		// Check if email and password are provided
		if (!email || !password) {
			return res.status(400).json({
				message: 'Email or password not present',
			});
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				error: 'User not found',
				message: 'Login not successful',
			});
		}

		const result = await compareAsync(password, user.password);
		if (result) {
			const payload = { sub: user._id };
			const secretKey = process.env.JWT_SECRET_KEY;
			const token = jwt.sign(payload, secretKey, {
				expiresIn: '1h',
			});

			return res.status(200).json({
				message: 'Login successful',
				user,
				token,
			});
		} else {
			return res.status(401).json({
				message: 'Incorrect password',
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}
module.exports = {
	loginUser,
};
