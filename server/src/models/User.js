const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	photo: String,
	name: String,
	email: String,
	password: String,
	bio: String,
	phone: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
