const  express = require('express');

const {generateOtpController} = require('./generateOtp.controller');

const generateOtpRouter = express.Router();


generateOtpRouter.patch('/', generateOtpController);

module.exports = generateOtpRouter;