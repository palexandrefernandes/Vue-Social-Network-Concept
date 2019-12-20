const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');

router.get('/api/user/:id', controller.getUserById);
router.get('/api/user/search/:q', controller.searchUsers);

module.exports = router;
