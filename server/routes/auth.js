const express = require('express');
const controller = require('../controllers/auth-controller');
const router = express.Router();

router.post('/api/auth/signup', controller.signup);

module.exports = router;
