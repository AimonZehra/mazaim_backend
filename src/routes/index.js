
const AdminAuthRoutes = require('./AdminRoutes/Authentication');
const ProductRoutes = require('./AdminRoutes/Products');
const UploadImageRoutes = require('./uploadImage');
const BannerRoutes = require('./AdminRoutes/Banner');
const ContactRoutes = require('./AdminRoutes/Contacts');
const ShippingRoutes = require('./AdminRoutes/Shipping');
const CheckoutRoutes = require('./checkout');
const ReviewsRoutes = require('./reviews');
module.exports = {
    UploadImageRoutes,
    AdminAuthRoutes,
    ProductRoutes,
    BannerRoutes,
    ContactRoutes,
    ShippingRoutes,
    CheckoutRoutes,
    ReviewsRoutes
}