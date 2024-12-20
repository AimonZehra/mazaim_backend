const AdminAuthenticationController = require('./AdminController/Authentication/Controller');
const ProductController = require('./AdminController/Products/Controller');
const UploadImageController = require('./UploadImage/Controller');
const BannerController = require('./AdminController/banner/Controller');
const ContactController = require('./AdminController/Contact/Controller');
const ShippingController = require('./AdminController/Shipping/Controller');
const CheckoutController = require('./Checkout/Controller');
const ReviewController = require('./Reviews/Controller');
module.exports = {
    UploadImageController,
    AdminAuthenticationController,
    ProductController,
    BannerController,
    ContactController,
    ReviewController,
    ShippingController,
    CheckoutController
}