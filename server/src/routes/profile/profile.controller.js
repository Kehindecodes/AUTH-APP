const User = require('../../models/User');

async function editProfile(req, res, next) {
	try {
		const userId = req.user._id; // Assuming you have implemented user authentication and have access to the user ID
		const { name, bio, phone, email } = req.body;

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

		// Save the updated user
		await user.save();

		res.redirect('/profile');
		console.log(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

async function uploadImage(req, res) {
	if (!req.file) {
		return res.status(400).json({ error: 'No file uploaded' });
	}

	// Get the user ID from the authenticated user (you may have a different way of obtaining the user ID)
	const userId = req.user.id;

	try {
		// Find the user by ID
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Update the profileImage field with the file path
		user.profileImage = req.file.path;

		// Save the updated user document
		await user.save();

		// Return a success response
		res.json({ message: 'Profile image uploaded successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

module.exports = {
	editProfile,
	uploadImage,
};
