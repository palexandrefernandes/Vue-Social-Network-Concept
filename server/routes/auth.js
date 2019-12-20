const express = require('express');
const controller = require('../controllers/auth-controller');
const router = express.Router();
const m = require('../middlewares/authenticate');

router.use(m);

router.post('/api/auth/signup', controller.signup);

router.post('/api/auth/token', controller.getToken);


module.exports = router;
