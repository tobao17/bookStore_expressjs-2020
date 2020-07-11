 const shortId = require('shortid');
 var db = require('../db.js');
 const Book = require('../model/books.model');
 require("dotenv").config();
 var cloudinary = require('cloudinary').v2;
 cloudinary.config({ cloud_name: process.env.cloud_name, api_key: process.env.api_key, api_secret: process.env.api_secret });
 module.exports.index = async(request, response) => {
     var books = await Book.find();


     response.render('./books/index', { book: books });
 }
 module.exports.create = (req, res) => {
     res.render('./books/create');
 }
 module.exports.delete = async(req, res) => {
     await Book.deleteOne({ _id: req.params.id }, (err) => {
         if (err)
             console.log(err);
         return;
     })
    // db.get('transactions').remove({ "bookId": req.params.id }).value();
    await transactions.deleteMany({"bookId":req.params.id})
     res.redirect('/books');
 }
 module.exports.update = async(req, res) => {
     // var value = db.get('books').find({ "id": req.params.id }).value();
     var value = await Book.findById(req.params.id)
     res.render('./books/update', { value: value })
 }
 module.exports.postCreate = async(req, res) => {

     await cloudinary.uploader.upload(req.file.path, (err, result) => {
         if (result) {
             req.body.imageBookurl = result.url

         }
     });
     req.body.count = 1;
     await Book.create(req.body)
     res.redirect('/books');

 }
 module.exports.postUpdate = async(req, res) => {

     //  db.get('books').find({ id: req.body.id })
     //      .assign({ title: req.body.title, description: req.body.description })
     //      .write()
     await Book.updateOne({ _id: req.body.id }, { title: req.body.title }, { descripton: req.body.descripton }, (err) => {
         if (err)
             console.log(err)
     })
     res.redirect('/books')
 }