const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../../models/User');
require('dotenv').config();

// Create a transporter using your email service provider configuration
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'olamiposi.oki@gmail.com',
		pass: process.env.EMAIL_PASSWORD,
	},
});

async function sendPasswordResetEmail(req, res) {
	const { email } = req.body;

	// Generate a unique reset token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Find the user by email
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	// Update the reset token and expiration timestamp
	user.resetToken = resetToken;
	user.resetTokenExpiration = Date.now() + 3600000; // Reset token expires in 1 hour

	console.log(user);
	// Save the updated user document
	await user.save();

	// Create the password reset email
	const mailOptions = {
		from: 'olamiposi.oki@gmail.com',
		to: user.email,
		subject: 'Password Reset',
		text: `You are receiving this email because you requested a password reset. Please click on the following link to reset your password: http://localhost:8080/reset-password?resetToken=${resetToken}`,
	};

	// Send the email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
			return res
				.status(500)
				.json({ error: 'Error sending password reset email' });
		}

		console.log('Password reset email sent: ', info.response);
		res.json({ message: 'Password reset email sent' });
	});
}

module.exports = {
	sendPasswordResetEmail,
};
