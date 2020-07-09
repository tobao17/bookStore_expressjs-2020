const mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    id: String,
    imageBookurl: String,
    conut: Number
});
var Book = mongoose.model('Book', bookSchema, 'books');
module.exports = Book;