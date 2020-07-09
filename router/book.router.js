const express = require('express');
const router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' })
const bookController = require('../controller/book.controller');

// https://expressjs.com/en/starter/basic-routing.html
router.get('/', bookController.index);

router.get('/create', bookController.create)
router.get('/delete/:id', bookController.delete)
router.get('/update/:id', bookController.update)
router.post('/create', upload.single('books'), bookController.postCreate)
router.post('/update', bookController.postUpdate)
module.exports = router;