const express = require('express');
const router = express.Router();
const validateCookie=require('../validate/cookie.validate');
const cartController=require('../controller/cart.controller');
router.get('/',cartController.index)
router.get('/addtocart/:id',cartController.addToCart);
router.get('/checkout',cartController.checkout)
module.exports=router