const express = require('express');

const { loginUser } = require('./login.controller');

const loginUserRouter = express.Router();

loginUserRouter.post('/', loginUser);

module.exports = loginUserRouter;
