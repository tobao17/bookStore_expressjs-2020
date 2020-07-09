const shortId = require('shortid');
var db = require('../db.js');
const transactions = require('../model/transactions.model');
const User = require('../model/users.model');
const Book = require('../model/books.model');
module.exports.index = async(req, res) => {

    //var userCookie = db.get('user').find({ id: req.signedCookies.userId }).value();
    // var userCookie = User.findById(req.signedCookies.userId);
    // if (!userCookie.isAdmin) {
    //     let detailTransaction = await db.get('transactions').filter({ userId: userCookie.id }).value().map(x => {
    //         return {

    //             user: db.get('user').find({ "id": x.userId }).value().name,
    //             book: db.get('books').find({ id: x.bookId }).value().title,
    //             id: x.id,
    //             isComplete: x.isComplete
    //         }
    //     })

    //     res.render('./transaction/index', { trans: detailTransaction });
    //     return;
    // }

    // let detailTransaction = await db.get('transactions').value().map(x => {
    //     return {

    //         user: db.get('user').find({ "id": x.userId }).value().name,
    //         book: db.get('books').find({ "id": x.bookId }).value().title,
    //         id: x.id,
    //         isComplete: x.isComplete
    //     }
    // })
    let detailTransaction = await transactions.find();
    var  TransactionpromiseAll = await Promise.all(detailTransaction.map(async x => {   //nho cai lol nay
        try {
            var user = await User.findById(x.userId)
          
            var book = await Book.findById(x.bookId)
        //console.log(user
         
        } catch (error) {
            console.log(error + '')
        }
        return {
            book:book.title,
            user: user.name,
            id: x._id,
            isComplete: x.isComplete
        }

    })) 
//console.log(TransactionpromiseAll)
 
 

    res.render('./transaction/index', { trans: TransactionpromiseAll});
}
module.exports.create = async(req, res) => {
    let user = await User.find();

    let book = await Book.find();

    res.render('./transaction/create', { user: user, book: book });
}
module.exports.postCreate = async(req, res) => {

    // req.body.id = shortId.generate();
    await transactions.create(req.body);
    // db.get('transactions').push(req.body).write();

    res.redirect('./');
}
module.exports.isComplete = async(req, res) => {
    var error = [];
    let detailTransaction = await transactions.find();
    var  TransactionpromiseAll = await Promise.all(detailTransaction.map(async x => {   //nho cai lol nay
        try {
            var user = await User.findById(x.userId)
          
            var book = await Book.findById(x.bookId)
        //console.log(user
         
        } catch (error) {
            console.log(error + '')
        }
        return {
            book:book.title,
            user: user.name,
            id: x._id,
            isComplete: x.isComplete
        }

    })) 


    var x = transactions.findById(req.params.id)
    if (!x) {
        error.push('ban da thao tac sai')

    }
    if (error.length) {
        console.log(error)
        res.render('./transaction/index', { trans:TransactionpromiseAll, error: error });
    }
    console.log(error)
    await transactions.updateOne({"_id":req.params.id},{"isComplete":true})
    res.redirect('/transactions')

}