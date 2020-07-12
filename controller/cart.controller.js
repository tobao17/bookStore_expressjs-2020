//var db=require('../db.js');
const Session = require('../model/session.model');
const Book = require('../model/books.model');
const transactions = require('../model/transactions.model');
const shortId = require('shortid');
const { session } = require('../validate/session.validate');
const { countDocuments, find, findOne } = require('../model/session.model');
module.exports.index=async (req,res)=>{
   var sessionId=req.signedCookies.sessionId;
    if(!sessionId) 
    {
      res.redirect('/books');
      return ;
    }
  var productSession = await Session.findOne({"id":sessionId})
  
  console.log(productSession)
  var productBook=[];
  if (productSession.cart)
    {
       for (let val in productSession.cart)
    {

      var x =await Book.findById(val);
      x.count=productSession.cart[val];
      productBook.push (x);
    }
 
  }
  //console.log(productBook);
  
  res.render('cart/index.pug',{product:productBook});
}
module.exports.addToCart=async(req,res)=>{
  var bookId=req.params.id;
  var sessionId=req.signedCookies.sessionId;
  if(!sessionId) 
    {
      res.redirect('/books');
      return ;
    }

 //cach 1
//  var session = await Session.findById(sessionId);
// session.cart[productId] = session.cart[productId] + 1;
// await session.save();

//chu y cai nay
await Session.findOneAndUpdate({"id":sessionId}, {
	$inc: {   //khon vcl chu y $inc
		['cart.' + bookId]: 1
	}
});

res.redirect('/books')
}
module.exports.checkout=async(req,res)=>{
  var sessionId=req.signedCookies.sessionId;
  if (!req.signedCookies.userId)
    {
      res.redirect('/auth/login')
      return;
    }
   var productSession =await Session.findOne({"id":sessionId})
  for (let val in productSession.cart)
    {
      var bookUser={};
      bookUser.id=val
      bookUser.count=productSession.cart[val];
      bookUser.userId=req.signedCookies.userId;
      bookUser.bookId=val
      transactions.create(bookUser)
    }
await Session.updateOne({"id":sessionId},{"cart":{}})

res.redirect('/books');
}
