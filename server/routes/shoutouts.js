const express = require('express');
const router = express.Router();
const controller = require('../controllers/shoutout-controller');

router.get('api/shoutouts', controller.getPendingUserShoutouts);
router.get('api/post/:id/shoutouts', controller.getPostShoutouts);
router.post('api/post/:id/shoutout', controller.addShoutout);
router.post('api/post/:id/shoutout/confirm', controller.confirmOrUpdateShoutout);
router.post('api/post/:id/shoutout/deny', controller.denyShoutout);
router.delete('api/post/:id/shoutout/delete', controller.deleteShoutout);

module.exports = router;