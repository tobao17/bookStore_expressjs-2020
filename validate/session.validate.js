var db=require('../db.js');

const shortId = require('shortid');
module.exports.session=async(req,res,next)=>{
 if (!req.signedCookies.sessionId){
   var sessionId=shortId.generate()
   res.cookie('sessionId',sessionId,{
     signed:true
   } )
 await  db.get('session').push({id:sessionId}).write(); 

   
 } 
var user= await db.get('user').find({ id:req.signedCookies.userId}).value();
res.locals.user=user;
if(user)
  {
    res.locals.isAdmin=user.isAdmin
  }
  next();
}