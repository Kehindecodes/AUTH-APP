const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

		bcrypt.compare(password, user.password, function (err, result) {
			if (result) {
				const payload = { sub: user._id };
				const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
					expiresIn: '1h',
				});

				return res.status(200).json({
					message: 'Login successful',
					user,
					token,
				});
			} else {
				return res.status(401).json({
					message: 'Login not successful',
					error: err,
				});
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

module.exports = {
	loginUser,
};
