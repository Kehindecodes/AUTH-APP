const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
	cloud_name: 'djto2ij0k',
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const disUpload = () => {
	console.log(cloudinary.uploader.upload);
};
console.log(disUpload);

module.exports = { cloudinary };
