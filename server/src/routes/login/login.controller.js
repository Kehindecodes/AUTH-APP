require('dotenv').config();
const passport = require('passport');

function loginUser(req, res, next) {

	const { email, password } = req.body;

	if (!email) {
		return res.status(400).json({ error: 'Email is required' });
	}

	if (!password) {
		return res.status(400).json({ error: 'Password is required' });
	}

 passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json(info);
		}
		
		// return ok response
		return res.status(200).json({ message: 'Login successful' });
 } )(req, res, next);
};

module.exports = {
	loginUser,
};
