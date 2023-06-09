const express = require('express');
const router = express.Router();

const googleRoutes = require('./google/google.routes');

router.use('/google', googleRoutes);

module.exports = router;
