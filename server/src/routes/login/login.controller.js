const User = require('../../models/User');

async function loginUser(req, res) {
	try {
		const { email, password } = req.body;

		// Check if a user with the provided email already exists
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
