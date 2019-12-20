const express = require('express');
const controller = require('../controllers/auth-controller');
const { authenticate } = require('../middlewares/passport');
const router = express.Router();

router.use(authenticate);

router.post('/api/auth/signup', controller.signup);
router.post('/api/auth/token', controller.getToken);

module.exports = router;
