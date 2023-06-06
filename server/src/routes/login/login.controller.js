const User = require('../../models/User');

async function loginUser(req, res) {
	try {
		const { email, password } = req.body;

		// Check if username and password is provided
		if (!email || !password) {
			return res.status(400).json({
				message: 'email or Password not present',
			});
		}
		const user = await User.findOne({ email, password });
		if (!user) {
			return res.status(401).json({ error: 'user not found' });
		}
		// Return the newly created user
		res.status(201).json({
			message: 'login successully',
			user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

module.exports = {
	loginUser,
};
