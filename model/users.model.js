const mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
    password: String,
    email: String,
    wrongLoginCount: Number,
    isAdmin: Boolean,
    name: String,
    avatarUrl: String
});
var Users = mongoose.model('users', bookSchema, 'users');
module.exports = Users;