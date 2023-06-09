const express = require('express');
const router = express.Router();

const googleRoutes = require('./google');
const facebookRoutes = require('./facebook');
const githubRouter = require('./github');

router.use('/github', githubRouter);
router.use('/google', googleRoutes);
router.use('/facebook', facebookRoutes);

module.exports = router;
