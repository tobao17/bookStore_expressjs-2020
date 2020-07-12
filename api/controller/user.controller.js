const shortId = require('shortid');
// var db = require('../db.js');
const User = require('../../model/users.model');
const bcryptjs = require('bcryptjs');
const transactions = require('../../model/transactions.model');

require("dotenv").config();
var cloudinary = require('cloudinary').v2;
cloudinary.config({ cloud_name: process.env.cloud_name, api_key: process.env.api_key, api_secret: process.env.api_secret });

module.exports.index = async(request, response) => {
    var page = (request.query.page) || 1;
    var perPage = 10;
    var start = (page - 1) * perPage;
    var end = page * perPage;
   
    var user = await User.find()
    response.json(user);
}
module.exports.postCreate = async(req, res) => {

    var hash = bcryptjs.hashSync(req.body.password);
    req.body.password = hash;
    req.body.isAdmin = false;
    req.body.wrongLoginCount = 0;
    //db.get('user').push(req.body).write();
    await User.create(req.body)
    res.redirect('/users')
}
module.exports.update = async(req, res) => {
    //var value = db.get('user').find({ "id": req.params.id }).value();
    var value = await User.findById(req.params.id);
    res.json(value)
}
module.exports.delete = async(req, res) => {
    //  db.get('user').remove({ "id": req.params.id }).value();
    await User.findByIdAndDelete(req.params.id);
    // db.get('transactions').remove({ "userId": req.params.id }).value();
 
    await transactions.deleteMany({"userId":req.params.id})
    res.redirect('/users');
}
module.exports.create = (req, res) => {
    res.render('./user/create');
}
module.exports.postUpdate = async(req, res) => {
    // db.get('user').find({ id: req.body.id })
    //     .assign({ name: req.body.name })
    //     .write()
    await User.updateOne({ "_id": req.body.id }, { "name": req.body.name })
    res.redirect('/users')
}
module.exports.profile = async(req, res) => {
    //  var value = db.get('user').find({ "id": req.params.id }).value();
    var value = await User.findById(req.params.id);
   
    res.render('./user/profile', { value: value });
}
module.exports.profileAvatar = async(req, res) => {
    //   var value = db.get('user').find({ "id": req.params.id }).value();
    var value = await User.findById(req.params.id);
 

    res.render('./user/profileAvatar', { value: value });
}
module.exports.postProfileAvatar = async(req, res) => {
  
    try {
        await cloudinary.uploader.upload(req.file.path, async(err, result) => {
            if (err) {
              
            }

            if (result) {
                await User.updateOne({ "_id": req.body.id }, { "avatarUrl": result.url });
                // doc.avatarUrl = result.url;
                //  await doc.save();
            }
        });

    } catch (error) {
        console.log(error.message + ' ')
    }

    res.redirect('/users')
}