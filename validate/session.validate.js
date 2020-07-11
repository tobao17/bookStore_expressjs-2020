//var db=require('../db.js');
const Session = require('../model/session.model');
const User = require('../model/users.model');
const shortId = require('shortid');
module.exports.session=async(req,res,next)=>{
 if (!req.signedCookies.sessionId){
   var sessionId=shortId.generate()
   res.cookie('sessionId',sessionId,{
     signed:true
   } )
 await  Session.create({"id":sessionId}); 

   
 } 

var user= await User.findById(req.signedCookies.userId)


res.locals.user=user;
if(user)
  {
    res.locals.isAdmin=user.isAdmin
  }
  next();
}