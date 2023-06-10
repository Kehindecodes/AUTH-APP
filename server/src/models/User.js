const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	profileImage: String,
	name: String,
	email: {
		type: String,
		required: true,
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
});

const User = mongoose.model('User', userSchema);

module.exports = User;
