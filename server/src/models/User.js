const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	_id: Number,
	profileImage: String,
	name: String,
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		unique: true,
		minLength: 6,
	},
	bio: String,
	phone: Number,
	resetToken: {
		type: String,
		default: null,
	},
	resetTokenExpiration: {
		type: Date,
		default: null,
	},
	secretKey: {
		type: String,
		default: null,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
