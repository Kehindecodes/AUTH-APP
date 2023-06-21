const User = require('../../models/User');
// const cloudinary = require('../../cloudinary.setup');

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
	cloud_name: 'djto2ij0k',
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
	const file = req.file;
	console.log(file);
	// Upload file to Cloudinary
	cloudinary.uploader.upload(file.path, async (error, result) => {
		if (error) {
			console.error('Error uploading file to Cloudinary:', error);
			return res.status(500).json({ error: 'Error uploading file' });
		}

		// Store the Cloudinary URL in the user's profileImg field
		const imageUrl = result.secure_url;
		const email = req.user.email;

		// Update the user's profileImg field in the database

		const user = await User.findOne({
			email,
		});

		console.log(user);
		if (!user) {
			return res.status(404).json({ error: 'user not found' });
		}

		user.profileImage = imageUrl;

		// save to database
		await user.save();

		// Return the updated user object in the response
		res.json({ message: 'Image uploaded successfully' });
	});
}

module.exports = {
	editProfile,
	uploadImage,
};
