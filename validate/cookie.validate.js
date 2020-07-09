const User = require('../model/users.model');
module.exports.setCookie = async(req, res, next) => {


    if (!req.signedCookies.userId) {
        res.redirect('auth/login');
        return;
    }
    //var user = await db.get('user').find({ id: req.signedCookies.userId }).value();
    var user = await User.findById(req.signedCookies.userId);
    res.locals.user = user;

    if (!user) {
        res.redirect('auth/login');
        return;
    } else
        next();

}