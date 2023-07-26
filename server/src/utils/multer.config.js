const multer = require('multer');
// Set up storage for uploaded files
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../uploads/'); // Set the destination folder for uploaded files
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname +
				'-' +
				uniqueSuffix +
				'.' +
				file.originalname.split('.').pop(),
		); // Set the filename for uploaded files
	},
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
