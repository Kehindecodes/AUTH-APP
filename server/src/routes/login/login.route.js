const express = require('express');

const { loginUser } = require('./login.controller');

const loginUserRouter = express.Router();

loginUserRouter.post('/', loginUser);
loginUserRouter.get('/', (req, res) => res.send('login to your dashboard'));

module.exports = loginUserRouter;
