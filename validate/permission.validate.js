const User = require('../model/users.model');
module.exports.permission = async(req, res, next) => {

    var user = await User.findById(req.signedCookies.userId)
    console.log(user);
    if (!user.isAdmin) {
        res.render('./login/errorPermission');
        return;
    } else
        next();

}