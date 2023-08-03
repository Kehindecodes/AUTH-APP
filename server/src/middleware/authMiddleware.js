const jwt = require('jsonwebtoken');
require('dotenv').config();
async function ensureAuthenticated(req, res, next) {
	const authHeader = req.headers['authorization'];
	if (req.isAuthenticated()) {
		return next();
	} else {
		if (authHeader) {
			try {
				console.log(authHeader);
				const token = authHeader.split(' ')[1];
				jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
					if (err) {
						return res
							.status(401)
							.json({ message: 'Not authorized, token failed' });
					}
					req.user = decoded.userId;
					next();
				});
			} catch (error) {
				console.error(error);
				return res
					.status(401)
					.json({ message: 'Not authorized, token failed' });
			}
		} else {
			return res.status(401).json({ message: 'Not authorized, no token' });
		}
	}
}

module.exports = { ensureAuthenticated };
