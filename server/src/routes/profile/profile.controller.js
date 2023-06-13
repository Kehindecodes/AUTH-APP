const User = require('../../models/User');

async function editProfile(req, res, next) {
	try {
		const userId = req.user._id; // Assuming you have implemented user authentication and have access to the user ID
		const { name, bio, phone, email, password } = req.body;

		// Find the user by ID
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Update the user profile fields
		user.name = name || user.name;
		user.bio = bio || user.bio;
		user.phone = phone || user.phone;
		user.email = email || user.email;
		user.password = password || user.password;

		// Save the updated user
		await user.save();

		res.status(200).json({ message: 'Profile updated successfully', user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

module.exports = {
	editProfile,
};
