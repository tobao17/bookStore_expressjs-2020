const express = require('express');
const router = express.Router();
const shortId = require('shortid');
const transController = require('../controller/transactions.controller');

var db = require('../db.js');
router.get('/', transController.index)
router.get('/create', transController.create)
router.post('/create', transController.postCreate)
router.get('/:id/complete', transController.isComplete)
module.exports = router;