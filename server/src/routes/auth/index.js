const express = require('express');
const router = express.Router();

const googleRoutes = require('./google');
const githubRoutes = require('./github');
const githubRouter = require('./github');

router.use('/github', githubRouter);
router.use('/google', googleRoutes);

module.exports = router;
