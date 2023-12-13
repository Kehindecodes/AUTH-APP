const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
		minLength: 6,
	},
	bio: String,
	phone: Number,
	otp: {
		type: Object,
		default: null,
	},
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
