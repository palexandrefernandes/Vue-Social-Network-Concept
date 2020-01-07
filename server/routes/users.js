const express = require('express');
const controller = require('../controllers/user-controller');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/user');
    },
    filename: function (req, file, cb) {
        cb(null , Date.now().toString()+file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/api/user/:id', controller.getUserById);
router.get('/api/user/search/:q', controller.searchUsers);
router.delete('/api/user/:id', controller.deleteUserAccount);
router.put('/api/user', upload.single('image'), controller.updateUserProfile);


module.exports = router;
