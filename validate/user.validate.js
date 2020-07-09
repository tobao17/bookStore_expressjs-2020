module.exports.postCreate= (req,res,next)=>{
  var error=[]
  if (!req.body.name)
    {
      error.push ('Name is require')
    }
  if (req.body.name.length>30)
    {
      error.push('Names cannot be longer than 30 characters')
      
    }
  if (error.length)
    {
      res.render('./user/create',{error:error});
      return ;  
    }
  next();
}