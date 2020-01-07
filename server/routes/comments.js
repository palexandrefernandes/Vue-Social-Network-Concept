const express = require('express');
const router = express.Router();
const controller = require('../controllers/comment-controller');

router.post('/api/post/:id/comment', controller.makeComment);

module.exports = router;