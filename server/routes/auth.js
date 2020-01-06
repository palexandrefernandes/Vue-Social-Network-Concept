const express = require('express');
const controller = require('../controllers/auth-controller');
const { authenticate } = require('../middlewares/passport');
const router = express.Router();

router.use(authenticate);

router.post('/api/auth/signup', controller.signup);
router.post('/api/auth/token', controller.getToken);
router.post('/api/auth/email', controller.emailCheck);
router.post('/api/auth/handle', controller.handleCheck);

module.exports = router;
