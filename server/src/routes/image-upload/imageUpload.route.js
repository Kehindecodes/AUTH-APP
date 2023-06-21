const express = require('express');
const upload = require('../../middleware/multer.config');

const { uploadImage } = require('./imageUpload.controller');

const uploadImageRouter = express.Router();

uploadImageRouter.post('/', upload.single('profileImage'), uploadImage);

module.exports = uploadImageRouter;
