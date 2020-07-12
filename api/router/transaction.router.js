const express = require('express');
const router = express.Router();
const transController = require('../controller/transaction.controller');


router.get('/', transController.index)
router.get('/create', transController.create)
router.post('/create', transController.postCreate)
router.get('/:id/complete',transController.isComplete)
module.exports = router;