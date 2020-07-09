const mongoose = require('mongoose');
var transactionsSchema = new mongoose.Schema({
    bookId: String,
    userId: String,
    conut: Number,
    isisComplete:Boolean
});
var transactions = mongoose.model('transactions', transactionsSchema, 'transactions');
module.exports = transactions;