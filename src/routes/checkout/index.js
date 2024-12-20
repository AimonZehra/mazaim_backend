const express = require('express');
const router = express.Router();
const {CheckoutController} = require('../../controller');
const { authJwt } = require("../../middleware");
// Route to add a product to the cart
router.post('/add', CheckoutController.AddToCart);

// Route to view all items in the cart
router.get('/get',  CheckoutController.ViewCart);
router.get('/',  CheckoutController.getCart);
// Route to remove a product from the cart
router.delete('/remove/:productId', CheckoutController.RemoveFromCart);

// Route to update the quantity of a cart item
router.post('/update',  CheckoutController.UpdateCartItemQuantity);
 
module.exports = router;