// forgotPasswordController.js
const User = require('../../models/User');
require('dotenv').config();
const bcrypt = require('bcryptjs');

function showResetPasswordPage(req, res) {
	const { resetToken } = req.query;

	// Render the password reset page with the reset token
	res.render('resetPassword', { resetToken });
}

async function resetPassword(req, res) {
	const { resetToken, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return res
			.status(400)
			.json({ error: 'Password and confirm password do not match' });
	}

	// Find the user by reset token and check if the token is still valid
	const user = await User.findOne({
		resetToken,
		resetTokenExpiration: { $gt: Date.now() },
	});

	console.log(user);
	if (!user) {
		return res.status(404).json({ error: 'Invalid or expired reset token' });
	}

	// Hash the new password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Update the user's password and reset token fields
	user.password = hashedPassword;
	user.resetToken = undefined;
	user.resetTokenExpiration = undefined;

	await user.save();

	res.json({ message: 'Password reset successfully' });
}

module.exports = {
	showResetPasswordPage,
	resetPassword,
};
