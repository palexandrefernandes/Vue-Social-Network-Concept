const express = require('express');
const router = express.Router();
const controller = require('../controllers/post-controller');

router.get('/api/post/:id', controller.getPost);
router.get('/api/post/:id/comments/count', controller.getCommentCount);
router.get('/api/post/:id/likes/count', controller.getLikeCount);
router.get('/api/user/:id/posts', controller.getUserPostsByUser);
router.get('/api/post/:id/comments', controller.getComments);
router.get('/api/post/:id/likes', controller.getLikes);

router.post('/api/post', controller.createPost);
router.put('/api/post/:id', controller.editPost);
router.delete('api/post/:id', controller.deletePost);

module.exports = router;