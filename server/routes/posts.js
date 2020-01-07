const express = require('express');
const multer = require('multer');
const controller = require('../controllers/post-controller');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null , Date.now().toString()+file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/api/post/:id', controller.getPost);
router.get('/api/post/:id/comments/count', controller.getCommentCount);
router.get('/api/post/:id/likes/count', controller.getLikeCount);
router.get('/api/user/:id/posts', controller.getUserPostsByUser);
router.get('/api/post/:id/comments', controller.getComments);
router.get('/api/post/:id/likes', controller.getLikes);
router.post('/api/post/:id/like', controller.like);
router.delete('/api/post/:id/like', controller.unlike);
router.get('/api/post/:id/like', controller.isLiked);

router.post('/api/post', upload.single('image'), controller.createPost);
router.delete('/api/post/:id', controller.deletePost);

router.get('/api/posts/feed', controller.getFeed);

module.exports = router;