
const User = require('../model/users.model');
const bcryptjs = require('bcryptjs');
const { parseInt } = require('../db.js');
module.exports.login = (req, res) => {
    res.render('./login/index')
}
module.exports.postLogin = async(req, res) => {
    var email = req.body.email;


    var user = await User.findOne({ "email": email });

    //var user=db.get('user').find({email:email}).value();
    if (!user) {

        res.render('./login/index', { error: ['user does not exits'], value: req.body })
        return;
    } else
    if (user.wrongLoginCount > 4) {
        res.render('./login/error')
        return;
    }
    if (!bcryptjs.compareSync(req.body.password, user.password)) {
        // db.get('user').find({email:email})
        // .assign({ wrongLoginCount:parseInt(user.wrongLoginCount)+1})
        //.write()
        await User.updateOne({ "email": email }, { "wrongLoginCount": user.wrongLoginCount + 1 })
        res.render('./login/index', { error: ['wrong password'], value: req.body })
        return;
    }


    res.cookie('userId', user._id, {
        signed: true
    })
    res.redirect('/transactions');
}