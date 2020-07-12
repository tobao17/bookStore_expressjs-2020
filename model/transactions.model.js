const mongoose = require('mongoose');
var transactionsSchema = new mongoose.Schema({
    bookId: String,
    userId: String,
    count: Number,
    isComplete:Boolean
});
var transactions = mongoose.model('transactions', transactionsSchema, 'transactions');
module.exports = transactions;