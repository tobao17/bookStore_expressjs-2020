const express = require('express');
var multer = require('multer')
const router = express.Router();
const userController = require('../controller/user.Controller');
const validate = require('../validate/user.validate');

var upload = multer({ dest: 'public/uploads/' }) //khong luu khong can 

router.get('/', userController.index);
router.get('/create', userController.create)
router.post('/create', validate.postCreate, userController.postCreate)
router.get('/delete/:id', userController.delete)

router.get('/update/:id', userController.update)
router.post('/update', userController.postUpdate)
router.get('/profile/:id', userController.profile)
router.get('/profile/avatar/:id', userController.profileAvatar)
router.post('/profile/avatar/:id', upload.single('avatar'), userController.postProfileAvatar)
module.exports = router;