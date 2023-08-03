const User = require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
	// Extract cookies from the request
	const cookies = req.cookies;

	// If 'jwt' cookie (refresh token) is missing, send 401 Unauthorized response
	if (!cookies?.jwt) {
		return res.sendStatus(401);
	}

	// Extract the refresh token from the cookie
	const refreshToken = cookies.jwt;

	// Use the User model to find a user with the given refresh token
	User.findOne({ refreshToken }).exec((err, user) => {
		// Handle database query errors or no matching user
		if (err || !user) {
			return res.sendStatus(403); // Send 403 Forbidden response
		}

		// Generate a new access token with the user's userId as payload
		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: '30s' },
		);

		// Clear the refreshToken in the user's data
		user.refreshToken = '';

		// Save the user's data with the updated refreshToken
		user.save((err) => {
			// Handle database save errors
			if (err) {
				return res.sendStatus(403); // Send 403 Forbidden response
			}

			// Send the newly generated access token in a JSON response
			res.json({ accessToken });
		});
	});
};

module.exports = {
	handleRefreshToken,
};
