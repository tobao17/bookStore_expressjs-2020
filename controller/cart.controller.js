//var db=require('../db.js');
const Session = require('../model/session.model');
const Book = require('../model/books.model');
const shortId = require('shortid');
const { session } = require('../validate/session.validate');
const { countDocuments } = require('../model/session.model');
module.exports.index=async (req,res)=>{
   var sessionId=req.signedCookies.sessionId;
    if(!sessionId) 
    {
      res.redirect('/books');
      return ;
    }


  //var productSession = db.get('session').find({id:sessionId}).value();
  var productSession = await Session.find({"id":sessionId})
  
  
  var productBook=[];
  if (productSession.cart)
    {
       for (let val in productSession.cart)
    {

     // var x=  db.get('books').find({id:val}).value();
      var x =await Book.findById(val).value();
      x.count=productSession.cart[val];
      productBook.push (x);
    }
 
  }
  console.log(productBook);
  
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

  // var count = db.get('session').find({id:sessionId})
  // .get('cart.'+ bookId,0).value();
  // db.get('session').find({id:sessionId})
  // .set('cart.'+ bookId,count+1)
  // .write();
  //console.log(sessionId);
   //var a=await Session.find({"id":sessionId}).('cart.'+bookId,1);
  
var x =await Session.findOne({ "id": sessionId });
var sessionCount={}
sessionCount= x['cart'].find(item=>item.bookId===bookId);

 if (!sessionCount.count)
 {
   sessionCount.count=0;
 }
 console.log(sessionCount);

 var a= await Session.updateOne({ "id": sessionId }, { $push: { cart: {
    bookId:bookId,
    count:sessionCount.count+1
  } } });
  
  res.redirect('/books');
  
}
module.exports.checkout=(req,res)=>{
  var sessionId=req.signedCookies.sessionId;
  if (!req.signedCookies.userId)
    {
      res.redirect('/auth/login')
      return;
    }
   var productSession = db.get('session').find({id:sessionId}).value();
  for (let val in productSession.cart)
    {
      var bookUser={};
       bookUser.id=shortId.generate();
      
      bookUser.count=productSession.cart[val];
      bookUser.userId=req.signedCookies.userId;
      bookUser.bookId=val
      db.get('transactions').push(bookUser).write(); 
    }
  db.get('session').find({id:sessionId})
  .assign({ cart:{}})
  .write()

res.redirect('/books');
}
