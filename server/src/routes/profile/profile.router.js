const express = require('express');
const { editProfile, uploadImage } = require('./profile.controller');
const multer = require('multer');
const upload = multer({ dest: '../../../uploads/' });

const editProfileRouter = express.Router();

editProfileRouter.get('/', (req, res) => {
	console.log(`welcome ${req.user.sub}`);
	res.render('profile', { user: req.user });
	// res.send(`welcome ${req.user.name}`);
	// console.log(req.user._id);
});

editProfileRouter.post('/edit', editProfile);
editProfileRouter.get('/edit', (req, res) => {
	res.render('edit', { user: req.user });
});

editProfileRouter.post(
	'/upload-profile-image',
	upload.single('profileImage'),
	uploadImage,
);

module.exports = editProfileRouter;
