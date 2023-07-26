const jwt = require('jsonwebtoken');

const User = require('../../models/User');

async function ensureAuthenticated(req, res, next) {
	let token;
	token = req.cookies.token;
	if (req.isAuthenticated()) {
		return next();
	} else {
		if (token) {
			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET);

				req.user = await User.findById(decoded.userId).select('-password');

				next();
			} catch (error) {
				console.error(error);
				res.status(401);
				throw new Error('Not authorized, token failed');
			}
		} else {
			res.status(401);
			throw new Error('Not authorized, no token');
		}
	}
}

exports.module = ensureAuthenticated;
