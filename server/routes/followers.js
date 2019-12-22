const express = require('express');
const router = express.Router();
const controller = require('../controllers/follower-controller');

router.get('/api/user/:id/followers/count', controller.getFollowerCount);
router.get('/api/user/:id/following/count', controller.getFollowingCount);
router.get('/api/user/:id/followers', controller.getFollowerList);
router.get('/api/user/:id/following', controller.getFollowingList);
router.post('/api/user/:id/follow', controller.followUser);
router.delete('/api/user/:id/unfollow', controller.unfollowUser);
router.post('/api/user/:id/accept', controller.acceptFollow);

module.exports = router;