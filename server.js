require('dotenv').config()

const express = require('express');
const app = express();




var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(process.env.Mongo_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log("Connected to MongoDB..."))
.catch((err) => console.error(`Connection failed...`, err));
mongoose.set('useFindAndModify', false);
const userRouter = require('./router/user.router.js');
const bookRouter = require('./router/book.router.js');
const transactionRouter = require('./router/transaction.router.js');
const cartRouter = require('./router/cart.router.js');
const authRouter = require('./router/auth.router.js');
const cookieParser = require('cookie-parser');
const validateCookie = require('./validate/cookie.validate');
const errorPemission = require('./validate/permission.validate');
const sessionValidate = require('./validate/session.validate.js');
const apiUserRouter=require('./api/router/user.router')
const apiTransactionRouter=require('./api/router/transaction.router')
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(cookieParser('hoctaicoderx...'));



app.use(bodyParser.urlencoded({ extended: true }))

//var vieclam = [{ id: 1, viec: 'dicho' }, { id: 2, viec: 'naucom' }, { id: 3, viec: 've nha' }, { id: 4, viec: 'hoctai coderx' }]
app.set('views', './views')
app.use(sessionValidate.session);
app.get('/', (req, res) => { res.render('home/index.pug') })
app.use('/auth', authRouter)
app.use('/users', validateCookie.setCookie, errorPemission.permission, userRouter)
app.use('/books', bookRouter) //validateCookie.setCookie,errorPemission.permission,  
app.use('/transactions',  validateCookie.setCookie,transactionRouter);
app.use('/cart', cartRouter)
app.use('/api/user',apiUserRouter);
app.use('/api/transaction',apiTransactionRouter);

var port =process.env.PORT||3000
// listen for requests :)
app.listen(port, () => {
    console.log("Server listening on port " + port);
});