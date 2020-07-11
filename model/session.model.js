const mongoose = require('mongoose');
var sessionSchema = new mongoose.Schema({
    "id":String,
    "cart":[{}]
});
var Session = mongoose.model('Session',sessionSchema, 'session');
module.exports = Session;

