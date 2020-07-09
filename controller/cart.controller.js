var db=require('../db.js');
const shortId = require('shortid');
module.exports.index=(req,res)=>{
   var sessionId=req.signedCookies.sessionId;
  
 
    if(!sessionId) 
    {
      res.redirect('/books');
      return ;
    }


  var productSession = db.get('session').find({id:sessionId}).value();
  console.log(sessionId);
  console.log(productSession);
  var productBook=[];
  if (productSession)
    {
       for (let val in productSession.cart)
    {

      var x=  db.get('books').find({id:val}).value();
      x.count=productSession.cart[val];
      productBook.push (x);
    }
 
  }
  console.log(productBook);
  
  res.render('cart/index.pug',{product:productBook});
}
module.exports.addToCart=(req,res)=>{
  var bookId=req.params.id;
  var sessionId=req.signedCookies.sessionId;
  if(!sessionId) 
    {
      res.redirect('/books');
      return ;
    }

  var count = db.get('session').find({id:sessionId})
  .get('cart.'+ bookId,0).value();
  db.get('session').find({id:sessionId})
  .set('cart.'+ bookId,count+1)
  .write();

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
