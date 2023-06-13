const express = require('express');

const { editProfile } = require('./profile.controller');

const editProfileRouter = express.Router();

editProfileRouter.put('/', editProfile);

module.exports = editProfileRouter;
