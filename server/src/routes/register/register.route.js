const express = require('express');

const { registerUser } = require('./register.controller');

const registerUserRouter = express.Router();

registerUserRouter.post('/', registerUser);

module.exports = registerUserRouter;
